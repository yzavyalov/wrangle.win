import { unref } from 'vue';

export const sortArr = (sortedArr, sortByValue, sortKey = "finish") => {
  const arr = unref(sortedArr);
  const sortBy = unref(sortByValue);
  const key = unref(sortKey);

  if (!arr.length) {return arr;}

  const lowerSortBy = sortBy.toLowerCase();

  if (lowerSortBy === "desc") {
    if (arr[0].finish) {
      return arr.sort((a, b) => new Date(b.finish) - new Date(a.finish));

    } else if (arr[0][key]) {
      return arr.sort((a, b) => new Date(b[key]) - new Date(a[key]));
    }
  }

  if (lowerSortBy === "asc") {
    if (arr[0].finish) {
      return arr.sort((a, b) => new Date(a.finish) - new Date(b.finish));

    } else if (arr[0][key]) {
      return arr.sort((a, b) => new Date(a[key]) - new Date(b[key]));
    }
  }

  if (sortBy !== "") {
    console.warn(`No such sort function for - "${sortBy}" value`);
  }

  return arr;
};
