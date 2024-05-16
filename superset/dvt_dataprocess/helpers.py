from sqlalchemy import create_engine, MetaData, Table
from sqlalchemy.orm import sessionmaker
import pandas as pd


def get_engine(connection_string):
    return create_engine(connection_string)

def create_session(engine):
    Session = sessionmaker(bind=engine)
    return Session()

def read_table_to_dataframe(session, engine, table_name, selected_columns):
    metadata = MetaData(bind=engine)
    your_table = Table(table_name, metadata, autoload=True, autoload_with=engine)
    columns = [getattr(your_table.c, col) for col in selected_columns]
    query = session.query(*columns)
    return pd.read_sql(query.statement, engine)


def write_dataframe_to_table(df, engine, table_name):
    df.to_sql(table_name, engine, if_exists='replace', index=False)


def detect_outliers_boxplot(data):
            q1 = data.quantile(0.25)
            q3 = data.quantile(0.75)
            iqr = q3 - q1
            lower_bound = q1 - 1.5 * iqr
            upper_bound = q3 + 1.5 * iqr
            return data[(data < lower_bound) | (data > upper_bound)]
