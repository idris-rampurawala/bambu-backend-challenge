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
        const score = util.calculateConfidence(data, req.query.age, req.query.latitude, req.query.longitude, req.query.monthlyIncome,
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

module.exports = { get };