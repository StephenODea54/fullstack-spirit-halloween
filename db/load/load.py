# Module Imports
from sqlalchemy import (
    Column,
    create_engine,
    Engine,
    ForeignKey,
    Integer,
    MetaData,
    Table,
    Text,
)
import os
import pandas as pd

# Constants
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))


# Helper Functions
def create_tables(engine: Engine):
    metadata = MetaData()

    cities = Table(
        "cities",
        metadata,
        Column("internal_id", Integer, primary_key=True),
        Column("id", Text, unique=True, nullable=False),
        Column("city", Text, unique=True, nullable=False),
    )

    states = Table(
        "states",
        metadata,
        Column("internal_id", Integer, primary_key=True),
        Column("id", Text, unique=True, nullable=False),
        Column("state", Text, unique=True, nullable=False),
    )

    zip_codes = Table(
        "zip_codes",
        metadata,
        Column("internal_id", Integer, primary_key=True),
        Column("id", Text, unique=True, nullable=False),
        Column("zip", Integer, unique=True, nullable=False),
    )

    former_businesses = Table(
        "former_businesses",
        metadata,
        Column("internal_id", Integer, primary_key=True),
        Column("id", Text, unique=True, nullable=False),
        Column("former_business", Text, unique=True, nullable=False),
    )

    locations = Table(
        "locations",
        metadata,
        Column("internal_id", Integer, primary_key=True),
        Column("id", Text, unique=True, nullable=False),
        Column("address", Text, unique=True, nullable=False),
        Column("city_id", Integer, ForeignKey("cities.internal_id"), nullable=False),
        Column("state_id", Integer, ForeignKey("cities.internal_id"), nullable=False),
        Column("zip_id", Integer, ForeignKey("cities.internal_id"), nullable=False),
        Column(
            "former_business_id",
            Integer,
            ForeignKey("cities.internal_id"),
            nullable=False,
        ),
    )

    metadata.create_all(engine)


def read_output_data(csv_name: str) -> pd.DataFrame:
    return pd.read_csv(os.path.join(SCRIPT_DIR, "..", f"output/{csv_name}.csv"))


def insert_data(df: pd.DataFrame, table_name: str, engine: Engine) -> None:
    df.to_sql(table_name, engine, if_exists="replace", index=False)


if __name__ == "__main__":
    engine = create_engine("sqlite:///api/data/database.db")
    create_tables(engine)

    cities_df = read_output_data("cities")
    businesses_df = read_output_data("former_businesses")
    locations_df = read_output_data("locations")
    states_df = read_output_data("states")
    zip_codes_df = read_output_data("zip_codes")

    insert_data(cities_df, "cities", engine)
    insert_data(businesses_df, "former_businesses", engine)
    insert_data(locations_df, "locations", engine)
    insert_data(states_df, "states", engine)
    insert_data(zip_codes_df, "zip_codes", engine)
