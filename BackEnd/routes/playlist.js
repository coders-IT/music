const express = require('express');
const { route } = require('../middleware/auth');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Playlist = require('../models/Playlist');

router.get('/allplaylists',async (req,res)=>{
    try{
        let doc = await Playlist.find({}).limit(10);
        res.status(200).json({"success":doc});
    }catch(error){
        res.status(500).json({"error":error});
    }
})

router.get('/:id',async (req,res)=>{
    try{
        let doc = await Playlist.findById(req.params.id);
        res.status(200).json({"success":doc});
    }catch(error){
        res.status(500).json({"error":error});
    }
})

router.use(auth);

router.post('/create',async (req,res)=>{
    try{
        let playlist = new Playlist({
            name:req.body.name,
            createdBy:req.username,
            songs:req.body.songs
        })
        await playlist.save();
        
        let doc = await User.findOne({username:req.username});
        doc.contribPlayList.push(playlist._id);
        await User.findOneAndUpdate({username:req.username},doc);
        
        res.status(200).json({"success":"Successfully created new playlist."});
    }catch(error){
        res.status(500).json({"error":error});
    }
})


router.post('/edit/:id',async (req,res)=>{
    try{
        let doc = await Playlist.findById(req.params.id);
        if(doc.createdBy !== req.username){
            res.status(400).json({"error":"You don't have correct access rights."});
            return;
        }
        doc.songs = req.body.songs;
        await Playlist.findByIdAndUpdate(req.params.id,doc);
        res.status(200).json({"success":"Playlist successfully edited."});
    }catch(error){
        res.status(500).json({"error":error});
    }
})

router.delete('/:id',async (req,res)=>{
    try{
        let doc = await Playlist.findById(req.params.id);
        if(doc.createdBy !== req.username){
            res.status(400).json({"error":"You don't have correct access rights."});
            return;
        }

        let user = await User.findOne({username:req.username});
        let i = user.contribPlayList.indexOf(req.params.id);
        if(i<0){
            res.status(404).json({"error":"Not found."});
            return;
        }
        user.contribPlayList.splice(i,1);
        await User.findOneAndUpdate({username:req.username},user);

        await Playlist.findByIdAndDelete(req.params.id);
        res.status(200).json({"success":"Playlist successfully deleted."});
    }catch(error){
        res.status(500).json({"error":error});
    }
})

module.exports = router;
