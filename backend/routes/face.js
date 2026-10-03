const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Compare two face descriptors - Euclidean distance
function faceDistance(d1, d2){
 let sum=0;
 for(let i=0;i<d1.length;i++) sum += Math.pow(d1[i]-d2[i],2);
 return Math.sqrt(sum);
}

// POST /api/face/check - Called from face-verify.html
router.post('/check', async (req,res)=>{
 try{
  const {voterId, descriptor} = req.body;
  if(!descriptor) return res.json({allow:true});

  const allVotedUsers = await User.find({hasVoted:true, faceDescriptor:{$exists:true, $ne:[]}});

  for(let u of allVotedUsers){
   if(u.voterId === voterId) continue; // skip self
   if(!u.faceDescriptor || u.faceDescriptor.length===0) continue;

   let dist = faceDistance(descriptor, u.faceDescriptor);
   console.log(`Checking face vs ${u.voterId} distance: ${dist}`);

   // Threshold 0.5 = same person (face-api standard is 0.6)
   if(dist < 0.5){
    return res.json({
     allow:false,
     msg:`❌ Face Already Voted! Same face found as Voter ${u.voterId} (${u.name}). One Face = One Vote blocked.`
    });
   }
  }

  // If not duplicate, SAVE this face for this voter
  await User.updateOne({voterId}, {faceDescriptor: descriptor});

  res.json({allow:true, msg:"✅ Face verified - New person"});
 }catch(e){
  console.log(e);
  res.json({allow:true}); // Allow if error, don't block voting
 }
});

module.exports = router;