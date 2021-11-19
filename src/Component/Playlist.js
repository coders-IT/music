import React, { useContext, useEffect, useState } from 'react'
import BaseContext from '../Context/BaseContext'
import MusicCard from './MusicCard';
import "./Styles/Playlist.css"

export default function Playlist() {
    const context = useContext(BaseContext);
    const [songElems, setsongElems] = useState([]);
    const [songArray, setsongArray] = useState([])
    useEffect(()=>{
        const fetchList = async ()=>{
            var listId = window.location.href.split("=");
            listId = listId[listId.length - 1];
            console.log(listId);

            var listDetail = await fetch("http://localhost:5000/api/playlist/"+listId);
            listDetail = await listDetail.json();
            var songs = await fetch("http://localhost:5000/api/playlist/song/"+listId);
            songs = await songs.json();
            context.setcurPlaylist(listDetail.data);
            console.log(listDetail.data, "curPlaylist")
            setsongArray(songs.data.songs);
            var arr=[]
            for(var i of songs.data.songs){
                var elem = JSON.parse(i);
                arr.push(<MusicCard
                    name={elem.name}
                    id={elem}
                    src={elem.clip}
                    likes={elem.plays}
                    liked={elem.liked}
                    playing={false}
                    singer={elem.singer}
                />)
            }
            setsongElems(arr);
            
        }
        fetchList();
    },[])


    const addToQueue = async ()=>{
        var arr=[];
        var n = songArray.length;
        for(var i = 0; i < n; i++){
            var cur = JSON.parse(songArray[i]);
            cur["index"] = i;
            arr.push(cur);
        }
        context.setcurQueue(arr);
        context.setcurMusic(arr[0]);
        await document.getElementById("audio").load();
        document.getElementById("audio").play();
    }

    return (
        <div class="listcont">

            <div class="listHeader">
                <div class="listheaderimg">
                    <img src={context.curPlaylist.clip} alt="" class="playlistHeaderImg"/> 
                    <i class="fas fa-play playlistbtn" onClick={addToQueue}></i>
                </div>
                <div class="listDetails">
                    <div class="listname">{context.curPlaylist.name}</div>
                    <div class="listcreator">{context.curPlaylist.createdBy}</div>
                </div>
            </div>
            <div class="curlistSongs">
                {songElems}
            </div>
            
        </div>
    )
}
