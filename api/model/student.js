const mongoose = require('mongoose');


//create Student_info schema
const studentSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    age:Number,
    gender:String
})


module.exports = mongoose.model('Student_info',studentSchema); //export collection name and schema