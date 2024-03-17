const mongoose=require('mongoose');
const bookSchema=new mongoose.Schema({
    id:{type:String},
    name:{type:String,required:true},
    auther:{type:String,required:true},
    numPage:{type:Number,min:1},
    publishDate:{type:Date,default:new Date()}
})
module.exports.Book=mongoose.model('books',bookSchema)