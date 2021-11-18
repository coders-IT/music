const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Playlist = require('../models/Playlist');
const PlayListAudio = require('../models/PlayListAudio');


router.post("/", auth, async (req, resp)=>{
    try {
        let user = await User.findOne({username:req.username});
    const data = {
        name : req.body.name,
        createdBy : user.name,
        clip : req.body.clip 
    };
    const playlist = new Playlist(data);
    playlist.save();

    user.contribPlayList = user.contribPlayList.concat([data]);
    await User.findByIdAndUpdate(user._id, user);

    const playlistaudio = new PlayListAudio({
        playlist:playlist.id,
        songs:[]
    })

    playlistaudio.save();

    resp.send({"success" : "Playlist Created"});
    } catch (error) {
        resp.status(500).send({"error":error});
    }
})

router.put("/:id",async (req, resp)=>{
    try {
        
        var list = await PlayListAudio.findOne({"playlist" : req.params.id});
        list.songs = list.songs.concat(req.body.song);
        console.log(list);
        await PlayListAudio.findByIdAndUpdate(list._id, list);
        resp.send({"success" : "Song Added"});

    } catch (error) {
        console.log(error);
        resp.status(500).send({"error":"Server Error occured"});
        
    }
})

router.get("/song/:id", async(req,resp)=>{
    try {
        
        var list = await PlayListAudio.findOne({"playlist" : req.params.id});
        
        resp.send({"data":list});

    } catch (error) {
        console.log(error);
        resp.status(500).send({"error":"Server Error occured"});
        
    }
})

router.get("/:id", async(req,resp)=>{
    try {
        
        var list = await Playlist.findOne({"playlist" : req.params.id});
        
        resp.send({"data":list});

    } catch (error) {
        console.log(error);
        resp.status(500).send({"error":"Server Error occured"});
        
    }
})



module.exports = router;
