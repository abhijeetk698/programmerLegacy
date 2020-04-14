var express = require("express");
var app=express();
var request=require("request");
app.set("view engine","ejs");

app.get("/",(req,res)=>{
    res.render("home");
})


app.get("/results",(req,res)=>{
    var userId=req.query.userID;
    var url_info="https://codeforces.com/api/user.info?handles="+userId;
    var url_problem="https://codeforces.com/api/user.status?handle="+userId+"&from=1";
    request(url_info, function(error, response, body){
        if(!error && response.statusCode == 200) {
            var user_info = JSON.parse(body)
            request(url_problem, function(error, response, body){
                if(!error && response.statusCode == 200) {
                    var user_problems = JSON.parse(body)
                    res.render("result", {userInfo: user_info,userProb:user_problems});
                }
            });
        }
    });    
})

app.listen(2021,()=>{
    console.log("Server is Running");
});