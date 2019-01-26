const MAX_ELEMENTS_TO_CHECK = 5;

export const checkArrayTable = (
  data,
  options = {}
) => {
  let {
    N = MAX_ELEMENTS_TO_CHECK,
    columMinUsage = .5,
    minSimilarColumns = 2,
  } = options;

  let columns = {};
  let toCheck = N > 0 ? Math.min(data.length, N): data.length;
  for (let i = 0; i < toCheck; ++i) {
    let element = data[i];
    if (!isObject(element)) {
      return false;
    }
    Object.keys(element).forEach(col => {
      columns[col] = (columns[col] || 0) + 1;
    });
  }
  let colsByFrequency = Object.entries(columns)
    .sort((a, b) => b[1] - a[1]); // sort by descending count

  let countSimilar = 0;
  for (let i = 0; i < colsByFrequency.length; i++) {
    if (colsByFrequency[i][1] < toCheck * columMinUsage) break;
    countSimilar++;
  }

  if (countSimilar >= minSimilarColumns) return Object.keys(columns);
  return null;
};

export const checkObjectTable = (
  data,
  options = {}
) => {

  let arrayData = Object.entries(data)
    .map(([key, value]) => {
      if (isObject(value)) {
        return {index: key, ...value};
      }
      return {index: key, value};
    });

  return checkArrayTable(arrayData, {...options, minSimilarColumns: 4});
};

export const isObject = function(a) {
  return (!!a) && (a.constructor === Object);
};

export const isArray = function(a) {
  return (!!a) && (a.constructor === Array);
};
