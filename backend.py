import numpy as np
import json
import yaml

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
    def __init__(self, barn_id, config_file):
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
        self.config = self.read_config(config_file)

    def read_config(self, config_file):
        with open(config_file, "r") as config_file:
            config = yaml.load(config_file, Loader=yaml.FullLoader)
        return config

    def update(self, sensors):
        for level in sensors:
            if sensors[level] is not None:
                self.latest_sensor[level] = sensors[level]

        for sensor in self.config["sensor"]:
            sensor_config = self.config["sensor"][sensor]
            if self.latest_sensor[sensor] is not None:
                if sensor_config["red"] is not None and self.latest_sensor[sensor] > sensor_config["red"]:
                    self.status[sensor] = STATUS_RED
                elif sensor_config["orange"] is not None and self.latest_sensor[sensor] > sensor_config["orange"]:
                    self.status[sensor] = STATUS_ORANGE
                else:
                    self.status[sensor] = STATUS_OK
            else:
                self.status[sensor] = STATUS_EMPTY


def test():
    db = DB("input/sensor_data.json")
    keeper = Keeper("70B3D58FF100D72A", "config/config.yaml")

    sensors = db.get_sensor_data_from_barn(keeper.barn_id)
    for dt in sensors:
        sensor_data = sensors[dt]
        keeper.update(sensor_data)
        print(sensor_data)
        break


if __name__ == "__main__":
    test()