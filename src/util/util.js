/* 
  Calculates the confidence score for a given row of data
*/
const calculateConfidence = (row, age, latitude, longitude, monthlyIncome, experienced) => {
  const currentRow = [];
  debugger;
  if (age) {
    currentRow.push([row['age'], age]);
  }

  if (latitude) {
    currentRow.push([row['latitude'], latitude]);
  }

  if (longitude) {
    currentRow.push([row['longitude'], longitude]);
  }

  if (monthlyIncome) {
    currentRow.push([row['monthly_income'], monthlyIncome]);
  }

  if (experienced) {
    currentRow.push([row['experienced'] == experienced ? 1 : 0, 1]);
  }

  const averageWeight = 1 / currentRow.length;
  let result = 0;
  currentRow.forEach(function (entry) {
    debugger;
    try {
      result += averageWeight * (1 - Math.abs((entry[0] - entry[1]) / entry[1]));
    } catch (err) {
      console.log('error', err);
      result += averageWeight * entry[1];
    }
  });
  result = Math.floor(result * 100) / 100;
  // rounding off to one decimal point
  return Math.round(result * 10) / 10;
}

/* 
  Sorts the dataset via attribute that's passed in
*/
const sortDataSet = (arr, attribute, desc = true) => {
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

module.exports = {
  calculateConfidence,
  sortDataSet
}