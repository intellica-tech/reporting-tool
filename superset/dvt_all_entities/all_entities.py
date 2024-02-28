from superset.views.all_entities import TaggedObjectsModelView


class DVTTaggedObjectsModelView(TaggedObjectsModelView):
    route_base = "/"
