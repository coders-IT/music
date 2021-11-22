import "./Styles/FullScreenPlayer.css";
import React, { useContext, useEffect } from "react";
import Player from "./Player";
import BaseContext from "../Context/BaseContext";
import { useHistory } from "react-router";
import Addto from "./Addto";

export default function FullScreenPlayer() {
    const context = useContext(BaseContext);
    const getTime = (x) => {
        var min = parseInt(x / 60);
        if (!min) min = 0;
        var sec = parseInt(x % 60);
        if (!sec) sec = 0;
        return `${min > 9 ? "" : "0"}${min}:${sec > 9 ? "" : "0"}${sec}`;
    };

    const histroy = useHistory();

    const lastSong = async () => {
        if (context.curMusic.index == 0) return;
        else {
            if (!context.curMusic.index) {
                return;
            }
            context.setcurMusic(context.curQueue[context.curMusic.index - 1]);
            if (context.changeURL)
                histroy.push(
                    `/audio?id=${
                        context.curQueue[context.curMusic.index - 1]._id
                    }`
                );
            audio.currentTime = 0;
            await audio.load();
            audio.play();
            const playPause = document.getElementById("playPause");
            playPause.classList.remove("fa-play");
            playPause.classList.add("fa-pause");
            const playPause2 = document.getElementById("playPause2");
            playPause2.classList.remove("fa-play");
            playPause2.classList.add("fa-pause");
        }
    };

    const nextSong = async () => {
        if (context.curMusic.index == context.curQueue.length - 1) return;
        else {
            if (context.curMusic.index != 0 && !context.curMusic.index) {
                return;
            }
            console.log(context.curQueue, context.curMusic.index + 1);
            context.setcurMusic(context.curQueue[context.curMusic.index + 1]);
            if (context.changeURL)
                histroy.push(
                    `/audio?id=${
                        context.curQueue[context.curMusic.index + 1]._id
                    }`
                );

            audio.currentTime = 0;
            await audio.load();
            audio.play();
            const playPause = document.getElementById("playPause");
            playPause.classList.remove("fa-play");
            playPause.classList.add("fa-pause");
            const playPause2 = document.getElementById("playPause2");
            playPause2.classList.remove("fa-play");
            playPause2.classList.add("fa-pause");
        }
    };


    var audio, fullfull, sliderFull, fullpassed, fullScreenTimePassed, fullScreenDot;
    setTimeout(()=>{
        audio = document.querySelector("audio");
        fullfull = document.getElementById("fullfull");
        fullpassed = document.getElementById("fullpassed");
        fullScreenDot = document.getElementById("fullScreenDot");
        fullScreenTimePassed = document.getElementById("fullScreenTimePassed");
        sliderFull = document.getElementById("sliderFull");

        audio.addEventListener("timeupdate",()=>{
            fullfull.innerHTML = getTime(audio.duration);
            fullpassed.innerHTML = getTime(audio.currentTime);
            var width = (audio.currentTime/audio.duration) * window.innerWidth * 0.8;

            fullScreenDot.style.left = width+"px";
            fullScreenTimePassed.style.width = width+"px";
        });

        sliderFull.addEventListener("click",(e)=>{
            var pos = e.clientX - sliderFull.offsetLeft;
            var cur = (pos/(window.innerWidth * 0.8))*audio.duration;
            audio.currentTime = cur;
            fullScreenDot.style.left = pos+"px";
            fullScreenTimePassed.style.width = pos+"px";

        })

    },100)
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
    // const history = useHistory();
    const minimizeFull = ()=>{
        context.setchangeURL(false);
        histroy.push("/");
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
                <i class="fas fa-home fullplayerhome" onClick={minimizeFull}></i>

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
                    className="fullScreenCover"
                />
            </div>

            <div class="fullScreenTimeControl">
                <div class="fullScreenTimeSlider">
                    <div class="sliderFull" id="sliderFull">
                        <div class="fullScreenDot" id="fullScreenDot"></div>
                        <div class="fullScreenTimePassed" id="fullScreenTimePassed"></div>
                    </div>
                </div>
                <div class="fullScreenControl">
                    <div class="frontBack">
                        <i class="fas fa-step-backward" onClick={lastSong}></i>
                        <i class="fas fa-step-forward" onClick={nextSong}></i>
                    </div>
                    <div>
                        <span id="fullpassed">00:00</span>/<span id="fullfull">00:00</span>

                    </div>
                </div>
            </div>
        </div>
    );
}
