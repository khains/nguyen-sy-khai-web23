const express = require("express");
const app = express();

// Router
app.get("/", function(request, response){
    console.log("Homepage");
    // response.send("<h1>Homepage update<h1>");
    response.sendFile(__dirname + "/web23/HTML-CSS/index.html");
});

// Router
// app.get("/style.css", function(req, res){
//     res.sendFile(__dirname + "/web23/HTML-CSS/style.css");
// });

app.use(express.static("web23/HTML-CSS"));

const port = 5000;
app.listen(port, function(err){
    if(err) console.log(err)
    else console.log("Server start success!!!");
});