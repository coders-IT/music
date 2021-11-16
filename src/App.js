import { useContext, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Alert from "./Component/Alert";
import Homepage from "./Component/Homepage";
import MusicCard from "./Component/MusicCard";
import Player from "./Component/Player";
import PlayListCard from "./Component/PlayListCard";
import Signin from "./Component/Signin";
import Signup from "./Component/Signup";
import UploadMusic from "./Component/UploadMusic";
import BaseContext from "./Context/BaseContext";

function App() {
    const src =
        "https://firebasestorage.googleapis.com/v0/b/sampleproject-321915.appspot.com/o/cover.jpg?alt=media&token=6c6d399b-ce7f-4a4d-89ce-8e395a7efd47";
    const context = useContext(BaseContext);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("jwtTokken");
            if (token) {
                const data = {
                    token: token,
                };

                const resp = await context.callApi(
                    "/api/user/getUser",
                    "POST",
                    data
                );
                context.setuser(resp.data);
            }
        };

        const fetchSong = async ()=>{
            const url = "http://localhost:5000/api/song/songs";
            const data = await fetch(url);
            const resp = await data.json();
            console.log(resp.data[0], resp.data,"dfasdjfdskl");
            context.setrecentMusic(resp.data);
            context.setcurQueue(resp.data);
            context.setcurMusic(resp.data[0]?resp.data[0]:{});
        }
        fetchSong();
        fetchUser();
    }, []);

    //if want to uncomment uncomment all the components inside a single comment block

    return (
        <BrowserRouter>
            <Alert />
            <Signin />
            <Signup />
            <Homepage />
            {/* <MusicCard name="Jag Ghumya" src={src} likes="2M" like={true} playing={true} /> */}
            {/* <UploadMusic/> */}
            {/* <Signin/> */}
            {/* <PlayListCard src={src} follower={345} name="Deepak Kumar" creator="Deepak"/> */}
        </BrowserRouter>
    );
}

export default App;
