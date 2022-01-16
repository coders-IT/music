import "./Styles/Homepage.css";
import React, { useContext, useEffect } from "react";
import BaseContext from "../Context/BaseContext";
// import { useHistory } from "react-router";
import HomeBody from "./HomeBody";

export default function Homepage(props) {
    const context = useContext(BaseContext);
    // var history = useHistory();

    //console.log("dfasfdsF",history);
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
        //console.log(data);
        context.setsearchResult(data);
        context.setsearchResultshow(true);
        
    }


    function shuffleArray(array) {
        let curId = array.length;
        // There remain elements to shuffle
        while (0 !== curId) {
          // Pick a remaining element
          let randId = Math.floor(Math.random() * curId);
          curId -= 1;
          // Swap it with the current element.
          let tmp = array[curId];
          array[curId] = array[randId];
          array[randId] = tmp;
        }
        return array;
    }


    useEffect(() => {


        const fetchSong = async () => {
            const url = "/api/song/songs";
            const data = await fetch(url);
            var resp = await data.json();
            //console.log(resp.data[0], resp.data, "dfasdjfdskl");

            resp.data = shuffleArray(resp.data);


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
            <div className="header">
                <div className="homenavleft">
                    <div className="title">Music - Connect to Your Soul</div>
                    <div className="nav">
                    </div>
                </div>
                <form className="homenavright flex" onSubmit={searchSong}>
                    <div className="homerightleft flex">
                        <input
                            type="text"
                            id="homesearch"
                            placeholder="Search Song/Playlist"
                        />
                        
                        <div className="headsearch" onClick={searchSong}><i className="fas fa-search"></i></div>
                        <span className="headsearch headadd" onClick={gotoadd}><i className="fas fa-plus"></i></span>
                    </div>
                    
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

            <div className="body">
                <HomeBody/>
            </div>

            {/* <div className="player">
                <Player liked={false} />
            </div> */}
        </div>
    );
}
