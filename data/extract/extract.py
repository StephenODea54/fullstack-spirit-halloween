# Modules
from bs4 import BeautifulSoup
from dataclasses import asdict, dataclass, field
from typing import List
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

def get_html(zip_code: int) -> List[str]:
    request = requests.get(BASE_URL + str(zip_code))
    markers = request.json()['markers']

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

        address_line_one = address_div_children[1].text
        address_line_two = address_div_children[2].text

        self.data.address = address_line_one
        self.data.city = address_line_two.split(' ')[0][:-1]
        self.data.state = address_line_two.split(' ')[1]
        self.data.zip = int(address_line_two.split(' ')[2])

    def get_former_business(self) -> None:
        former_business_div = self.soup.find('div', {'class': 'address'})
        former_business_clean = former_business_div.replace('Former ', '')

        self.data.former_business = former_business_clean
        return self
    
    def build(self) -> pd.DataFrame:
        # Little ugly
        self.get_address_attributes().get_former_business()

        return pd.DataFrame([asdict(self.data)])
