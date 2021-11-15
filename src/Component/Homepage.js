import "./Styles/Homepage.css";
import React, { useContext } from "react";
import Player from "./Player";
import BaseContext from "../Context/BaseContext";

export default function Homepage() {
    const context = useContext(BaseContext);
    const loginHandle = ()=>{
        if(context.user){
            localStorage.removeItem("jwtTokken");
            window.location.href="http://localhost:3000/";
        }else{
            context.setloginShow(true)
        }
    }
    const defaultPic = "https://firebasestorage.googleapis.com/v0/b/sampleproject-321915.appspot.com/o/defaultUser.jpg?alt=media&token=b805932f-d9bd-432f-95c8-b1ff00de708a";
    return (
        <div>
            <div class="header">
                <div class="homenavleft">
                    <div class="title">Music - Connect to Your Soul</div>
                    <div class="nav">
                        <span class="item">PlayList</span>
                        <span class="add">Add</span>
                    </div>
                </div>
                <div class="homenavright">
                    <input
                        type="text"
                        id="homesearch"
                        placeholder="Search Song/Playlist"
                    />
                    <img
                        src={`${context.user?context.user.profilePic:defaultPic}`}
                        alt=""
                        onClick={loginHandle}
                        style={{cursor:"pointer"}}
                    />
                </div>
            </div>

            <div class="body">

            </div>

            <div class="player">
                <Player liked={false}/>
            </div>
        </div>
    );
}
