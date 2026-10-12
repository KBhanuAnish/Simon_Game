const express =require("express");
const app=express();
const path=require("path");


// creating a mongo db connection
const mongoose = require('mongoose');

main().then(()=> console.log("connection Succesful"))
.catch(err => console.log(err));

async function  main(){
await mongoose.connect('mongodb://127.0.0.1:27017/Simon');
}
const PlayerSchema = new mongoose.Schema({
  user_namename: String,
  Score:Number
});
const player= mongoose.model('Player',PlayerSchema);


app.listen(5600, () => {
    console.log("Simon game running at http://localhost:5600");
});

app.use(express.static(path.join(__dirname,"static")));

 app.get("/",(req,res)=>{
     res.sendFile(path.join(__dirname,"static","simon.html"));
 });