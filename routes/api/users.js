const express = require('express');
const router = express.Router();
const config = require('config');
const User = require('../../models/user.model');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator/check');



// @route    Get api/users
// desc      Testing user route 
// @access   public


router.get('/', [

    check('name', 'Name is required input').not().isEmpty(),
    check('email', 'Please enter a valid email').not().isEmpty(),
    check('password', 'Please enter password of 6 character at Least').not().isLength({min:6})

],

async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    //Note: Destructure for body, it will give name,email,password from body and save them here in const { name,emai,password } respectively.
    const { name, email, password } = req.body;

    try {
        //step 1 check if user exist 
        //Note: Record will be is the unique in Schema ( Only one variable will be unique ).
        let user = await User.findOne({ email })

        if(user){
            res.status(400).json({ errors: [{ msg: 'Email already in use' }]});
            
                //add gravatar to insert it to Mongo-DB
            const avatar = gravatar.urll(email, {
                s: '200',
                r: 'pg',
                d:'mp'
                })

                //instantiate user 
                user = new user({
                    name,
                    email,
                    avatar,
                    password
                });

                //Encrypt password
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(password, salt);
                await user.save();
        }

        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
    
    //object of the data we will be sending to this route
    // res.send('User Route');
);

//Middleware Initiation// 
//extended: false => mean you need to send Returns middleware that only parses JSON and only looks at requests where the Content-Type header matches the type option.
// ->(continuo) This parser accepts any Unicode encoding of the body and supports automatic inflation of gzip and deflate encodings.
app.use(express.json({extended: false}))

module.exports = router;