const express = require('express');
const router = express.Router();
const Student = require('../model/student')
const mongoose = require('mongoose') 
const checkAuth = require('../middleware/check_auth')
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'sample', 
    api_key: '874837483274837', 
    api_secret: 'a676b67565c6767a6767d6767f676fe1',
    secure: true
  });



 
//api for student/name router(new page)
router.get('/name',(req,res,next)=>{
    res.status(200).json({
        message:"This is studentname get request"
    })
})

//api for get data from database
router.get('/', checkAuth,(req,res,next)=>{
    Student.find()
    .then(result => {
        res.status(200).json({
            studentdata:result
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})

//api for get data by id from database
router.get('/:id',(req,res,next)=>{
    // console.log(req.params.id);
    Student.findById(req.params.id)
    .then(result => {
        res.status(200).json({
            student:result
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
   
})


//api for save data in database
router.post('/',(req,res,next) =>{   
    // console.log(req.body.name);
    const student = new Student({
        _id:new mongoose.Types.ObjectId,
        name:req.body.name,
        age:req.body.age,
        gender:req.body.gender
    })
    student.save()
    .then(result => {
        console.log(result);
    res.status(200).json({
        newStudent:result
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
    })
})

//api for delete data 
router.delete('/:id',(req,res,next)=>{
     Student.remove({_id:req.params.id})
     .then(result => {
         console.log(result);
         res.status(200).json({
             msg:"data deleted",
             result:result
         })
         .catch(err => {
             res.status(500).json({
                 msg:"somthing went wrong",
                 error:err
             })
         })
     })
})

//api for update data 
router.put('/:id',(req,res,next) => {
    // console.log(req.params.id);
    Student.findOneAndUpdate({_id:req.params.id},{
        $set:{
            name:req.body.name,
            age:req.body.age,
            gender:req.body.gender
        }
    })
    .then(result =>{
        res.status(200).json({
            msg:"data Update succfully",
            updated_data:result
        })
    })
    .catch(err => {
        res.status(500).json({
            msg:"not update",
            error:err
        })
    })
})

module.exports = router;

