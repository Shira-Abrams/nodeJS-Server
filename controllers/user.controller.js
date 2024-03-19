const bcrypt=require('bcrypt');
const {User}=require('../models/user.models');
const user = require('../router/user.route');
// const user=express.Router()
// const {users} =require('../user')
exports.sinIn=async(req,res,next)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email})
    if(user){
        bcrypt.compare(password,user.password,(err,same)=>{
            if(err)
            return next(new Error(err.message))
            if(same)
            {
             return res.send({user})

            }
            //מחזיר תשובה כללית של לא מורשה 
            //כי כך מאובטח יותר
            //ואת הסיסמא המוצפנת מתוך הדטהבייס
            next({message:'Auth Failed', status: 401})
        })
    }
}
exports.signUp=async(req,res,next)=>{
    const{username,email,password}=req.body;
    //
    try {
        const user=new user({username,email,password})
        await user.save();//pre קודם הולך לפעולה
        //שם מוצפנת הסיסמא 
        //................
        return res.status(201).json(user.user)
    } catch (error) {
        return next({ message: error.message, status: 409 })

    }
}