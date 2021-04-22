const trimText = (text, min = 180, max = 200) => {
  let firstSpace, resultIdx;

  if (resultIdx === undefined) {
    if (firstSpace >= min && firstSpace <= max) {
      resultIdx = firstSpace;
    } else {
      resultIdx = max;
    }
  }

  return [text.slice(0, resultIdx), text.slice(resultIdx).trim()];
};

export default trimText;
