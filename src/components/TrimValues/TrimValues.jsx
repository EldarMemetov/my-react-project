const trimValues = values => {
  const trimmedValues = {};

  for (const [key, value] of Object.entries(values)) {
    if (typeof value === 'string') {
      trimmedValues[key] = value.trim();
    } else {
      trimmedValues[key] = value;
    }
  }
  return trimmedValues;
};
export default trimValues;
