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
const Player = require('./models/playerModel');
// ----------------------------------------------------
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,"static")));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"./static"));

app.listen(5600, () => {
    console.log("Simon game running at http://localhost:5600");
});


 app.get("/",(req,res)=>{
    res.render("index.ejs");
 });

 app.post("/",async(req,res)=>{
    let np_name=req.body["playername"];
    console.log(np_name);
    let new_player= await Player.create({user_namename: np_name,Score:0});
    res.render("simon.ejs",{new_player});
 });

 app.get("/leaderboard",async (req,res)=>{
  const players = await Player.find().sort({ Score: -1 });
  res.render("leaderboard.ejs",{players});
 });

app.post('/api/players/:id/score', async (req, res) => {
  const { id } = req.params;
  const score = Number(req.body.score);

  if (!mongoose.isValidObjectId(id) || !Number.isInteger(score) || score < 0) {
    return res.status(400).json({ error: 'Invalid player ID or score' });
  }

  try {
    const updatedPlayer = await Player.findByIdAndUpdate(id,
      { $max: { Score: score } },
      { new: true }
    );
    if (!updatedPlayer) return res.status(404).json({ error: 'Player not found' });
    res.json({ score: updatedPlayer.Score });
  } catch (error) {
    console.error('Could not save player score:', error);
    res.status(500).json({ error: 'Could not save score' });
  }
});
