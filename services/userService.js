const {User} = require('../models/userModel');
const passport=require('passport');

const userLogin = (req,res) => {
    const userId=req.session.passport.user;

    User.findById(userId,(err,user)=>{
        if(err)
            res.status(404).json({message:err.message})
        else
            res.status(201).json({message : "success", id : userId , name : user.name});
    })
    
}

const userRegister = (req,res) => {
    User.register({username:req.body.username,
                   name:req.body.name},req.body.password,function(err,user){
        if(err){
            console.log(err);
            res.status(406).json({message : err.message});
        }
        else{
            passport.authenticate("local")(req,res,function(){
                res.status(201).json({message : "success", id : user._id , name: user.name});
            })
        }
    })
}

module.exports={userLogin,userRegister};

