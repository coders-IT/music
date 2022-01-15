const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://dkj10nov2002:Deepak123@cluster0.xmo2p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const uri = "mongodb+srv://bhannasa:MU%23TzgFh%247pvj8q@cluster0.b1ntj.mongodb.net/test";
// const uri = "mongodb+srv://bhannasa:MU%23TzgFh%247pvj8q@cluster0.b1ntj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

app.use(express.static(path.join(__dirname, 'build')));

mongoose.connect(uri).then(() => {
    console.log("Connected")
}).catch((err) => {
    //console.log(err);
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/audio', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/playlist', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.use("/api/user",require('./routes/user'));
app.use("/api/song",require('./routes/song'));
app.use("/api/playlist",require('./routes/playlist'));



app.listen(port, ()=>{
    console.log("Listening to port 5000")
})