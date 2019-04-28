const cal = require('../util/util')
const assert = require('assert');

it('Test confidence score calculation by age', function () {

  let testObj = { "name": "Georgina", "age": 99, "latitude": "-21.8315657", "longitude": "46.9368047", "monthly_income": 7494, "experienced": false }

  let expected = Math.floor((1 - (150 - 99) / 150) * 100) / 100;
  expected = Math.round(expected * 10) / 10;

  assert.equal(cal.calculateConfidence(testObj, 150, undefined, undefined, undefined, undefined), expected);
});

it('Test confidence score calculation by experienced', function () {

  let testObj1 = { "name": "Laryssa", "age": 33, "latitude": "52.1985472", "longitude": "20.6169567", "monthly income": 12310, "experienced": "true" }
  let testObj2 = { "name": "Kimmie", "age": 97, "latitude": "34.149491", "longitude": "-118.099449", "monthly income": 9333, "experienced": "false" };

  let expected1 = 1;
  let expected2 = 0;

  assert.equal(cal.calculateConfidence(testObj1, undefined, undefined, undefined, undefined, 'true'), expected1);
  assert.equal(cal.calculateConfidence(testObj2, undefined, undefined, undefined, undefined, 'true'), expected2);
});


it('Test confidence score calculation by all', function () {

  let testObj = { "name": "Georgina", "age": 99, "latitude": "-21.8315657", "longitude": "46.9368047", "monthly_income": 7494, "experienced": false }

  let expected = Math.floor((
    (1 - Math.abs((99 - 23) / 23)) * 0.2
    + (1 - Math.abs((-21.8315657 - 40.71667) / 40.71667)) * 0.2
    + (1 - Math.abs((46.9368047 - 19.56667) / 19.56667)) * 0.2
    + (1 - Math.abs((7494 - 5500) / 5500)) * 0.2
    + 0
  ) * 100) / 100;
  expected = Math.round(expected * 10) / 10;

  assert.equal(cal.calculateConfidence(testObj, 23, 40.71667, 19.56667, 5500, 'false'), expected);
});
