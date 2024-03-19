
const express=require('express');
const {
  signUp,
  sinIn
}=require('../controllers/user.controller');
const router=express.Router();
//sinIn
router.post('/signIn',sinIn)
router.post('/signUp',signUp)
module.exports=router