const express = require("express");
const playlist = require("../models/Playlist");
const user = require("../models/user");
const fetchUser = require("./auth");
const router = express.Router();

router.post("/create", fetchUser, async (req, resp) => {
    try {
        var data = await user.findById(req.body.id);

        const newPlaylist = new playlist({
            name: req.body.name,
            createdBy: data.name,
        });

        newPlaylist.save();

        console.log(data);

        var contributed = data.contribPlayList;

        contributed.push(newPlaylist.id);

        data = await user.findByIdAndUpdate(req.body.id, {
            contribPlayList: contributed,
        });

        resp.status(200).send({ id: newPlaylist.id });
    } catch (error) {
        console.log(error);
        resp.status(500).send({
            error: "Some server error occured try after some time",
        });
    }
});

router.put("/:id", async (req, resp) => {
    try {
        const songID = req.query.song;

        var list = await playlist.findById(req.params.id);
        var songs = list.songs;
        songs.push(songID);

        list = await playlist.findByIdAndUpdate(req.params.id, {
            songs: songs,
        });
        resp.send({ status: "updated" });
    } catch (error) {
        console.log(error);
        resp.status(500).send({
            error: "Some server error occured try after some time",
        });
    }
});

router.delete("/:id", async (req, resp) => {
    try {
        const songID = req.query.song;

        var list = await playlist.findById(req.params.id);
        var songs = list.songs;
        songs = songs.filter((elem) => {
            return elem != songID;
        });

        list = await playlist.findByIdAndUpdate(req.params.id, {
            songs: songs,
        });
        resp.send({ status: "updated" });
    } catch (error) {
        console.log(error);
        resp.status(500).send({
            error: "Some server error occured try after some time",
        });
    }
});

router.get("/:id", async (req, resp) => {
    try {
        const list = await playlist.findById(req.params.id);
        resp.send({ list });
    } catch (error) {
        console.log(error);
        resp.status(500).send({
            error: "Some server error occured try after some time",
        });
    }
});

module.exports = router;
