const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register
router.post('/register', async (req,res)=>{
  try{
    const {name,voterId,aadhaar,phone,email} = req.body;
    if(!voterId || !aadhaar) return res.status(400).json({error:'voterId & aadhaar required'});
    const exists = await User.findOne({$or:[{voterId},{aadhaar}]});
    if(exists) return res.status(400).json({error:'User already exists'});
    const user = await User.create({name,voterId,aadhaar,phone,email,status:'pending'});
    res.json({message:'Registered! Waiting for Admin Approval', user});
  }catch(e){ res.status(500).json({error:e.message}); }
});

// Login
router.post('/login', async (req,res)=>{
  try{
    const {voterId,aadhaar} = req.body;
    const user = await User.findOne({voterId,aadhaar});
    if(!user) return res.status(404).json({error:'User not found'});
    if(user.status!=='approved') return res.status(403).json({error:'Not approved by Admin yet'});
    if(user.hasVoted) return res.status(403).json({error:'Already Voted - Fraud Blocked'});
    res.json({message:'Login Success', user});
  }catch(e){ res.status(500).json({error:e.message}); }
});
module.exports = router;
