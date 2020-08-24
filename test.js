const addZeroForTimezonOffset = (data) => {
  const sign = data.toString()[0];
  const dataAbs = Math.abs(data) / 60;
  let result = dataAbs.toString();

  if (result < 10 || result > 100) {
    result = "0" + result;
  }

  for (let i = result.length; i < 4; i++) {
    result = result + "0";
  }

  if (sign == "-") {
    result = "+".concat(result);
  } else if (data !== 0) {
    result = "-".concat(result);
  } else {
    result = "+".concat(result);
  }
  console.log(result)
  return result;
}

addZeroForTimezonOffset(-810)