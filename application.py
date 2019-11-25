#!/usr/bin/env python
import random
import time
import csv
import numpy as np
import json
import yaml
from datetime import datetime

from backend import DB, Keeper

from flask import Flask, Response, render_template, abort, url_for, redirect

application = Flask(__name__)
random.seed()  # Initialize the random number generator


@application.route('/')
def index():
    return redirect(url_for('barn', barn_ord=0))


@application.route('/barn/<int:barn_ord>')
def barn(barn_ord):
    with open("config/barns.yaml", "r" ) as barns_file:
        barns = yaml.load(barns_file, Loader=yaml.FullLoader)
        if barn_ord >= len(barns["barns"]) or barn_ord < 0:
            abort(404)
        barn = barns["barns"][barn_ord]
    return render_template('index.html', barn=barn)


@application.route('/chart-data/<barn_id>')
def chart_data(barn_id):
    def process_sensor():
        db = DB("input/sensor_data.json")
        keeper = Keeper(barn_id, "config/config.yaml")

        sensors = db.get_sensor_data_from_barn(keeper.barn_id)
        for dt in sensors:
            sensor_data = sensors[dt]
            keeper.update(sensor_data)
            json_data = json.dumps(
                {
                    'time': dt,
                    'sensor_data': keeper.latest_sensor,
                    'status': keeper.status,
                    'alerts': keeper.send_alert
                }
            )
            keeper.send_alert = []
            yield f"data:{json_data}\n\n"
            time.sleep(1)

    return Response(process_sensor(), mimetype='text/event-stream')


if __name__ == '__main__':
    application.run(debug=True, threaded=True)
