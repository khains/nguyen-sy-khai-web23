'use strict'

function generate(testLengthArray){
  const result = [];

 for(let i = 0; i< testLengthArray.length; i++){
   const inputLength = testLengthArray[i];
   const item = {
     input: [],
     output: null,
     target: null
   };
 }
 for(let j = 0; j < inputLength; j++){
   item.input.push(Math.floor(Math.random()*20000 - 10000));
 }
  item.input = item.input.sort((a,b) => a-b);
  if(i == 0){
    item.target = 10001;
    item.output = -1;
  }

  if(i == 1){
    item.target = item.input[0];
    item.output = 0;
  }

  if(i == 2){
    item.target = item.input[item.input.length - 1];
    item.output = item.input.length - 1;
  }
  
  if(i == 3){
    item.target = item.input[1];
    item.output = 1;
  }

  if(j > 3){
    item.target = Math.floor(Math.random()*20000 - 10000);
    item.output = -1;
  }

 result.push(item);
}
return result;
// Remove this line and change to your own algorithm

  //   var bigger;
//   for(var i = 0; i <= input.length; i++){
//     for(var j = i + 1; j <= input.length; j++){
//       if (input[i] > input[j]) {
//       bigger = input[i];
//       input[i] = input[j];
//       input[j] = bigger;
//     }
//     }
//   }
//   return input;
//   result = [];
//   var item = {
//     "input": [],
//     "target": 0,
//     "output": 0
//   };
//   // var a = item.input;
//   // a.length = testLengthArray.length;
//   for( let i = 0; i <= testLengthArray.length; i++){
//     item.input[i] = Math.floor(Math.random() * (20000 - (-10000))) + (-10000);
//   }
//   input.target = Math.floor(Math.random() * 1000);
//   result.push(item);

// }

module.exports = generate
