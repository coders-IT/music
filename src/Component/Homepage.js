import "./Styles/Homepage.css";
import React, { useContext, useEffect } from "react";
import Player from "./Player";
import BaseContext from "../Context/BaseContext";
import { useHistory } from "react-router";
import {BrowserRouter, Switch, Route, Link } from "react-router-dom";
import HomeBody from "./HomeBody";

export default function Homepage(props) {
    const context = useContext(BaseContext);
    var history = useHistory();

    console.log("dfasfdsF",history);
    const loginHandle = () => {
        if (context.user) {
            localStorage.removeItem("jwtTokken");
            window.location.href = "http://localhost:3000/";
        } else {
            context.setloginShow(true);
        }
    };
    const gotoadd=()=>{
        context.setuploadMusicShow(true);
    }
    const gotohome = ()=>{
        history.push("/");
    }


    const searchSong = async (e)=>{
        e.preventDefault();
        var keyword = document.getElementById("homesearch").value.trim();
        if(keyword.length < 3) {
            context.setalertBody("Search Keyword must be atleast 3 char");
            context.setAlert(true);
            return;
        }
        
        var data = {
            "search" : keyword
        }

        data = await context.callApi("/api/user/search", "POST", data);
        console.log(data);
        context.setsearchResult(data);
        context.setsearchResultshow(true);
        
    }



    useEffect(() => {


        const fetchSong = async () => {
            const url = "http://localhost:5000/api/song/songs";
            const data = await fetch(url);
            const resp = await data.json();
            console.log(resp.data[0], resp.data, "dfasdjfdskl");

            context.setrecentMusic(resp.data);
            context.setcurQueue(resp.data);
            if(resp.data[0]) resp.data[0]["index"] = 0;
            context.setcurMusic(resp.data[0] ? resp.data[0] : {});
        };
        // fetchUser();
        if(context.curQueue.length === 0)fetchSong();
    }, []);


    const defaultPic =
        "https://firebasestorage.googleapis.com/v0/b/sampleproject-321915.appspot.com/o/defaultUser.jpg?alt=media&token=b805932f-d9bd-432f-95c8-b1ff00de708a";
    return (
        <div>
            <div class="header">
                <div class="homenavleft">
                    <div class="title">Music - Connect to Your Soul</div>
                    <div class="nav">
                        <span class="item" onClick={gotohome}>Home</span>
                        <span class="add" onClick={gotoadd}>Add</span>
                    </div>
                </div>
                <form class="homenavright" onSubmit={searchSong}>
                    <input
                        type="text"
                        id="homesearch"
                        placeholder="Search Song/Playlist"
                    />
                    <img
                        src={`${
                            context.user ? context.user.profilePic : defaultPic
                        }`}
                        alt=""
                        onClick={loginHandle}
                        style={{ cursor: "pointer" }}
                    />
                </form>
            </div>

            <div class="body">
                <HomeBody/>
            </div>

            {/* <div class="player">
                <Player liked={false} />
            </div> */}
        </div>
    );
}
