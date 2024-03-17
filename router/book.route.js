
const express=require('express');
const{
    GetAllBook,
    DeleteBook,
    GetBookById,
    AddBook,
    UpdateBook
}=require('../controllers/book.controller')
const router=express.Router();
router.get('/',GetAllBook);
router.get('/:id',GetBookById);
router.post('/',AddBook);
router.put('/:id',UpdateBook);
router.delete('/:id',DeleteBook);
module.exports=router;