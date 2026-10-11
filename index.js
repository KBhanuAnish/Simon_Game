const express =require("express");
const app=express();
const path=require("path");

app.listen(5600, () => {
    console.log("Simon game running at http://localhost:5600");
});

app.use(express.static(path.join(__dirname,"static")));

 app.get("/",(req,res)=>{
     res.sendFile(path.join(__dirname,"static","simon.html"));
 });