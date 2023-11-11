# Modules
from bs4 import BeautifulSoup
from dataclasses import asdict, dataclass
from typing import List, Union
import pandas as pd
import os
import requests


# Constants
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
BASE_URL = 'https://maps.spirithalloween.com/api/getAsyncLocations?template=domain&level=domain&search='


# Helper Functions
# https://data.opendatasoft.com/explore/dataset/georef-united-states-of-america-zc-point%40public/export/?flg=en-us
def read_zip_codes(file_path: str) -> List[int]:
    df = (pd
        .read_csv(file_path)
        .filter(items = ['Zip Code'])
    )

    return df['Zip Code'].tolist()

def get_html(zip_code: int) -> Union[List[str], None]:
    request = requests.get(BASE_URL + str(zip_code))

    # Not all zip codes are guaranteed to return any results from the api call
    markers = request.json()['markers']
    if markers is None:
        return

    html_arr: List[str] = []

    for marker in markers:
        html_arr.append(marker['info'])
    
    return html_arr


# Data that represents row in the DB
@dataclass
class Data:
    address: str = None
    city: str = None
    state: str = None
    zip: int = None
    former_business: str = None


# Builder Class to contruct the rows for the data
class DataframeBuilder:
    def __init__(self, html: str) -> None:
        self.data = Data()
        self.soup = BeautifulSoup(html, 'html.parser')

    def get_address_attributes(self) -> None:
        address_div = self.soup.find('div', {'class': 'address'})
        address_div_children = address_div.findChildren('div', recursive = False)

        # Represents the street address e.g. 1234 Something Ave
        street_address = address_div_children[1].text

        # Represents the City
        city = address_div_children[2].text.split(', ')[0]

        # Represents the State and Zip part of the address
        state_zip_arr = address_div_children[2].text.split(', ')[-1].split(' ')

        # Excluding Canadian address from analysis b/c I'm lazy
        if not len(state_zip_arr) > 2:
            self.data.address = street_address
            self.data.city = city
            self.data.state = state_zip_arr[0]
            self.data.zip = int(state_zip_arr[1])

        return self

    def get_former_business(self) -> None:
        former_business_div = self.soup.find('div', {'class': 'address-two'})
        former_business_clean = former_business_div.text.replace('Former ', '')

        self.data.former_business = former_business_clean
        return self
    
    def build(self) -> pd.DataFrame:
        self.get_address_attributes().get_former_business()

        return pd.DataFrame([asdict(self.data)])

if __name__ == '__main__':
    dfs: List[pd.DataFrame] = []

    zip_codes = read_zip_codes(os.path.join(SCRIPT_DIR, '..', 'input/georef.csv'))

    for zip_code in zip_codes:
        html_arr = get_html(zip_code)

        if not html_arr is None:
            for html in html_arr:
                dataframe_builder = DataframeBuilder(html)
                
                df = dataframe_builder.build()
                dfs.append(df)

    (pd.concat(dfs)
       .dropna()
       .drop_duplicates()
       .reset_index(drop = True)
       .to_csv(os.path.join(SCRIPT_DIR, '..', 'output/data.csv'), index = False))
