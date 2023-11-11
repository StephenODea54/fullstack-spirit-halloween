# Module Imports
from typing import Tuple
import os
import pandas as pd
import uuid


# Constants
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))


# Helper Functions
def drop_duplicates(df: pd.DataFrame) -> pd.DataFrame:
    return df.drop_duplicates().reset_index(drop = True)

def create_uuid_column(df: pd.DataFrame):
    df.insert(0, 'id', df.apply(lambda _: str(uuid.uuid4()), axis = 1))
    return df

def create_autoincrement_column(df: pd.DataFrame) -> pd.DataFrame:
    df['internal_id'] = df.index + 1
    df.insert(0, 'internal_id', df.pop('internal_id'))
    return df

def left_join(df1: pd.DataFrame, df2: pd.DataFrame, column: str) -> pd.DataFrame:
    return df1.merge(df2, on = column, how = 'left').rename(columns = {'internal_id': f'{column}_id'}).drop(columns = ['id'])

def normalize(df: pd.DataFrame, column: str) -> pd.DataFrame:
    return df.filter(items = [column]).pipe(drop_duplicates).pipe(create_uuid_column).pipe(create_autoincrement_column)

def export(df: pd.DataFrame, name: str):
    df.to_csv(os.path.join(SCRIPT_DIR, '..', f'output/{name}.csv'), index = False)


if __name__ == '__main__':
    extracted_df = pd.read_csv(os.path.join(SCRIPT_DIR, '..', 'output/data.csv'))

    cities_df = normalize(extracted_df, 'city')
    states_df = normalize(extracted_df, 'state')
    zips_df = normalize(extracted_df, 'zip')
    businesses_df = normalize(extracted_df, 'former_business')


    normalized_df = (extracted_df
        .pipe(left_join, cities_df, 'city')
        .pipe(left_join, states_df, 'state')
        .pipe(left_join, zips_df, 'zip')
        .pipe(left_join, businesses_df, 'former_business')
        .drop(columns = ['city', 'state', 'zip', 'former_business'])
        .pipe(create_uuid_column)
        .pipe(create_autoincrement_column))

    export(cities_df, 'cities')
    export(states_df, 'states')
    export(zips_df, 'zip_codes')
    export(businesses_df, 'former_businesses')
    export(normalized_df, 'locations')
