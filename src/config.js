const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3000;
const confidenceLowerLimit = 0.4
const responseLimit = 10

if (env === 'test') {
  process.env.dataFilePath = './data/testData.csv'
} else {
  process.env.dataFilePath = './data/data.csv'
}

module.exports = {
  env,
  port,
  dataFilePath: process.env.dataFilePath,
  confidenceLowerLimit,
  responseLimit
}