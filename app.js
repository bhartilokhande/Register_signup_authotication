const express = require('express');
const app = express();
const studentRouter = require('./api/routes/student')
const userRouter = require('./api/routes/user')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload')




//connection with database
mongoose.connect('mongodb://localhost:27017/school')
mongoose.connection.on('error',err =>{
    console.log('connection failded');
});
mongoose.connection.on('connected',connected =>{
    console.log('connected with database')
});



app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/student',studentRouter)
app.use('/user',userRouter)
app.use(fileUpload({
    useTempFiles:true
}))





//for bad request
app.use((req,res,next) => {
    res.status(404).json({
        error : "url not found"
    })
})



module.exports =app;

