const express = require("express");
const user = require("../models/user");
const router = express.Router();
const jwt = require("jsonwebtoken");
const fetchUser = require("./auth");
const bcrypt = require("bcrypt");
const audio = require("../models/Audio");
const playlist = require("../models/Playlist");

const secret = "94n88N&*&ad4f#45d4N*u;muf$os#fds$%asdf$i";

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

// creating user
router.post("/create", async (req, resp) => {
    try {
        if (!isValid(req.body.username)) {
            resp.send({ error: "Please take valid User name" });
            return;
        }

        var oldData = await user.findOne({ username: req.body.username });

        if (oldData != null) {
            resp.send({ error: "User exists try another Name" });
            return;
        }

        const passEnc = await bcrypt.hash(req.body.password, 10);
        const newUser = new user({
            name: req.body.name,
            username: req.body.username,
            password: passEnc,
            profileUrl: req.body.profileUrl,
        });

        console.log(passEnc);

        newUser.save();

        var jwtTokken = jwt.sign(
            {
                id: newUser.id,
            },
            secret
        );

        resp.send({ tokken: jwtTokken });
    } catch (err) {
        console.log(err);
        resp.status(500).send({
            error: "Some server error occured try after some time",
        });
    }
});

//login user
router.post("/login", async (req, resp) => {
    try {
        const oldData = await user.findOne({ username: req.body.username });
        const passResult = await bcrypt.compare(
            req.body.password,
            oldData.password
        );

        if (passResult == false || oldData == null) {
            resp.send({ error: "Invalid user Details" });
            return;
        }

        var jwtTokken = jwt.sign(
            {
                id: oldData.id,
            },
            secret
        );

        resp.send({ tokken: jwtTokken });
    } catch (err) {
        console.log(err);
        resp.status(500).send({
            error: "Some server error occured try after some time",
        });
    }
});

//getuser
router.post("/getuser", fetchUser, async (req, res) => {
    var userData = await user.findById(req.body.id);
    userData.password = null;
    res.send(userData);
});

//add Song
router.post("/audio/:id", fetchUser, async (req, resp) => {
    try {
        var curUser = await user.findById(req.body.id);
        var savedAudio = curUser.savedAudio;
        savedAudio.push(req.params.id);

        var data = await user.findByIdAndUpdate(req.body.id, {
            savedAudio: savedAudio,
        });

        var song = await audio.findById(req.params.id);
		console.log(song);
        data = await audio.findByIdAndUpdate(req.params.id, { plays: song.plays + 1 });

        resp.send({ status: "Sond Added" });
    } catch (error) {
        console.log(err);
        resp.status(500).send({
            error: "Some server error occured try after some time",
        });
    }
});


//removesong
router.delete("/audio/:id", fetchUser, async (req, resp) => {
    try {
        var curUser = await user.findById(req.body.id);
        var savedAudio = curUser.savedAudio;
		
		
        savedAudio = savedAudio.filter(elem => {
			return elem != req.params.id
		});

        var data = await user.findByIdAndUpdate(req.body.id, {
            savedAudio: savedAudio,
        });

        var song = await audio.findById(req.params.id);
		console.log(song);
        data = await audio.findByIdAndUpdate(req.params.id, { plays: song.plays - 1 });

        resp.send({ status: "Sond removed" });
    } catch (error) {
        console.log(err);
        resp.status(500).send({
            error: "Some server error occured try after some time",
        });
    }
});

//add playlist
router.post("/playlist/:id", fetchUser, async (req, resp) => {
    try {
        var curUser = await user.findById(req.body.id);
        var savedPlayList = curUser.savedPlayList;
        savedPlayList.push(req.params.id);

        var data = await user.findByIdAndUpdate(req.body.id, {
            savedPlayList: savedPlayList,
        });

        var list = await playlist.findById(req.params.id);
		console.log(list);
        data = await playlist.findByIdAndUpdate(req.params.id, { followers: list.followers + 1 });

        resp.send({ status: "playlist Added" });
    } catch (error) {
        console.log(err);
        resp.status(500).send({
            error: "Some server error occured try after some time",
        });
    }
});

//remove playlist
router.delete("/playlist/:id", fetchUser, async (req, resp) => {
    try {
        var curUser = await user.findById(req.body.id);
        var savedPlayList = curUser.savedPlayList;
        savedPlayList = savedPlayList.filter((elem)=>{return elem != req.params.id});

        var data = await user.findByIdAndUpdate(req.body.id, {
            savedPlayList: savedPlayList,
        });

        var list = await playlist.findById(req.params.id);
		console.log(list);
        data = await playlist.findByIdAndUpdate(req.params.id, { followers: list.followers - 1 });

        resp.send({ status: "playlist Removed" });
    } catch (error) {
        console.log(err);
        resp.status(500).send({
            error: "Some server error occured try after some time",
        });
    }
});


//to do playlist -> contribution during song upload done

module.exports = router;
