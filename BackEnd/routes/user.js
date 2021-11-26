const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../models/User");
const Playlist = require("../models/Playlist");
const Audio = require("../models/Audio");

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

router.post("/signup", async (req, res) => {
    try {
        let username = req.body.username;
        let password = req.body.password;
        let name = req.body.name;
        let profilePic = req.body.profilePic;

        let doc = await User.findOne({ username: username });

        if (doc) {
            res.status(400).json({
                error: "Username unavailable. Try another one.",
            });
            return;
        }
        if (!isValid(username) || username.length < 5) {
            res.status(400).json({
                error: "Username can only container alphanumeric characters and '_'. It should be atleast 5 characters long.",
            });
            return;
        }
        if (password.length < 5) {
            res.status(400).json({
                error: "Password too short. Use minimum length of 5 characters",
            });
            return;
        }

        const salt = bcrypt.genSaltSync(10);
        const encPass = bcrypt.hashSync(password, salt);
        let user = new User({
            username: username,
            name: name,
            profilePic: profilePic,
            password: encPass,
            recent:[]
        });
        await user.save();
        const userId = {
            id: username,
        };
        const token = jwt.sign(userId, key);
        res.status(200).json({
            success: "Successfully created account.",
            data: token,
        });
    } catch (error) {
        //console.log(error);
        res.status(500).json({ error });
    }
});

router.post("/login", async (req, res) => {
    try {
        let username = req.body.username;
        let password = req.body.password;
        let doc = await User.findOne({ username: username });
        if (!doc) {
            res.status(400).json({ error: "Username not registered." });
            return;
        }
        if (!bcrypt.compareSync(password, doc.password)) {
            res.status(400).json({ error: "Incorrect password." });
            return;
        }
        const userId = {
            id: username,
        };
        const token = jwt.sign(userId, key);
        res.status(200).json({
            success: "Successfully logged in.",
            data: token,
        });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.post("/search", async (req, resp) => {
    try {
        var search = req.body.search;
        search = new RegExp(`[\w|\s|]*(${search})+[\w|\s]*`, "i");
        var tag = req.body.search;
        tag = tag.charAt(0).toUpperCase() + tag.slice(1);
        // //console.log(search);
        const Musicdata = await Audio.find({
            $or: [{ name: search }, { tags: { $in: search } }, {singer : search}],
        });
        const playlistdata = await Playlist.find({
            $or: [{ name: search }, { createdBy: search }],
        });

        resp.send({ music: Musicdata, playlist: playlistdata });
    } catch (error) {
        resp.status(500).send({ error });
    }
});

router.use(auth);

router.post("/getUser", async (req, res) => {
    try {
        let doc = await User.findOne({ username: req.username });
        doc.password = null;
        res.status(200).json({
            success: "Successfully fetched user",
            data: doc,
        });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.post("/update", async (req, res) => {
    try {
        let doc = await User.findOne({ username: req.username });
        // //console.log(req.body.recent);
        doc.recent = req.body.recent;
        await User.findOneAndUpdate({ username: req.username }, doc);

        res.status(200).json({ success: "Successfully Updated recent songs." });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.post("/savesong/:id", async (req, res) => {
    try {
        let doc = await User.findOne({ username: req.username });
        doc.savedAudio.push(req.params.id);
        await User.findOneAndUpdate({ username: req.username }, doc);

        var song = await Audio.findById(req.params.id);
        // //console.log(song);
        data = await Audio.findByIdAndUpdate(req.params.id, {
            plays: song.plays + 1,
        });

        res.status(200).json({ success: "Successfully added to saved songs." });
    } catch (error) {
        //console.log(error);
        res.status(500).json({ error: error });
    }
});

router.post("/saveplaylist/:id", async (req, res) => {
    try {
        let doc = await User.findOne({ username: req.username });
        // //console.log(doc, req.username);
        var playlist = await Playlist.findById(req.params.id);

        var data = {
            name : playlist.name,
            createdBy : doc.name,
            clip : playlist.clip ,
            id : req.params.id
        };

        doc.savedPlayList.push(data);
        await User.findOneAndUpdate({ username: req.username }, doc);
        res.status(200).json({
            success: "Successfully added to saved playlists.",
        });
    } catch (error) {
        //console.log(error);
        res.status(500).json({ error: error });
    }
});

router.post("/unsavesong/:id", async (req, res) => {
    try {
        let doc = await User.findOne({ username: req.username });
        let arr = doc.savedAudio;
        let i = arr.indexOf(req.params.id);
        if (i < 0) {
            res.status(404).json({ error: "Not found." });
            return;
        }
        arr.splice(i, 1);
        doc.savedAudio = arr;
        await User.findOneAndUpdate({ username: req.username }, doc);
        var song = await Audio.findById(req.params.id);
        // //console.log(song);
        data = await Audio.findByIdAndUpdate(req.params.id, {
            plays: song.plays - 1,
        });

        res.status(200).json({
            success: "Successfully removed from saved songs.",
        });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.post("/unsaveplaylist/:id", async (req, res) => {
    try {
        let doc = await User.findOne({ username: req.username });
        let arr = doc.savedPlayList;
        
        arr = arr.filter((elem)=> elem.id != req.params.id);
        
        doc.savedPlayList = arr;
        await User.findOneAndUpdate({ username: req.username }, doc);
        res.status(200).json({
            success: "Successfully removed from saved playlists.",
        });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

module.exports = router;
