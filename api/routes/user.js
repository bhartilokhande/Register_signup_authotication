const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../model/user');
const bcrypt = require('bcrypt'); //for convert password into hash code
const jwt = require('jsonwebtoken');


//api for signup user
router.post('/signup', (req, res, next) => {
    //convert password into hash code
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            })
        } else {

            const user = new User({
                _id: new mongoose.Types.ObjectId,
                username: req.body.username,
                password: hash,
                phone: req.body.phone,
                email: req.body.email,
                userType: req.body.userType
            })


            user.save()                          ///sava data in database
                .then(result => {
                    res.status(200).json({
                        msg: "signup successfully",
                        new_user: result
                    })
                })
                .catch(err => { 
                    res.status(500).json({
                        error: err
                    })

                })
        }
    })
})

//api for login user
router.post('/login', (req, res, next) => {
    User.find({ username: req.body.username })
        .exec()
        .then(user => {
            if (user.length < 1) //condition for user exist 
            {
                return res.status(401).json({
                    msg: "user not exist"
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (!result) {
                    return res.status(401).json({
                        msg: 'password wrong'
                    })
                } if (result) { //getneratin token
                    const token = jwt.sign({
                        username: user[0].username,
                        userType: user[0].userType,
                        email: user[0].email,
                        phone: user[0].phone
                    },
                        "thisismyscretekeyofjwttokent", //secret key of token
                        {
                            expiresIn: "24h"
                        }
                    );
                    res.status(200).json({
                        username: user[0].username,
                        userType: user[0].userType,
                        email: user[0].email,
                        phone: user[0].phone,
                        token: token
                    })
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})

//process of genrateing token
// const createToken = async() => {
//     const token = await jwt.sign({_id:"619240385dd7a110f0ce6a61"},"thisismyscretekeyofjwttokent")
//      console.log(token);
//      const userVer = await jwt.verify(token,"thisismyscretekeyofjwttokent")
//      console.log(userVer);
// }

// createToken();



module.exports = router;