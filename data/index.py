# Modules
from typing import List
import pandas as pd
import os


# Constants
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))


# https://data.opendatasoft.com/explore/dataset/georef-united-states-of-america-zc-point%40public/export/?flg=en-us
def read_zip_codes(file_path: str) -> List[int]:
    df = (pd
        .read_csv(file_path)
        .filter(items = ['Zip Code'])
    )

    return df['Zip Code'].tolist()
