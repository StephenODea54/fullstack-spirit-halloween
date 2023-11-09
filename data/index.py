# Modules
from bs4 import BeautifulSoup
from typing import List
import pandas as pd
import os
import requests


# Constants
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
BASE_URL = 'https://maps.spirithalloween.com/api/getAsyncLocations?template=domain&level=domain&search='


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
