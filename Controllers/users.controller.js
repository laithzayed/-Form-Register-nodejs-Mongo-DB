const User = require('../models/user.model');
const userController={};


userController.register= async(req,res,next)=>{

      const { name , email, password ,joined} =req.body;
      const newUser =new User ({
          name ,
          email,
          password,
          joined
      });
      try{
const user =await newUser.save();
return res.send({
    user
});

      
      }
      catch(e){
       if (e.code === 11000 && e.name === 'MongoError'){
           var error= new Error(`email address ${newUser.email}isalready token`);
           next(error);
       } else{
        next(e);
      }
         
        
      }
   
    };
module.exports=userController;

