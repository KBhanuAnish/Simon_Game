const express =require("express");
const app=express();
const path=require("path");
const ejs = require('ejs');

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
// ----------------------------------------------------
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/static"));
app.use(express.static(path.join(__dirname,"static")));

app.listen(5600, () => {
    console.log("Simon game running at http://localhost:5600");
});


 app.get("/",(req,res)=>{
    res.render("index.ejs");
 });

 app.post("/",async(req,res)=>{
    let np_name=req.body["playername"];
    console.log(np_name);
   let n_player=new player({
        user_namename: np_name,
  Score:0
   });
    await player.create(n_player);
    res.render("simon.ejs",{n_player});
 });
