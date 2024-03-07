from flask_appbuilder import has_access, permission_name
from flask_appbuilder.api import expose

from superset import event_logger
from superset.superset_typing import FlaskResponse
from superset.views.base import BaseSupersetView


class DVTRoleView(BaseSupersetView):
    route_base = "/role"

    @expose("/list/", methods=["GET"])
    @has_access
    @permission_name("read")
    @event_logger.log_this
    def root(self) -> FlaskResponse:
        return self.render_app_template()
