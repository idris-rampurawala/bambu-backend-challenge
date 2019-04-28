module.exports.sortDataSet = (arr, attribute, desc = true) => {
  const sortReturn = [];
  if (!desc) {
    sortReturn[0] = 1;
    sortReturn[1] = -1;
  } else {
    sortReturn[0] = -1;
    sortReturn[1] = 1;
  }
  return arr.sort((a, b) => (a[attribute] > b[attribute]) ? sortReturn[0] : sortReturn[1]);
}