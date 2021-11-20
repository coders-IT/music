import "./Styles/FullScreenPlayer.css";
import React, { useContext, useEffect } from "react";
import Player from "./Player";
import BaseContext from "../Context/BaseContext";
import { useHistory } from "react-router";
import Addto from "./Addto";

export default function FullScreenPlayer() {
    const context = useContext(BaseContext);

    useEffect(() => {
        const checkSong = async () => {
            var arr = window.location.href.split("=");
            var parsed = arr[arr.length - 1];
            if (context.curMusic._id !== parsed) {
                const data = await fetch(`http://localhost:5000/api/song/${parsed}`);
                const resp = await data.json();
                console.log("dhfadsjkfhadsjkfhadsjkfhkdsjfhdkjh",resp);
                if(resp.data)context.setcurMusic(resp.data);
                else context.setcurMusic({});
            }
            // document.getElementById("audio").play();
            // document.getElementById("audio").currentTime = context.curSongTime;
            
        }
        checkSong();
    }, []);
    const history = useHistory();
    const minimizeFull = ()=>{
        context.setchangeURL(false);
        history.push("/");
    }

    const showaddto = ()=>{
        if(context.user === null) {
            context.setloginShow(true);
            return;
        }
        context.setshowAddto(true);
    }

    const defaultPic =
        "https://firebasestorage.googleapis.com/v0/b/sampleproject-321915.appspot.com/o/defaultUser.jpg?alt=media&token=b805932f-d9bd-432f-95c8-b1ff00de708a";
    return (
        <div>
            <Addto/>
            <div class="fullPlayerHeader">
                <i class="fas fa-chevron-left" onClick={minimizeFull}></i>
                <div class="fullHeadRight">
                    <i class="fas fa-plus-circle" onClick={showaddto}></i>
                    <img
                        src={`${
                            context.user ? context.user.profilePic : defaultPic
                        }`}
                        alt=""
                        class="fullPlayerImg"
                    />
                </div>
            </div>
            <div class="middle">
                <img
                    src={context.curMusic.clip}
                    alt=""
                    width="300px"
                    height="300px"
                />
            </div>

            {/* <Player /> */}
        </div>
    );
}
