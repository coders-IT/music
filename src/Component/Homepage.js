import "./Styles/Homepage.css";
import React, { useContext } from "react";
import Player from "./Player";
import BaseContext from "../Context/BaseContext";
import Creator from "./Creator";
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
        history.push("create")
    }
    const gotohome = ()=>{
        history.push("/");
    }

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
                <div class="homenavright">
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
                </div>
            </div>

            <div class="body">
                {props.show == "body"?<HomeBody/>:<Creator/>}
            </div>

            <div class="player">
                <Player liked={false} />
            </div>
        </div>
    );
}
