import "./Styles/HomeBody.css";
import BaseContext from "../Context/BaseContext"
import React, { useContext } from "react";
import MusicCard from "./MusicCard";
import PlayListCard from "./PlayListCard";

export default function HomeBody() {
    const context = useContext(BaseContext);
    const src =
        "https://firebasestorage.googleapis.com/v0/b/sampleproject-321915.appspot.com/o/cover.jpg?alt=media&token=d4caef00-6f0c-4310-9949-59a2c1bd403a";
    return (
        <div class="homebody">
            <div class="playlist">
                <PlayListCard
                    src={src}
                    follower={345}
                    name="Deepak Kumar"
                    creator="Deepak"
                />
                <PlayListCard
                    src={src}
                    follower={345}
                    name="Deepak Kumar"
                    creator="Deepak"
                />
                <PlayListCard
                    src={src}
                    follower={345}
                    name="Deepak Kumar"
                    creator="Deepak"
                />
                <PlayListCard
                    src={src}
                    follower={345}
                    name="Deepak Kumar"
                    creator="Deepak"
                />
                <PlayListCard
                    src={src}
                    follower={345}
                    name="Deepak Kumar"
                    creator="Deepak"
                />
                <PlayListCard
                    src={src}
                    follower={345}
                    name="Deepak Kumar"
                    creator="Deepak"
                />
                <PlayListCard
                    src={src}
                    follower={345}
                    name="Deepak Kumar"
                    creator="Deepak"
                />
                <PlayListCard
                    src={src}
                    follower={345}
                    name="Deepak Kumar"
                    creator="Deepak"
                />
                <PlayListCard
                    src={src}
                    follower={345}
                    name="Deepak Kumar"
                    creator="Deepak"
                />
                <PlayListCard
                    src={src}
                    follower={345}
                    name="Deepak Kumar"
                    creator="Deepak"
                />
            </div>
            
            <div class="recent">
                {
                    context.recentMusic.map((elem)=>{
                        return (<MusicCard name={elem.name} id={elem} src={elem.clip} likes={elem.plays} like={true} playing={false} singer={elem.singer}/>)
                    })
                }

            </div>
        </div>
    );
}
