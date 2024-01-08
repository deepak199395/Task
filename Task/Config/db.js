const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async()=>{
    try {
        const conn= await mongoose.connect('mongodb+srv://ASP:ASP123@spyzy.cr7opeb.mongodb.net/test');
        console.log(`Connection established succsefully`.bgBlue)
    } catch (error) {
        console.log(`mongoDB error:${error.massage}`.bgCyan);
        process.exit(1);

    }
};
module.exports=connectDB;