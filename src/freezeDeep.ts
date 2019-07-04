const freezeDeep = function(obj: any) {
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      freezeDeep(obj[key]);
    }
  });
  return Object.freeze(obj);
};

export default freezeDeep;
