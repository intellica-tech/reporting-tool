# Licensed to the Apache Software Foundation (ASF) under one
# or more contributor license agreements.  See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership.  The ASF licenses this file
# to you under the Apache License, Version 2.0 (the
# "License"); you may not use this file except in compliance
# with the License.  You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
# KIND, either express or implied.  See the License for the
# specific language governing permissions and limitations
# under the License.
import logging

from flask import jsonify, request, Response
from flask_appbuilder import expose
from flask_appbuilder.security.decorators import permission_name
from sqlalchemy.orm import sessionmaker

from superset.extensions import event_logger
from superset.views.base_api import BaseSupersetApi

from sqlalchemy import create_engine, MetaData, Table, Column, Integer, \
    String, Float
from sqlalchemy.orm import sessionmaker
import pandas as pd
# import seaborn as sns
# import matplotlib.pyplot as plt

logger = logging.getLogger(__name__)



from flask import request, jsonify, Response
from .helpers import get_engine, create_session, read_table_to_dataframe, \
    write_dataframe_to_table, detect_outliers_boxplot


class DataProcessRestApi(BaseSupersetApi):
    resource_name = "data"
    allow_browser_login = True

    def __init__(self):
        super().__init__()
        self.connection_string = 'postgresql://examples:examples@db:5432/examples'

    def handle_request(self, func):
        try:
            payload = request.json
            if "selected_columns" not in payload or "table_name" not in payload:
                return jsonify({"error": "Missing required fields in the payload"}), 400
            engine = get_engine(self.connection_string)
            session = create_session(engine)
            result = func(payload, engine, session)
            session.commit()
            return result
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    @expose("/outlier-analysis", methods=("POST",))
    @event_logger.log_this
    @permission_name("list")
    def outlier_analysis(self) -> Response:
        return self.handle_request(self.outlier_analysis_impl)

    def outlier_analysis_impl(self, payload, engine, session):
        table_name = payload["table_name"]
        selected_columns = payload["selected_columns"].split(",")
        df = read_table_to_dataframe(session, engine, table_name, selected_columns)
        outliers_dict = {}
        for column in selected_columns:
            outliers = detect_outliers_boxplot(df[column])
            outliers_dict[column] = outliers.tolist()
        outliers_table_name = f"{table_name}_outliers"
        outliers_table = Table(outliers_table_name, MetaData(bind=engine), autoload=True, autoload_with=engine)
        for column, outliers in outliers_dict.items():
            for outlier in outliers:
                session.execute(outliers_table.insert().values({column: outlier}))
        return jsonify({"success": True, "message": f"Outliers written to table '{outliers_table_name}'"}), 200

    @expose("/normalization", methods=("POST",))
    @event_logger.log_this
    @permission_name("list")
    def normalization(self) -> Response:
        return self.handle_request(self.normalization_impl)

    def normalization_impl(self, payload, engine, session):
        from sklearn.preprocessing import MinMaxScaler
        table_name = payload["table_name"]
        selected_columns = payload["selected_columns"].split(",")
        df = read_table_to_dataframe(session, engine, table_name, selected_columns)
        scaler = MinMaxScaler()
        normalized_data = scaler.fit_transform(df[selected_columns])
        normalized_df = pd.DataFrame(normalized_data, columns=selected_columns)
        normalized_table_name = f"{table_name}_normalized"
        write_dataframe_to_table(normalized_df, engine, normalized_table_name)
        return jsonify({"success": True, "message": f"Normalized data written to table '{normalized_table_name}' (values are scaled between 0 and 1)"}), 200

    @expose("/missing-data-imputation", methods=("POST",))
    @event_logger.log_this
    @permission_name("list")
    def missing_data_imputation(self) -> Response:
        return self.handle_request(self.missing_data_imputation_impl)

    def missing_data_imputation_impl(self, payload, engine, session):
        table_name = payload["table_name"]
        selected_columns = payload["selected_columns"].split(",")
        df = read_table_to_dataframe(session, engine, table_name, selected_columns)
        selected_df_imputed = df.fillna(df.mean())
        for col in selected_columns:
            df[col] = selected_df_imputed[col]
        imputed_table_name = f"{table_name}_imputed"
        write_dataframe_to_table(df, engine, imputed_table_name)
        return jsonify({"success": True, "message": f"Missing data imputed for selected columns and written to table '{imputed_table_name}'"}), 200

    @expose("/gain-information", methods=("POST",))
    @event_logger.log_this
    @permission_name("list")
    def gain_information(self) -> Response:
        return self.handle_request(self.gain_information_impl)

    def gain_information_impl(self, payload, engine, session):
        from sklearn.feature_selection import mutual_info_regression
        table_name = payload["table_name"]
        selected_columns = payload["selected_columns"].split(",")

        df = read_table_to_dataframe(session, engine, table_name, selected_columns)
        mi_matrix = pd.DataFrame(index=selected_columns, columns=selected_columns)

        for col1 in selected_columns:
            for col2 in selected_columns:
                if col1 != col2:
                    mi = mutual_info_regression(df[[col1]], df[col2])[0]
                    mi_matrix.at[col1, col2] = mi
                else:
                    mi_matrix.at[col1, col2] = 0

        mi_dict = mi_matrix.to_dict()

        gain_info_table_name = f"{table_name}_gain_information"
        gain_info_table = Table(gain_info_table_name, MetaData(bind=engine),
                                Column('column_1', String),
                                Column('column_2', String),
                                Column('gain_information', Float),
                                extend_existing=True)
        gain_info_table.create(engine, checkfirst=True)

        for col1 in selected_columns:
            for col2 in selected_columns:
                if col1 != col2:
                    session.execute(
                        gain_info_table.insert().values(column_1=col1, column_2=col2,
                                                        gain_information=mi_dict[col1][
                                                            col2]))

        return jsonify({"success": True,
                        "message": f"Gain information calculated and written to table '{gain_info_table_name}'",
                        "gain_information": mi_dict}), 200
