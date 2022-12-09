const express=require("express")
const request=require("request")
const bodyParser=require("body-parser")
const https=require("https")
const { callbackify } = require("util")

const app=express()

app.use(express.static("public"))

app.use(bodyParser.urlencoded({extended:true}))

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html")
})


app.post("/",function(req,res){

    const firstName=req.body.fName;
    const lastName=req.body.lName;
    const email=req.body.email;

    const data= {
        members: [
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
    }

    const JSONdata = JSON.stringify(data);

const url="https://us21.api.mailchimp.com/3.0/lists/ddb2e788af"
   
const options={
    method: "POST",
    auth:"sagnikb:d9cb231d667ad22b58c0ceb69c53acc9-us21"
}

const request= https.request(url,options,function(response){

    if(response.statusCode===200)
    res.sendFile(__dirname+"/success.html")
    else
    res.sendFile(__dirname+"/failure.html")

    response.on("data",function(data){
        console.log(JSON.parse(data))
    })
})
request.write(JSONdata)
request.end()
})

app.post("/failure",function(req,res){
    res.redirect("/")
})

app.listen(3000,function(){
    console.log("Server is running on port 3000")
})

