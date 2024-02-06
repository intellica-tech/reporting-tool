type Filter = {
  col: string;
  opr: string;
  value: string;
};

type FetchQueryParamsSearchProps = {
  filters?: Filter[];
  orderColumn?: string;
  orderDirection?: string;
  page?: number;
  pageSize?: number;
};

export const fetchQueryParamsSearch = ({
  filters = [],
  orderColumn = 'changed_on_delta_humanized',
  orderDirection = 'desc',
  page = 1,
  pageSize = 10,
}: FetchQueryParamsSearchProps) => {
  let filtersQuery = '';
  const withoutValues = [undefined, null, ''];
  const sort = `order_column:${orderColumn},order_direction:${orderDirection}`;

  const filteredData = filters
    .filter(item => !withoutValues.includes(item.value))
    .map(item => `(col:${item.col},opr:${item.opr},value:${item.value})`)
    .join(',');

  if (filters.filter(item => !withoutValues.includes(item.value)).length) {
    filtersQuery = `filters:!(${filteredData}),`;
  }

  return `?q=(${filtersQuery}${sort},page:${page - 1},page_size:${pageSize})`;
};
