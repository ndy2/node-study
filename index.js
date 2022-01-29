const express = require('express')
const app = express()
const port = 5000

const bodyParser = require('body-parser');
const { User } = require("./model/User");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


const mongoose = require('mongoose')

const config = require('./config/key')

mongoose
    .connect(config.mongoURI
    ,{useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>console.log('MongoDB Connected...'))
    .catch(err => console.log(err))

app.get('/',(req,res)=>res.send('Hello World'))

app.post('/register',(req,res)=>{

    //회원 가입 할때 필요한 정보들을 client

    const user =new User(req.body)
    user.save((err) =>{
        if(err) return res.json({success: false,err})
        return res.status(200).json({
            success: true
        })
    })
});



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

