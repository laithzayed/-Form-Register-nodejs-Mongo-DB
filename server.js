const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
 const bodyParser=require('body-parser');
//--form task---
//  const logger =require(morgan);
 const v1  =require('./routes/api/v1');
 const jwt = require('jsonwebtoken');
 const fs = require('fs');
const { verify } = require('crypto');

 let secret = fs.readFileSync('secret.key');



require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

//Routers
 app.use('/api/v1',require('./routes/api/v1'));

app.get('/api', (req,res) => {
  res.json({
    message: "hello World!"
  })
})

app.get('/api/posts', verifyToken, (req,res) => {
  res.json({
    message: "post created ...."
  })
})

//login
app.post('/api/login', (req,res) => {
  const user = {
    id:1,
    username: 'laith',
    password: 'ZRRRRRRTTTTO'
  }

  jwt.sign({user}, secret, (err,token) => {
    if (err) {
      res.json({
        message: "username or password not valid/correct"
      })
    }
    res.json(token)
  })
})

function verifyToken (req,res,next) {

}

app.get('/test',(req,res)=>{
  res.send('Hi');
});




app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
