//importing
import express, { response } from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";
import Pusher from "pusher";



//app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
          appId: "1608348",
          key: "f12ea26b9ae9cabab1af",
          secret: "0b4f80ef5af40b138490",
          cluster: "ap2",
          useTLS: true
        })

//middleware

app.use(express.json());

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers","*");
  next();
})


//DB Config
const uri = 'mongodb+srv://arshgauttam:ANZOd19trZlsvoBY@cluster01.osmwwtc.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(uri, {

}).then(
          () => {
                    app.listen(process.env.PORT, () => {
                              console.log("connected");
                    });
          }).catch((err) => {
                    console.log(err);
          });

const db =mongoose.connection;
db.once("open",()=>{
  console.log('DB connected');
  const msgCollection= db.collection("messagecontents");
  const changeStream=msgCollection.watch();
  changeStream.on("change",(change)=>{
    console.log("A change occured"+change);

    if(change.operationType=='insert'){
      const messageDetails=change.fullDocument;
      pusher.trigger('messages','inserted',{
        name:messageDetails.name,
        message:messageDetails.message,
        timestamp:messageDetails.timestamp,
        recieved:messageDetails.recieved,
      });
    }else{
      console.log('Error triger Pusher');
    }
  })
})

//?????

//api routes
app.get("/", (req, res) => res.status(200).send("hello world"));

app.post('/messages/new', (req, res) => {
          const dbMessage = req.body;

          Messages.create(dbMessage).then((data, err) => {
                    if (err) {
                              console.log(err)
                              res.status(500).send(err)
                    } else {
                              res.status(201).send(data)
                    }
          })

})
app.get('/messages/sync', (req, res) => {
          Messages.find().then((data, err) => {
                    if (err) {
                              console.log(err)
                              res.status(500).send(err)
                    } else {
                              res.status(201).send(data)
                    }
          })})


          //listen
          app.listen(port, () => console.log('Listening to localhost:' + port));
