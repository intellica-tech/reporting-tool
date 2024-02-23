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

import requests
from flask import request, Response, jsonify
from flask_appbuilder import expose
from flask_appbuilder.security.decorators import permission_name


from superset.extensions import event_logger
from superset.views.base_api import BaseSupersetApi

logger = logging.getLogger(__name__)


class TrainDataRestApi(BaseSupersetApi):
    resource_name = "ml_and_insert"
    allow_browser_login = True

    @expose("/", methods=("POST",))
    @event_logger.log_this
    @permission_name("list")
    def traindata(self) -> Response:
        try:
            payload = request.json

            if "algorithm_name" not in payload or "table_name" not in payload:
                return jsonify({"error": "Missing required fields in the payload"}), 400

            # algorithm_name = payload["algorithm_name"]
            # table_name = payload["table_name"]
            # post_data = {
            #     "algorithm_name": algorithm_name,
            #     "table_name": table_name,
            # }

            external_api_url = "http://172.16.11.14:5000/ml_and_insert"

            response = requests.post(external_api_url, json=payload)

            if response.ok:
                return jsonify({"success": True, "message": f"Received payload: {payload}", "response": response.json()}), 200

        except Exception as e:
            return jsonify({"error": str(e)}), 500

