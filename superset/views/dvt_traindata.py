from flask_appbuilder import permission_name, has_access
from flask_appbuilder.api import expose

from superset import event_logger
from superset.superset_typing import FlaskResponse
from superset.views.base import BaseSupersetView


class TrainDataView(BaseSupersetView):
    route_base = "/traindata"

    @expose("/", methods=["GET", "POST"])
    @has_access
    @permission_name("read")
    @event_logger.log_this
    def root(self) -> FlaskResponse:
        return self.render_app_template()

