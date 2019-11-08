#!/usr/bin/env python
import random
import time
import csv
import numpy as np
import json
from datetime import datetime

from backend import DB, Keeper

from flask import Flask, Response, render_template

application = Flask(__name__)
random.seed()  # Initialize the random number generator


@application.route('/')
def index():
    return render_template('index.html')


@application.route('/chart-data')
def chart_data():
    def process_sensor():
        db = DB("input/sensor_data.json")
        keeper = Keeper("70B3D58FF100D72A")

        sensors = db.get_sensor_data_from_barn(keeper.barn_id)
        for dt in sensors:
            sensor_data = sensors[dt]
            keeper.update(sensor_data)
            json_data = json.dumps(
                {
                    'time': dt,
                    'sensor_data': keeper.latest_sensor,
                    'status': keeper.status
                }
            )
            yield f"data:{json_data}\n\n"
            time.sleep(1)

    return Response(process_sensor(), mimetype='text/event-stream')


if __name__ == '__main__':
    application.run(debug=True, threaded=True)
