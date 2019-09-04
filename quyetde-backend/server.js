const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();


mongoose.connect("mongodb://localhost:27017/quyet-de-23", function(err){
    if(err) console.log(err)
    else console.log("Connect to DB success!!!")
});

const QuestionModel = require("./models/question");

// Find many: QuestionModel.find({})
// Find one: QuestionModel.findOne({})
// Find by id: QuestionModel.findById({})
// Create: QuestionModel.create({ field1: value1, field2: value2})
// Find and update: QuestionModel.findOneAndUpdate({}, {})
// Find and delete: QuestionModel.findOneAndDelete({}, {})
// QuestionModel.findByIdAndRemove == QuestionModel.findOneAndDelete

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false}));

// Add question
app.post("/addquestion", function(request, response){
    // console.log("Question!!!")
    // request.on("data", function(data){
    //     console.log("Data: ", data + "");
    // });
    // console.log(request.body);
    // const questionList = JSON.parse( fs.readFileSync("question.json", {encoding: "utf-8"}));

    // const lastQuestion = questionList[questionList.length - 1];

    // const question = {
    //     content: request.body.question,
    //     yes: 0,
    //     no: 0,
    //     id: 1
    // };

    // if(lastQuestion){
    //     question.id = lastQuestion.id + 1;
    // }

    // questionList.push(question);
    // fs.writeFileSync("question.json", JSON.stringify(questionList));

    QuestionModel.create({ 
        content: request.body.question
    }).then(function(questionCreated){
        response.redirect("http://localhost:5000/chi-tiet?questionId="+questionCreated._id);
    }).catch(function(err){
        console.log("Error: ", err);
    });

    // response.redirect("http://localhost:5000/chi-tiet?questionId="+question.id);
});

//param
app.get("/questioninfo/:questionId", function(request, response){
    console.log(request.params);
    // const questionList = JSON.parse( fs.readFileSync("question.json", {encoding: "utf-8"}));
    const questionId = request.params.questionId;

    // QuestionModel.findOne({ _id: questionId})
    QuestionModel.findById(questionId).then(function(question){
        response.send(question);
    });

//     const question = questionList.filter(function(questionItem){
//         return questionItem.id == questionId;
//     })[0];

//     response.send(question);
});

// vote
app.get("/randomquestion", function(request, response){
    // const questionList = JSON.parse( fs.readFileSync("question.json", {encoding: "utf-8"}));

    // const randomIndex = Math.floor(Math.random()*questionList.length);
    // const randomQuestion = questionList[randomIndex];

    // response.send(randomQuestion);

    // QuestionModel.find({}).then(function(questions) {
    //     const randomIndex = Math.floor(Math.random()*questions.length);
    //     const randomQuestion = questions[randomIndex];
    //     response.send(randomQuestion);
    
    // });

    QuestionModel.count({}).then(function(totalQuestion){
        QuestionModel.findOne({}).skip(Math.floor(Math.random()*totalQuestion))   
        .then(function(question){
            response.send(question);
        });
    });
});

app.post("/vote/:questionId", function(request, response){
    const vote = request.body.vote;
    const questionId = request.params.questionId;
    const questionList = JSON.parse( fs.readFileSync("question.json", {encoding: "utf-8"}));

    for(let i = 0; i < questionList.length; i++){
        if(questionList[i].id == questionId ){
            if(vote == "yes"){
                questionList[i].yes += 1;
                console.log(questionList[i]);
            }
            else{
                questionList[i].no += 1;
                console.log(questionList[i]);
            }
            
        }
    }

    fs.writeFileSync("question.json", JSON.stringify(questionList));
    response.redirect("http://localhost:5000/chi-tiet?questionId="+questionId);
    
});

const port = 6789;
app.listen(port, function(err){
    if(err) console.log(err)
    else console.log("Server start success!!!");
    
});
