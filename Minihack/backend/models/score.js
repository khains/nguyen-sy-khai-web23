const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
    round: {
        
        type: number,
        default: 1,
        listPlayer : {
            player1: {
                type: number,
                default: 0
            },
            player2: {
                type: Number,
                default: 0
            },
            player3: {
                type: Number,
                default: 0
            },
            player4: {
                type: Number,
                default: 0
            }
        }
    }
    
});

// const QuestionModel = mongoose.model("Question", QuestionSchema);

module.exports = mongoose.model("Question", QuestionSchema);

// QuestionModel.find({}).then(function(questions){
//     console.log("Question: ", questions);
// }).catch(function(err){
//     console.log("Error: ", err);
// });