const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/pending', async (req,res)=>{
  const users = await User.find({status:'pending'});
  res.json(users);
});
router.get('/all', async (req,res)=>{
  const users = await User.find();
  res.json(users);
});
router.put('/approve/:id', async (req,res)=>{
  const user = await User.findByIdAndUpdate(req.params.id,{status:'approved'},{new:true});
  if(!user) return res.status(404).json({error:'User not found'});
  res.json({message:'Approved', user});
});
router.delete('/clear', async (req,res)=>{
  await User.deleteMany({});
  res.json({message:'All users deleted'});
});
module.exports = router;
