export const queryParse = (query: string) => {
  const obj: any = {};
  const params = new URLSearchParams(query);
  params.forEach((value, key) => {
    if (obj.hasOwnProperty(key)) {
      const val = obj[key];
      if (Array.isArray(val)) {
        val.push(value);
      } else {
        obj[key] = [val, value];
      }
    } else {
      obj[key] = value;
    }
  });
  return obj;
};
