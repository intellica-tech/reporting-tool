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

from superset.extensions import event_logger
from superset.views.base_api import BaseSupersetApi

logger = logging.getLogger(__name__)


class DataProcessRestApi(BaseSupersetApi):
    resource_name = "data"
    allow_browser_login = True

    @expose("/outlier-analysis", methods=("POST",))
    @event_logger.log_this
    @permission_name("list")
    def outlier_analysis(self) -> Response:
        try:
            payload = request.json

            if "selected_columns" not in payload or "table_name" not in payload:
                return jsonify({"error": "Missing required fields in the payload"}), 400

            return (
                jsonify(
                    {
                        "success": True,
                        "message": f"Received payload: {payload}"
                    }
                ),
                200,
            )

        except Exception as e:
            return jsonify({"error": str(e)}), 500

    @expose("/normalization", methods=("POST",))
    @event_logger.log_this
    @permission_name("list")
    def normalization(self) -> Response:
        try:
            payload = request.json

            if "selected_columns" not in payload or "table_name" not in payload:
                return jsonify({"error": "Missing required fields in the payload"}), 400

            return (
                jsonify(
                    {
                        "success": True,
                        "message": f"Received payload: {payload}"
                    }
                ),
                200,
            )

        except Exception as e:
            return jsonify({"error": str(e)}), 500

    @expose("/missing-data-imputation", methods=("POST",))
    @event_logger.log_this
    @permission_name("list")
    def missing_data_imputation(self) -> Response:
        try:
            payload = request.json

            if "selected_columns" not in payload or "table_name" not in payload:
                return jsonify({"error": "Missing required fields in the payload"}), 400

            return (
                jsonify(
                    {
                        "success": True,
                        "message": f"Received payload: {payload}"
                    }
                ),
                200,
            )

        except Exception as e:
            return jsonify({"error": str(e)}), 500
