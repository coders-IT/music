import { useContext, useEffect } from "react";
import "./App.css";
import Alert from "./Component/Alert";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import FullScreenPlayer from "./Component/FullScreenPlayer";
import Homepage from "./Component/Homepage";
import Player from "./Component/Player";
import Signin from "./Component/Signin";
import Signup from "./Component/Signup";
import UploadMusic from "./Component/UploadMusic";
import BaseContext from "./Context/BaseContext";
import CreateNewPlaylist from "./Component/CreateNewPlaylist";
import Playlist from "./Component/Playlist";
import SearchResult from "./Component/SearchResult";

function App() {

    //if want to uncomment uncomment all the components inside a single comment block
    const context = useContext(BaseContext);

    useEffect(()=>{
        context.fetchUser();
    },[]);


    return (
        <BrowserRouter>

            <audio
                src={context.curMusic.audio}
                id="audio"
                // onTimeUpdate={timeUpdate}
                muted={false}
            ></audio>
            {/* <Addto/> */}
            <SearchResult/>
            <Alert />
            <Signin />
            <Signup />
            <UploadMusic/>
            <CreateNewPlaylist/>

            <Switch>
                <Route exact path="/">
                    <Homepage/>
                </Route>
                <Route exact path="/audio">
                    <FullScreenPlayer />
                </Route>
                <Route exact path="/playlist">
                    <Playlist/>
                </Route>
            </Switch>
            <Player/>
            {/* <AddtoList/> */}
            {/* <FullScreenPlayer/> */}
            {/* <MusicCard name="Jag Ghumya" src={src} likes="2M" like={true} playing={true} /> */}
            {/* <UploadMusic/> */}
            {/* <Signin/> */}
            {/* <PlayListCard src={src} follower={345} name="Deepak Kumar" creator="Deepak"/> */}
        </BrowserRouter>
    );
}

export default App;
