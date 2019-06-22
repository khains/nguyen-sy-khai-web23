'use strict'

function generate(testLengthArray){
  return Array.from({length : testLengthArray.length})
    .map(item => ({
      input: Array.from({length: item}).map(item => []),
      target: 0,
      output: -1
    })
  //); // Remove this line and change to your own algorithm
  var bigger;
  for(var i = 0; i <= input.length; i++){
    for(var j = i + 1; j <= input.length; j++){
      if (input[i] > input[j]) {
      bigger = input[i];
      input[i] = input[j];
      input[j] = bigger;
    }
    }
  }
  return input;
  result = [];
  var item = {
    "input": [],
    "target": 0,
    "output": 0
  };
  // var a = item.input;
  // a.length = testLengthArray.length;
  for( let i = 0; i <= testLengthArray.length; i++){
    item.input[i] = Math.floor(Math.random() * (20000 - (-10000))) + (-10000);
  }
  input.target = Math.floor(Math.random() * 1000;
  result.push(item);

}

module.exports = generate
