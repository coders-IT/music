import { useContext } from "react";
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
    const src = "https://firebasestorage.googleapis.com/v0/b/sampleproject-321915.appspot.com/o/cover.jpg?alt=media&token=6c6d399b-ce7f-4a4d-89ce-8e395a7efd47";
    const context = useContext(BaseContext);
    return (
        <>
            {/* <MusicCard name="Jag Ghumya" src={src} likes="2M" like={true} playing={true} />
            <UploadMusic/> */}
            <Homepage/>
            {/* <PlayListCard src={src} follower={345} name="Deepak Kumar" creator="Deepak"/> */}
            

        </>
    );
}

export default App;
