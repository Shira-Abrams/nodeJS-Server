const express = require('express');

const book=express.Router()
const {Books}=require('../book')


book.post( "/", (req,res,next)=>{
   const newBook=req.body;
   console.log(newBook);
   let lastId=Books[Books.length-1].id+1

   if(isNaN(lastId))
   lastId=100;
   newBook.id=lastId 
   Books.push(newBook)
   res.status(200).send(newBook)

})


book.put("/:id",(req,res)=>{
    const id=+req.params.id;
    if(id!=req.body.id)
    res.status(409).json({error:'make sure the id book are similar'})
    const updatBook=Books.find(x=>x.id==id);

    if(updatBook)
    {
        updatBook.auther=req.body.auther||updatBook.auther;
        updatBook.name=req.body.name||updatBook.name
        res.send(updatBook)

    }
    res.status(404).json({error:'book bo fuond'})
})

book.get( "/" ,(req,res)=>{

    res.send(Books)
})


book.get( "/:id" ,(req,res)=>{


    const {id}=req.body;//another way to extract  the id form the body request  by curly braket 
    const getBook=Books.find(x=>x.id==id)
    if(getBook)
    res.send(getBook)
   res.status(404).json({error:'non found user !!'})
})

book.delete("/:id",(req,res)=>{

    const id=+req.body.id;
    const deletedBook=Books.findIndex(x=>x.id==id);
    if(deletedBook)
    res.send('ok 200 was deleted succesfully')
   else
   res.status(404).json({error:'book not found '})
})
 module.exports=book