const mongoose = require("mongoose");

const taskSchema=new mongoose.Schema({
   title:{
      type:String,
   },
   description:{
      type:String,
   },
   // deadline:{
   //    type:Date,
   //    default:new Date(Date.now()+24*60*60*1000)
   // }
});

module.exports=mongoose.model("task",taskSchema);