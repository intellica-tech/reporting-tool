export const objectIsEmptyForArray = (arr: any) => {
  if (arr.length === 1 && Object.keys(arr[0]).length === 0) {
    return [];
  }
  return arr;
};
