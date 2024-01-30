type FetchQueryParamsSearchProps = {
  filterData: any[];
  sort?: string;
  page?: number;
  pageSize?: number;
};

export const fetchQueryParamsSearch = ({
  filterData,
  sort = 'order_column:changed_on_delta_humanized,order_direction:desc',
  page = 1,
  pageSize = 10,
}: FetchQueryParamsSearchProps) => {
  let filters = '';
  const withoutValues = [undefined, null, ''];

  const filteredData = filterData
    .filter(item => !withoutValues.includes(item.value))
    .map(item => `(col:${item.col},opr:${item.opr},value:${item.value})`)
    .join(',');

  if (filterData.filter(item => !withoutValues.includes(item.value)).length) {
    filters = `filters:!(${filteredData}),`;
  }

  return `?q=(${filters}${sort},page:${page - 1},page_size:${pageSize})`;
};
