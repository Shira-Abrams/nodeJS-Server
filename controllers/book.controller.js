// const express = require('express');

// const user=express.Router()
// const {users} =require('../user')
const mongoose = require('mongoose')
const {Book}=require('../models/book.models');
// const book = require('../router/book.route');
exports.GetAllBook=async(req,res,next)=>{
    try {
        const books=await Book.find().select('-__v')
        return res.json(books)
    } catch (error) {
       next(error) ;
    }
}

exports.GetBookById=(req,res,next)=>{
    const id=req.params.id
    console.log(mongoose.Types.ObjectId.isValid(id));
    if(!mongoose.Types.ObjectId.isValid(id))
    next({ message: 'id is not valid' })
    else{
        Book.findById(id,{__v:false})
        .then(b=>{
            res.json(b)
        })
        .catch(err=>{
            next({ message: 'book not found', status: 404 })

        })
    }
};

exports.AddBook=async(req,res,next)=>{
    try {
        const b=new Book(req.body)
        await b.save;
        return res.status(201).json(req.body)
    } catch (error) {
        next(err)
    }
}
exports.UpdateBook=async(req,res,next)=>{
    const id=req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id))
    next({message:'id is not valid'})
try {
    const b=await Book.findByIdAndUpdate(
        id,
        {$set:req.body},
        {new:true}
    );
    return res.json(b)
} catch (error) {
    next(error)
}
}
exports.DeleteBook=async(req,res,next)=>{
    const id=req.body.id;
    if(!mongoose.Types.ObjectId.isValid(id))
    next({message:'id is not alid'})
else{
    try {
         if(!(await Book.findById(id)))
           return next({message:'book not found',status:404})
        //if book exsit delete it from the db
        await Book.findByIdAndDelete(id)
        res.status(204).send()
    } catch (error) {
        return next(error)
        
    }
}
}
