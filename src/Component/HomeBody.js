import "./Styles/HomeBody.css";
import BaseContext from "../Context/BaseContext";
import React, { useContext } from "react";
import MusicCard from "./MusicCard";
import PlayListCard from "./PlayListCard";

export default function HomeBody() {
    const context = useContext(BaseContext);

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

    const src =
        "https://firebasestorage.googleapis.com/v0/b/sampleproject-321915.appspot.com/o/cover.jpg?alt=media&token=d4caef00-6f0c-4310-9949-59a2c1bd403a";
    return (
        <div class="homebody">
            <div class="playlist ">
                {!context.user ||
                context.user.savedPlayList.length +
                    context.user.contribPlayList.length ===
                    0 ? (
                    <center>
                        <h1>No Playlist Saved/Created</h1>
                    </center>
                ) : (
                    context.user.savedPlayList.map((elem, ind) => {
                        // elem["index"] = ind;
                        console.log("elem", elem);
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
                )}
                {!context.user ||
                context.user.savedPlayList.length +
                    context.user.contribPlayList.length ===
                    0 ? (
                    <></>
                ) : (
                    context.user.contribPlayList.map((elem, ind) => {
                        // elem["index"] = ind;
                        console.log("elem", elem);
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
                )}
            </div>

            <div class="recent">
                {context.curQueue.map((elem, ind) => {
                    elem["index"] = ind;
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
        </div>
    );
}
