import mongoose from "mongoose";
const whatsappschema=mongoose.Schema({
          message:String,
          name: String,
          tiemstamp:String,

});

export default mongoose.model('messageContent',whatsappschema);