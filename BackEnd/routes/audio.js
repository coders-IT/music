const express = require("express");
const audio = require("../models/Audio");
const user = require("../models/user");
const fetchUser = require("./auth");
const router = express.Router();

router.post("/add", fetchUser ,async (req, resp) => {
    try {
        var data = await user.findById(req.body.id);

        const newAudio = new audio({
            name: req.body.name,
            url: req.body.url,
            clip: req.body.clip,
            uploadedBy: req.body.uploadedBy
        });

        newAudio.save();

        console.log(data);

        var contributed = data.contribAudio;

        contributed.push(newAudio.id);

        data = await user.findByIdAndUpdate(req.body.id, {
            contribAudio: contributed,
        });

        resp.status(200).send({ id: newAudio.id });
    } catch (error) {
        console.log(error);
        resp.status(500).send({
            error: "Some server error occured try after some time",
        });
    }
});


module.exports = router;
