const express = require('express')
const app = express()
const port = 5000

const bodyParser = require('body-parser');
const cookieParse = require('cookie-parser')
const { User } = require("./model/User");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParse());

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

app.post('/login', (req,res)=>{
    console.log(req.body)
    //요청된 email db에 있는지 확인
    User.findOne({email: req.body.email},(err,user) =>{
        if(!user){
            return res.json({
                loginSuccess:false,
                message:"no such user"
            })
        }
        //있다면 비밀번호 확인
        user.comparePassword(req.body.password, (err, isMatch) =>{
            console.log(isMatch)
            if(!isMatch) {
                return res.json({
                    loginSuccess: false,
                    message: "invalid credential"
                })
        //비밀번호까지 같다면 토큰을 생성
            }
            user.generateToken((err,user)=>{
                if(err) return res.status(400).send(err);

                //토큰을 저장 - 쿠키, 로컬스토리지
                res.cookie("x_auth", user.token)
                    .status(200)
                    .json({loginSuccess : true, userId: user._id})
            })
        })
    })


})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

