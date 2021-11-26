import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import BaseContext from "../Context/BaseContext";
import MusicCard from "./MusicCard";
import "./Styles/Playlist.css";

export default function Playlist() {
    const context = useContext(BaseContext);
    const [songElems, setsongElems] = useState([]);
    const [songArray, setsongArray] = useState([]);
    const [parsedArray, setparsedArray] = useState(null);
    const [isFollowed, setisFollowed] = useState(false)
    useEffect(() => {
        const fetchList = async () => {
            var listId = window.location.href.split("=");
            listId = listId[listId.length - 1];
            //console.log(listId);

            var listDetail = await fetch(
                "http://localhost:5000/api/playlist/" + listId
            );
            listDetail = await listDetail.json();
            var songs = await fetch(
                "http://localhost:5000/api/playlist/song/" + listId
            );
            songs = await songs.json();
            context.setcurPlaylist(listDetail.data);
            //console.log(listDetail.data, "curPlaylist");
            setsongArray(songs.data.songs);
            var arr = [];
            for (var i of songs.data.songs) {
                var elem = JSON.parse(i);
                arr.push(
                    <MusicCard
                        name={elem.name}
                        id={elem}
                        src={elem.clip}
                        likes={elem.plays}
                        liked={elem.liked}
                        playing={false}
                        singer={elem.singer}
                    />
                );
            }
            setsongElems(arr);
        };
        fetchList();
    }, []);

    useEffect(()=>{
        followed();
    }, [context.user]);

    const histroy = useHistory();
    const gotohome = () => {
        histroy.push("/");
    };
    const addToQueue = async () => {
        if(parsedArray === context.curQueue) return;
        var arr = [];
        var n = songArray.length;
        for (var i = 0; i < n; i++) {
            var cur = JSON.parse(songArray[i]);
            cur["index"] = i;
            arr.push(cur);
        }
        setparsedArray(arr);
        context.setcurQueue(arr);
        context.setcurMusic(arr[0]);
        await document.getElementById("audio").load();
        document.getElementById("audio").play();
        const playPause = document.getElementById("playPause");
        playPause.classList.remove("fa-play");
        playPause.classList.add("fa-pause");
        const playPause2 = document.getElementById("playPause2");
        playPause2.classList.remove("fa-play");
        playPause2.classList.add("fa-pause");
    };

    const followed = async () => {
        if(context.user === null){
            return false;
        }
        var listId = window.location.href.split("=");
        listId = listId[listId.length - 1];

        var arr = context.user.contribPlayList;
        var n = arr.length;
        for (var i = 0; i < n; i++) {
            if (arr[i].id === listId) {
                //console.log("id found at cont ", i);
                setisFollowed(true)
                return true;
            }
        }

        arr = context.user.savedPlayList;
        n = arr.length;
        for (i = 0; i < n; i++) {
            if (arr[i].id === listId){
                //console.log("id found at saved ", i);
                setisFollowed(true)
                return true;
            } 
        }
        setisFollowed(false)
        return false;
    };

    const unfollow = async ()=>{
        if(context.user == null){
            context.setAlert(true);
            context.setalertBody("Please Login first");
            return;
        }
        var listId = window.location.href.split("=");
        listId = listId[listId.length - 1];

        var arr = context.user.contribPlayList;
        var n = arr.length;
        for (var i = 0; i < n; i++) {
            if (arr[i].id === listId) {
                context.setAlert(true);
                context.setalertBody("Cann't Unfollow Playlist created By you");
                return;
            }
        }

        var data = {
            "token":localStorage.getItem("jwtTokken")
        }
        await context.callApi("/api/user/unsaveplaylist/"+listId, "POST", data);
        //console.log(data);
        context.setAlert(true);
        context.setalertBody("PlayList removed");
    }

    const follow = async ()=>{
        if(context.user == null){
            context.setAlert(true);
            context.setalertBody("Please Login first");
            return;
        }
        var listId = window.location.href.split("=");
        listId = listId[listId.length - 1];

        var data = {
            "token":localStorage.getItem("jwtTokken")
        }
        await context.callApi("/api/user/saveplaylist/"+listId, "POST", data);
        //console.log(data);
        context.setAlert(true);
        context.setalertBody("PlayList Followed");
        //console.log(data);
    }


    return (
        <div className="listcont">
            <div className="listconttop">
                <i className="fas fa-home" onClick={gotohome}></i>
            </div>

            <div className="listDetails">
                <div className="playList">
                    <div className="aboutlist">
                        <img src={context.curPlaylist.clip} height="175px" alt=""/>
                        <div className="listdata">
                            <div className="listname">{context.curPlaylist.name}</div>
                            <div className="listcreator">{context.curPlaylist.createdBy}</div>
                            {(isFollowed === true) ? (
                                <div className="listFollowing" onClick={unfollow}>Following</div>
                            ) : (
                                <div className="listFollow" onClick={follow}>Follow</div>
                            )}
                        </div>
                    </div>
                    <i className="fas fa-play addtoqueue" onClick={addToQueue}></i>
                </div>
                {songElems}
            </div>
        </div>
    );
}
