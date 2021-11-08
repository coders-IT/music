const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());
app.use(express.json());

//salt and jwt secret = "94n88N&*&ad4f#45d4N*u;muf$os#fds$%asdf$i"

const uri = "mongodb+srv://dkj10nov2002:Deepak123@cluster0.xmo2p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(uri).then(() => {
    console.log("Connected")
}).catch((err) => {
    console.log(err);
});


app.get("/",(req, resp)=>{
    resp.send("<h1> Hello User </h1>")
})

app.use("/api/user", require("./routes/user"));
app.use("/api/audio", require("./routes/audio"));

app.listen(5000, ()=>{
    console.log("Listening to port 5000")
})