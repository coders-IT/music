const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const key = "hask98#eu1uie872j@kd";

router.use((req,res,next)=>{
    try{
        // //console.log(req.body.token, req.body);
        let decoded = jwt.verify(req.body.token,key);
        req.username = decoded.id;
        next();
    }catch(error){
        res.status(500).json({"error":error});
    }
})
module.exports = router;