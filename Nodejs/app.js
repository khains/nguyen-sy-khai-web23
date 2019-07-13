// console.log("Hello World");

const fs =  require('fs');

// fs.writeFile('data.txt', "Hello World!!!", function(err){
//     if (err) console.log('Fail')
//     else console.log("Success"); 
          
// });

// fs.writeFileSync('dataSync.txt', "Data Sync");

// fs.readFile('data.txt', {encoding: "utf-8"}, function(err, data){
//     if (err) console.log('Fail')
//     else console.log("Success", data); 
          
// });

// console.log("dataSync: ", fs.readFileSync("dataSync.txt"));

const obj = {
    name: "Huy",
    age: 23
}

// fs.writeFileSync("objData.txt", JSON.stringify(obj));

const getObj = require("./module");
const fileDataObj = getObj("objData.txt");

// const fileData = fs.readFileSync("objData.txt", {encoding: "utf-8"});
// const fileDataObj = JSON.parse(fileData);
console.log("Toi la " + fileDataObj.name + ", " + fileDataObj.age + " tuoi");