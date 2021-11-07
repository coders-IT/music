const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://dkj10nov2002:Deepak123@cluster0.xmo2p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(uri).then(() => {
    console.log("Connected")
}).catch((err) => {
    console.log(err);
});


app.get("/",(req, resp)=>{
    resp.send("<h1> Hello User </h1>")
})

app.listen(5000, ()=>{
    console.log("Listening to port 5000")
})