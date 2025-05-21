const GroupByKey = (list, key) => {
  var result = list.reduce(
    (hash, obj) => ({
      ...hash,
      [obj[key]]: (hash[obj[key]] || []).concat(obj),
    }),
    {}
  );
  return result;
};

export {GroupByKey};