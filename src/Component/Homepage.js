import "./Styles/Homepage.css";
import React from "react";

export default function Homepage() {
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
                        src="https://firebasestorage.googleapis.com/v0/b/sampleproject-321915.appspot.com/o/cover.jpg?alt=mediaa"
                        alt=""
                    />
                </div>
            </div>

            <div class="body"></div>

            <div class="player"></div>
        </div>
    );
}
