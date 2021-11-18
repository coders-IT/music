import { useContext, useEffect } from "react";
import "./App.css";
import Alert from "./Component/Alert";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import FullScreenPlayer from "./Component/FullScreenPlayer";
import Homepage from "./Component/Homepage";
import MusicCard from "./Component/MusicCard";
import Player from "./Component/Player";
import PlayListCard from "./Component/PlayListCard";
import Signin from "./Component/Signin";
import Signup from "./Component/Signup";
import UploadMusic from "./Component/UploadMusic";
import BaseContext from "./Context/BaseContext";
import AddtoList from "./Component/AddtoList";

function App() {
    const src =
        "https://firebasestorage.googleapis.com/v0/b/sampleproject-321915.appspot.com/o/cover.jpg?alt=media&token=6c6d399b-ce7f-4a4d-89ce-8e395a7efd47";

    //if want to uncomment uncomment all the components inside a single comment block
    const context = useContext(BaseContext);

    useEffect(()=>{
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
        fetchUser();
    },[]);


    return (
        <BrowserRouter>
{/* 
            <audio
                src={context.curMusic.audio}
                id="audio"
                // onTimeUpdate={timeUpdate}
                muted={false}
            ></audio>
            <Alert />
            <Signin />
            <Signup />
            <UploadMusic/>

            <Switch>
                <Route exact path="/">
                    <Homepage/>
                </Route>
                <Route exact path="/audio">
                    <FullScreenPlayer />
                </Route>
            </Switch>
            <Player/> */}
            <AddtoList/>
            {/* <FullScreenPlayer/> */}
            {/* <MusicCard name="Jag Ghumya" src={src} likes="2M" like={true} playing={true} /> */}
            {/* <UploadMusic/> */}
            {/* <Signin/> */}
            {/* <PlayListCard src={src} follower={345} name="Deepak Kumar" creator="Deepak"/> */}
        </BrowserRouter>
    );
}

export default App;
