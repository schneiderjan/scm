import numpy as np
import json

STATUS_EMPTY = -1
STATUS_OK = 0
STATUS_ORANGE = 1
STATUS_RED = 2


class DB(object):
    def __init__(self, file_path):
        with open( file_path, "r") as json_file:
            sensor_data = json_file.read()
        self.sensor_data = json.loads(sensor_data)

    def get_sensor_data_from_barn(self, barn_id):
        return self.sensor_data[barn_id]


class Keeper(object):
    def __init__(self, barn_id):
        self.barn_id = barn_id
        self.status = {
            "co2": STATUS_EMPTY,
            "nh3": STATUS_EMPTY,
            "temperature": STATUS_EMPTY
        }
        self.latest_sensor = {
            "co2": None,
            "nh3": None,
            "in_temp": None,
            "out_temp": None,
            "in_humidity": None,
            "out_humidity": None
        }

    def update(self, sensors):
        for level in sensors:
            if sensors[level] is not None:
                self.latest_sensor[level] = sensors[level]
        # CO2 logic
        if self.latest_sensor["co2"] is not None:
            if self.latest_sensor["co2"] > 3200:
                self.status["co2"] = STATUS_RED
            elif self.latest_sensor["co2"] > 2800:
                self.status["co2"] = STATUS_ORANGE
            else:
                self.status["co2"] = STATUS_OK
        # Ammonia logic
        if self.latest_sensor["nh3"] is not None:
            if self.latest_sensor["nh3"] > 40:
                self.status["nh3"] = STATUS_RED
            elif self.latest_sensor["nh3"] > 10:
                self.status["nh3"] = STATUS_ORANGE
            else:
                self.status["nh3"] = STATUS_OK
        # Temperature logic
        if self.latest_sensor["in_temp"] is not None:
            if self.latest_sensor["in_temp"] > 31:
                self.status["temperature"] = STATUS_RED
            elif self.latest_sensor["in_temp"] > 28:
                self.status["temperature"] = STATUS_ORANGE
            else:
                self.status["temperature"] = STATUS_OK


def test():
    db = DB("input/sensor_data.json")
    keeper = Keeper("70B3D58FF100D72A")

    sensors = db.get_sensor_data_from_barn(keeper.barn_id)
    for dt in sensors:
        sensor_data = sensors[dt]
        keeper.update_status(sensor_data)
        print(sensor_data)
        break


if __name__ == "__main__":
    test()