const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const User = require('../models/User');

const key = "hask98#eu1uie872j@kd";

const isValid = (name) => {
    var n = name.length;
    for (var i = 0; i < n; i++) {
        if (
            (name[i] >= "a" && name[i] <= "z") ||
            name[i] == "_" ||
            (name[i] >= "0" && name[i] <= "9") ||
            (name[i] >= "A" && name[i] <= "Z")
        );
        else return false;
    }
    return true;
};

router.put('/signup',async (req,res)=>{
    try{
        let username = req.body.username;
        let password = req.body.password;
        let name = req.body.name;
        let profilePic = req.body.profilePic;

        let doc = await User.findOne({username:username});
    
        if(doc) res.status(400).json({"error":"Username unavailable. Try another one."});
        if(!isValid(username) || username.length<5)  res.status(400).json({"error":"Username can only container alphanumeric characters and '_'. It should be atleast 5 characters long."})
        if(password.length<5)   res.status(400).json({"error":"Password too short. Use minimum length of 5 characters"});
    
        const salt = bcrypt.genSaltSync(10);
        const encPass = bcrypt.hashSync(password,salt); 
        let user = new User({
            username:username,
            name:name,
            profilePic:profilePic,
            password:encPass
        })
        await user.save();
        const userId = {
            id : username
        }
        const token = jwt.sign(userId, key);
        res.status(200).json({"success":"Successfully created account.",data:token});
    }catch(error){
        console.log(error)
        res.status(500).json({error});
    }
});

router.post('/login',async (req,res)=>{
    try{
        let username = req.body.username;
        let password = req.body.password;
        let doc = await User.findOne({username:username});
        if(!doc)    res.status(400).json({"error":"Username not registered."});
        if(!bcrypt.compareSync(password,doc.password))  res.status(400).json({"error":"Incorrect password."});
        const userId = {
            id : username
        }
        const token = jwt.sign(userId, key);
        res.status(200).json({"success":"Successfully logged in.",data:token});
    }catch(error){
        res.status(500).json({"error":error});
    }
})

router.get('/:username',async (req,res)=>{
    try{
        let doc = await User.findOne({username:req.params.username});
        let user = {
            name : doc.name,
            username : doc.username,
            profilePic : doc.profilePic,
            dateJoined : doc.dateJoined,
            contribAudio : doc.contribAudio,
            contribPlayList : doc.contribPlayList
        }
        res.status(200).json({"success":"Successfully fetched user",data:user});
    }catch(error){
        res.status(500).json({"error":error});
    }
})

router.use(auth);

router.post('/savesong/:id',async (req,res)=>{
    try{
        let doc = await User.findOne({username:req.username});
        doc.savedAudio.push(req.params.id);
        await User.findOneAndUpdate({username:req.username},doc);
        res.status(200).json({"success":"Successfully added to saved songs."});
    }catch(error){
        res.status(500).json({"error":error});
    }
})

router.post('/saveplaylist/:id',async (req,res)=>{
    try{
        let doc = await User.findOne({username:req.username});
        console.log(doc,req.username)
        doc.savedPlayList.push(req.params.id);
        await User.findOneAndUpdate({username:req.username},doc)
        res.status(200).json({"success":"Successfully added to saved playlists."});
    }catch(error){
        console.log(error)
        res.status(500).json({"error":error});
    }
})

router.post('/unsavesong/:id',async (req,res)=>{
    try{
        let doc = await User.findOne({username:req.username});
        let arr = doc.savedAudio;
        let i = arr.indexOf(req.params.id);
        if(i<0){
            res.status(404).json({"error":"Not found."});
            return;
        }
        arr.splice(i,1);
        doc.savedAudio = arr;
        await User.findOneAndUpdate({username:req.username},doc)
        res.status(200).json({"success":"Successfully removed from saved songs."});
    }catch(error){
        res.status(500).json({"error":error});
    }
})

router.post('/unsaveplaylist/:id',async (req,res)=>{
    try{
        let doc = await User.findOne({username:req.username});
        let arr = doc.savedPlayList;
        let i = arr.indexOf(req.params.id);
        if(i<0){
            res.status(404).json({"error":"Not found."});
            return;
        }
        arr.splice(i,1);
        doc.savedPlayList = arr;
        await User.findOneAndUpdate({username:req.username},doc)
        res.status(200).json({"success":"Successfully removed from saved playlists."});
    }catch(error){
        res.status(500).json({"error":error});
    }
})

module.exports = router;