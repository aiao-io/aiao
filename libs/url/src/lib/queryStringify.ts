interface IQuery {
  [name: string]: string | number | Array<string | number>;
}

export const queryStringify = (query: IQuery) => {
  const params = new URLSearchParams();
  for (const key in query) {
    if (query.hasOwnProperty(key)) {
      const value = query[key];
      if (Array.isArray(value)) {
        value.forEach(val => params.append(key, `${val}`));
      } else {
        params.set(key, `${value}`);
      }
    }
  }
  params.sort();
  return params.toString();
};
