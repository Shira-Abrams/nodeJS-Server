const express = require('express');

const user=express.Router()
const {users} =require('../user')
user.get("/",(req,res)=>{
 
    res.send(users)
});

user.post("/singup",(req,res,next)=>{
    const  userPasswored=req.body.password;
    const logedUser=users.find(x=>x.password==userPasswored)
    if(logedUser)
    res.send(logedUser)
    res.status(404).send('didnt found user')


})

user.post("/",(req,res,next)=>{
    const newUser=req.body;
    console.log(newUser);
    let lastId=users[users.length-1].id+1
    if(isNaN(lastId))
      lastId=100
      newUser.id=lastId;
      users.push(newUser)
      res.status(201).send(newUser)
})
user.put("/:id" ,(req,res)=>{
     const id=+req.params.id;
     if(id!=req.body.id)
       res.status(409).json({error:'make sure the id user are similar'})
       const updateUser=users.find(x=>x.id==id)
       if(updateUser)
       {
            updateUser.email=req.body.email||updateUser.email;
            updateUser.password=req.body.password||updateUser.email;
            updateUser.name=req.body.name||updateUser.name
            res.send(updateUser)

       }
       res.status(404).json({error:'user not found'})

})
module.exports=user