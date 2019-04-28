const fs = require('fs');
const csv = require('csv-parser');
const util = require('../util/util');
const conf = require('../config')

const get = (req, res) => {
  let results = [];
  fs.createReadStream(conf.dataFilePath)
    .pipe(csv())
    .on('data', function (data) {
      try {
        //perform the operation
        const score = calculateConfidence(data, req.query.age, req.query.latitude, req.query.longitude, req.query.monthlyIncome,
          req.query.experienced);
        // limit to a confidence lower limit
        if (score >= conf.confidenceLowerLimit) {
          results.push({
            name: data.name,
            age: data.age,
            latitude: data.latitude,
            longitude: data.longitude,
            monthlyIncome: data.monthly_income,
            experienced: data.experienced,
            score: score
          });
        }
      }
      catch (err) {
        //error handler
      }
    })
    .on('end', function () {
      //some final operation
      // first sort by name and then score
      results = util.sortDataSet(results, 'name')
      results = util.sortDataSet(results, 'score');
      // limit the results if passed in the query params or default value from config
      results = results.slice(0, req.query.limit || conf.responseLimit);
      res.status(200).json({ peopleLikeYou: results });
    });
};

/* 
  Calculates the confidence score for a given row of data
*/
function calculateConfidence(row, age, latitude, longitude, monthlyIncome, experienced) {
  const currentRow = [];

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
    // currentRow.push([+row['experienced'], +experienced]);
    currentRow.push([row['experienced'] == experienced ? 1 : 0, 1]);
  }

  const averageWeight = 1 / currentRow.length;
  let result = 0;
  currentRow.forEach(function (entry) {
    try {
      result += averageWeight * (1 - Math.abs((entry[1] - entry[0]) / entry[1]));
    } catch (err) {
      console.log('error', err);
      result += averageWeight * entry[1];
    }
  });
  result = Math.floor(result * 100) / 100;
  // rounding off to one decimal point
  return Math.round(result * 10) / 10;
}

module.exports = { get };