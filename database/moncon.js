const mongoose=require("mongoose");
// const uri="mongodb+srv://saroyar:saroyar43@cluster0.6oa8trz.mongodb.net/todo_list?retryWrites=true&w=majority";
const uri="mongodb://localhost:27017/todolist";

exports.databaseconnect=()=>{
    mongoose.connect(uri,()=>{
        console.log("mosgoose connect to database");
    })
}

