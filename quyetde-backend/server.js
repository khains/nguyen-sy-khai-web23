const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false}));

// Add question
app.post("/addquestion", function(request, response){
    console.log("Question!!!")
    // request.on("data", function(data){
    //     console.log("Data: ", data + "");
    // });
    console.log(request.body);
    const questionList = JSON.parse( fs.readFileSync("question.json", {encoding: "utf-8"}));

    const lastQuestion = questionList[questionList.length - 1];

    const question = {
        content: request.body.question,
        yes: 0,
        no: 0,
        id: 1
    };

    if(lastQuestion){
        question.id = lastQuestion.id + 1;
    }

    questionList.push(question);
    fs.writeFileSync("question.json", JSON.stringify(questionList));

    response.redirect("http://localhost:5000/chi-tiet?questionId="+question.id);
});

//param
app.get("/questioninfo/:questionId", function(request, response){
    console.log(request.params);
    const questionList = JSON.parse( fs.readFileSync("question.json", {encoding: "utf-8"}));
    const questionId = request.params.questionId;

    const question = questionList.filter(function(questionItem){
        return questionItem.id == questionId;
    })[0];

    response.send(question);
});

// vote
app.get("/vote", function(request, response){
    const questionList = JSON.parse( fs.readFileSync("question.json", {encoding: "utf-8"}));

    const lastQuestion = questionList[questionList.length - 1];
    
    const idRandom = Math.floor(Math.random()* (lastQuestion.id - 1) + 1);
    console.log(idRandom);

    const question = questionList.filter(function(questionItem){
        return questionItem.id == idRandom;
    })[0];

    response.send(question);
});

const port = 6789;
app.listen(port, function(err){
    if(err) console.log(err)
    else console.log("Server start success!!!");
    
});
