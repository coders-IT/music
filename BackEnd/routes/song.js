const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Audio = require('../models/Audio');

router.get('/allsongs',async (req,res)=>{
    try{
        let doc = await Audio.find({});
        res.status(200).json({"success":"Successfully fetched all songs.",data:doc});
    }catch(error){
        res.status(500).json({error})
    }
})

router.get('/:id',async (req,res)=>{
    try{
        let doc = await Audio.findById(req.params.id);
        if(!doc)    res.status(404).json({"error":"Not found"});
        res.status(200).json({"success":"Successfully fetched song.",data:doc});
    }catch(error){
        res.status(500).json({error})
    }
})

router.use(auth);

router.post('/add',async (req,res)=>{
    try{
        let song = new Audio({
            name:req.body.name,
            uploadedBy:req.username,
            audio:req.body.audio,
            clip:req.body.clip
        })
        await song.save();

        let doc = await User.findOne({username:req.username});
        doc.contribAudio.push(song._id);
        await User.findOneAndUpdate({username:req.username},doc);
        
        res.status(200).json({"success":"Successfully added new song.",data:song._id});
    }catch(error){
        console.log({error})
        res.status(500).json({error});
    }
})

router.delete('/:id',async (req,res)=>{
    try{
        let doc = await Audio.findById(req.params.id);
        if(doc.uploadedBy !== req.username){
            res.status(400).json({"error":"You don't have correct access rights."});
            return;
        }  

        let user = await User.findOne({username:req.username});
        let i = user.contribAudio.indexOf(req.params.id);
        if(i>=0) user.contribAudio.splice(i,1);
        await User.findOneAndUpdate({username:req.username},user);
        
        await Audio.findByIdAndDelete(req.params.id);
        res.status(200).json({"success":"Song successfully deleted."});
    }catch(error){
        res.status(500).json({error});
    }
})

module.exports = router;