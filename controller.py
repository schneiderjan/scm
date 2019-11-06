import pandas as pd
from time import sleep
import json
from streamz import Stream
from streamz.dataframe import DataFrame

pd.set_option('display.max_rows', 500)
pd.set_option('display.max_columns', 500)
pd.set_option('display.width', 1000)


class FileReader:

    def __init__(self):
        self.filename = r'sensor_climate_data.csv'
        self.data = pd.DataFrame()
        self.json_df = pd.DataFrame()
        self.json = ''
        self.source = Stream()

    def read_file(self):
        self.data = pd.read_csv(self.filename)
        # print(fr.data.groupby(by='Filename_Idx')['Barn_Name'].describe())
        # self.data = self.data[self.data.Filename_Idx == '70B3D58FF100D68E']
        self.data['ts'] = self.data.Date + " " + self.data.Time
        self.data = self.data.drop(['Date', 'Time', 'ID', 'Filename_Date'], axis=1)
        print(self.data.columns)
        self.data.columns = ['nh3', 'co2', 'in_humidity', 'in_temp', 'out_humidity', 'out_temp', 'barn_name', 'file_id',
                             'ts']

    def make_json(self):
        self.data = self.data.sort_values(by=['file_id', 'ts'])
        unique_fid = set(self.data.file_id.unique())
        print(unique_fid)
        # faulty_key = "Ferkel) - 2019 - 10 - 13"
        faulty_key = 'Slaughter pigs) -2019-10-13'
        unique_fid.remove(faulty_key)

        json_dicts = {}
        for fid in unique_fid:
            print('processing {}'.format(fid))
            fid_data = self.data.loc[self.data.file_id == fid]
            fid_dicts = {}
            for i, r in fid_data.iterrows():
                tmp = fid_data.loc[i, ['nh3', 'co2', 'in_humidity', 'in_temp', 'out_humidity', 'out_temp', 'ts']]
                fid_dicts[tmp['ts']] = tmp[
                    ['nh3', 'co2', 'in_humidity', 'in_temp', 'out_humidity', 'out_temp']].to_dict()
            json_dicts[fid] = fid_dicts

        print(json_dicts)
        print('saving json')
        with open('data.json', 'w', encoding='utf-8') as f:
            json.dump(json_dicts, f, ensure_ascii=False, indent=4)
        print('dones')


if __name__ == "__main__":
    fr = FileReader()
    fr.read_file()
    # fr.stream_file()
    fr.make_json()
