# Module Imports
import os
import pandas as pd
import uuid

# Constants
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))


# Helper Functions
def drop_duplicates(df: pd.DataFrame) -> pd.DataFrame:
    return df.drop_duplicates().reset_index(drop=True)


def create_uuid_column(df: pd.DataFrame):
    df.insert(0, "id", df.apply(lambda _: str(uuid.uuid4()), axis=1))
    return df


def create_autoincrement_column(df: pd.DataFrame) -> pd.DataFrame:
    df["internal_id"] = df.index + 1
    df.insert(0, "internal_id", df.pop("internal_id"))
    return df


def left_join(df1: pd.DataFrame, df2: pd.DataFrame, column: str) -> pd.DataFrame:
    return (
        df1.merge(df2, on=column, how="left")
        .rename(columns={"internal_id": f"{column}_id"})
        .drop(columns=["id"])
    )


def normalize(df: pd.DataFrame, column: str) -> pd.DataFrame:
    return (
        df.filter(items=[column])
        .pipe(drop_duplicates)
        .pipe(create_uuid_column)
        .pipe(create_autoincrement_column)
    )


def remove_non_stores(df: pd.DataFrame, string: str) -> pd.DataFrame:
    df = df[~df["former_business"].astype(str).str.startswith(string)]
    return df


def remap_business_names(df: pd.DataFrame) -> pd.DataFrame:
    map = {
        "24 HR Fitness": "24 Hour Fitness",
        "A.C Moore": "A.C. Moore",
        "AC Moore": "A.C. Moore",
        "Advanced Auto": "Advanced Auto Parts",
        "Art Van": "Art Van Furniture",
        "Barnes Noble": "Barnes and Noble",
        "Bealls Clothing": "Bealls",
        "Bealls Outlet": "Bealls",
        "Bed Bath   Beyond": "Bed Bath and Beyond",
        "Bed Bath and Beyoind": "Bed Bath and Beyond",
        "Bed Bath And Beyond": "Bed Bath and Beyond",
        "Bed Bath Beyond": "Bed Bath and Beyond",
        "Bon Ton Furniture": "Bon Ton",
        "Bon-ton": "Bon Ton",
        "Bonton": "Bon Ton",
        "Burkes Outlet": "Burkes",
        "Burlington": "Burlington Coat Factory",
        "Buy Buy Baby": "BuyBuy Baby",
        "Charming Charleys": "Charming Charlie",
        "Charming Charlies": "Charming Charlie",
        "Christmas Tree Shops": "Christmas Tree Shop",
        "Crunch Fitness Gym": "Crunch Fitness",
        "Dillards Clearance": "Dillards",
        "DSW Shoes": "DSW",
        "Fallas Paredes": "Fallas",
        "Gap Gap Kids": "Gap",
        "H   M": "H M",
        "Hancock Fabric": "Hancock",
        "Harmon Face Value": "Harmon Face Values",
        "HH Greg": "H.H. Gregg",
        "HH Gregg": "H.H. Gregg",
        "HHGREGG": "H.H. Gregg",
        "Hibbett": "Hibbett Sports",
        "JC Penney Home Store": "JC Penney",
        "JC Penneys": "JC Penney",
        "JCP": "JC Penney",
        "JCPenney": "JC Penney",
        "JCPenneys Lower Level": "JC Penney",
        "Jo Ann Fabrics": "Joann Fabrics",
        "Jo-Ann": "Joann Fabrics",
        "JoAnn": "Joann Fabrics",
        "Joanns": "Joann Fabrics",
        "JoAnns Fabric": "Joann Fabrics",
        "Johnnys Fitness Club": "Joann Fabrics",
        "K- Mart": "K-Mart",
        "LA Fitness - Located on 2nd Level of Center": "LA Fitness",
        "Macys Backstage": "Macys",
        "Marshall Shoes": "Marshalls",
        "Marshalls Home Goods": "Marshalls",
        "Napa Auto": "NAPA Auto Parts",
        "Nike Outlet": "Nike",
        "NY   Co": "NY Company",
        "NY   Company": "NY Company",
        "OReilly Auto": "OReilly Auto Parts",
        "Papaya": "Papaya Clothing",
        "Performance Bike": "Performance Bicycle",
        "Pet Co": "Petco",
        "Pet Supplies": "Pet Supplies Plus",
        "Pier 1 Imports": "Pier 1",
        "Pier One": "Pier 1",
        "Rack Room": "Rack Room Shoes",
        "Rooms to Go Outlets": "Rooms to Go",
        "Saks Off Fifth": "Saks Fifth Avenue",
        "Save-A-Lot": "Save A Lot",
        "sears appliance": "Sears",
        "Sears Appliance Store": "Sears",
        "Sears Hardware": "Sears",
        "Sears Home Town": "Sears",
        "Sears Hometown": "Sears",
        "Sears Next to Sav A Lot": "Sears",
        "Sears Outlet": "Sears",
        "Sears Upper level": "Sears",
        "Shop N Save by Lowes": "Shop N Save",
        "Sports Authority Across from Sams Club": "Sports Authority",
        "Sports Authourity": "Sports Authority",
        "Steinmart": "Stein Mart",
        "TJ Max": "TJ Maxx",
        "Tuesday  Morning": "Tuesday Morning",
        "Tuesday Morning Center": "Tuesday Morning",
        "Tuesday Mornings": "Tuesday Morning",
        "Valu Next to Pattons": "Valu Home Center",
        "Victorias Secret": "Victoria Secret",
    }

    df = df.replace({"former_business": map})

    return df


def export(df: pd.DataFrame, name: str):
    df.to_csv(os.path.join(SCRIPT_DIR, "..", f"output/{name}.csv"), index=False)


if __name__ == "__main__":
    extracted_df = pd.read_csv(os.path.join(SCRIPT_DIR, "..", "output/data.csv"))

    extracted_df_clean = (
        extracted_df.pipe(remove_non_stores, "Across")
        .pipe(remove_non_stores, "Behind")
        .pipe(remove_non_stores, "Beside")
        .pipe(remove_non_stores, "Between")
        .pipe(remove_non_stores, "Left")
        .pipe(remove_non_stores, "Located")
        .pipe(remove_non_stores, "Near")
        .pipe(remove_non_stores, "Next")
        .pipe(remove_non_stores, "Spirit Halloween")
        .pipe(remap_business_names)
        .dropna()
    )

    cities_df = normalize(extracted_df_clean, "city")
    states_df = normalize(extracted_df_clean, "state")
    zips_df = normalize(extracted_df_clean, "zip")
    businesses_df = normalize(extracted_df_clean, "former_business")

    normalized_df = (
        extracted_df_clean.pipe(left_join, cities_df, "city")
        .pipe(left_join, states_df, "state")
        .pipe(left_join, zips_df, "zip")
        .pipe(left_join, businesses_df, "former_business")
        .drop(columns=["city", "state", "zip", "former_business"])
        .pipe(create_uuid_column)
        .pipe(create_autoincrement_column)
    )

    export(cities_df, "cities")
    export(states_df, "states")
    export(zips_df, "zip_codes")
    export(businesses_df, "former_businesses")
    export(normalized_df, "locations")
