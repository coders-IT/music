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
        console.log(x);
        if (context.user === null) return false;
        else {
            if (context.user.savedAudio.indexOf(x) != -1) {
                console.log("liked song ", x);
                return true;
            }
            return false;
        }
    };

    const showMusic = ()=>{
        document.getElementById("songResult").style.display="block";
        document.getElementById("listResult").style.display="none";
    }

    const showList = ()=>{
        document.getElementById("songResult").style.display="none";
        document.getElementById("listResult").style.display="flex";
    }

    if (context.searchResultshow == false) return <></>;
    return (
        <div className="searchCont">
            <i class="fas fa-times signinclose" onClick={hideMe}></i>
            <div class="searchResultCont">
                <div class="SearchtopBar">
                    <div onClick={showMusic}>Songs</div>
                    <div onClick={showList}>PlayLists</div>
                </div>
                <div className="result">
                    <div id="songResult" style={{display:"block"}}>
                        {context.searchResult.music.map((elem) => {
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
                        })}
                    </div>
                    <div id="listResult" style={{display:"none"}}>
                        {
                            context.searchResult.playlist.map((elem)=>{
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
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
