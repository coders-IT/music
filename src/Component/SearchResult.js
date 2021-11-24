import React, { useContext } from "react";
import BaseContext from "../Context/BaseContext";
import MusicCard from "./MusicCard";
import PlayListCard from "./PlayListCard";
import "./Styles/SearchResult.css";

export default function SearchResult() {
    const context = useContext(BaseContext);
    const hideMe = () => {
        context.setsearchResultshow(false);
    };

    const isLiked = (x) => {
        //console.log(x);
        if (context.user === null) return false;
        else {
            if (context.user.savedAudio.indexOf(x) !== -1) {
                //console.log("liked song ", x);
                return true;
            }
            return false;
        }
    };

    const showMusic = (e) => {
        const resultshowSong = document.getElementById("resultshowSong");
        const resultshowlist = document.getElementById("resultshowlist");
        const songResult = document.getElementById("songResult");
        const listResult = document.getElementById("listResult");

        resultshowSong.style.display = "none";
        resultshowlist.style.display = "block";
        songResult.style.display = "block";
        listResult.style.display = "none";
    };

    const showList = () => {
        const resultshowSong = document.getElementById("resultshowSong");
        const resultshowlist = document.getElementById("resultshowlist");
        const songResult = document.getElementById("songResult");
        const listResult = document.getElementById("listResult");

        resultshowSong.style.display = "block";
        resultshowlist.style.display = "none";
        songResult.style.display = "none";
        listResult.style.display = "flex";
    };

    if (context.searchResultshow === false) return <></>;
    return (
        <div className="searchCont">
            <i className="fas fa-times signinclose" onClick={hideMe}></i>
            <div className="searchResultCont">
                <div className="SearchtopBar">
                    <div
                        onClick={showMusic}
                        id="resultshowSong"
                        style={{ display: "none" }}
                    >
                        Songs
                    </div>
                    <div onClick={showList} id="resultshowlist">
                        PlayLists
                    </div>
                </div>
                <div className="result">
                    <div id="songResult" style={{ display: "block" }}>
                        {context.searchResult.music.length > 0 ? (
                            context.searchResult.music.map((elem) => {
                                elem["liked"] = isLiked(elem._id);
                                return (
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
                            })
                        ) : (
                            <div className="searchnotFound">No Song Found</div>
                        )}
                    </div>
                    <div id="listResult" style={{ display: "none" }}>
                        {context.searchResult.playlist.length > 0 ? (
                            context.searchResult.playlist.map((elem) => {
                                elem.id = elem._id;
                                return (
                                    <PlayListCard
                                        key={elem._id}
                                        name={elem.name}
                                        creator={elem.createdBy}
                                        id={elem}
                                        src={elem.clip}
                                    />
                                );
                            })
                        ) : (
                            <div className="searchnotFound"> No Playlist found </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
