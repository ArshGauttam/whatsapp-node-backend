//importing
import express from "express";
import mongoose from "mongoose";



//app config
const app = express();
const port = process.env.PORT || 9000;

//middleware

//DB Config
const uri ='mongodb+srv://arshgauttam:ANZOd19trZlsvoBY@cluster01.osmwwtc.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(uri,{
          
}).then(
          ()=>{
          app.listen(process.env.PORT,()=>{
                    console.log("connected");
          });
}).catch((err)=>{
          console.log(err);
});



//?????

//api routes
app.get("/", (req, res) => res.status(200).send("hello world"));

//listen
app.listen(port, () => console.log('Listening to localhost:' + port));
