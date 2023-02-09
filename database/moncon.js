const mongoose=require("mongoose");
const url="mongodb+srv://saroyar:saroyar43@cluster0.6oa8trz.mongodb.net/todo_list?retryWrites=true&w=majority";

exports.databaseconnect=()=>{
    mongoose.connect(url,()=>{
        console.log("mosgoose connect to database");
    })
}

