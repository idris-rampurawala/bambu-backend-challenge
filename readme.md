# BAMBU Backend Engineer Test
This project has been created in NodeJS 6.2.2 Following libraries used

  - csv-parser -- for parsing csv to json/object
  - express -- to creat API

# Installation

  - clone the repository `git clone <repo-name>`
  - install dependencies via  `npm i`
  - run the code via `npm start`

# Additional Notes
I was not able to find the confidence calculation logic and hence created my own. Below is the logic

  - All the input parameters if passed any, are given an equal weightage. For example, if 2 params are passed then weightage is calculated as `1/params length` = `0.5`. If all params are passed then weightage = `0.2`
  - For each data set in the csv file, the confidence is calculated by taking into account of only the params that are passed. The formula is (for each param of a dataset),
  rate = 1 - (absolute((datasetValue - paramValue) / paramValue))
  confidence_score = rate * weightage
  - The over all confidence score for the dataset is sum of all the confidence scores for each params

To run the tests, use command  `npm test`.
