import React, { useContext } from "react";
import BaseContext from "../Context/BaseContext";
import PlayListCard from "./PlayListCard";
import Playlistcard2 from "./PlaylistCard2";
import "./Styles/Addto.css";

export default function Addto() {
    const context = useContext(BaseContext);
    const hideMe = () => {
        context.setshowAddto(false);
    };
    if (context.showAddto == false) return <></>;
    if (context.user === null) {
        hideMe();
        context.setloginShow(true);
        return;
    }
    const shownewListCreator = () => {
        context.setcreateListShow(true);
    };

    return (
        <div className="divaddtoCont">
            <i class="fas fa-times signinclose" onClick={hideMe}></i>
            <div className="addtocontainer">
                <div id="addlistscroll">
                    {context.user.contribPlayList.map((elem, index) => {
                        return (
                            <PlayListCard
                                action="create"
                                key={elem._id}
                                name={elem.name}
                                creator={elem.createdBy}
                                id={elem}
                                src={elem.clip}
                            />
                        );
                    })}
                </div>
                <div className="addnewplaylist" onClick={shownewListCreator}>
                    <div class="fas fa-plus"></div>
                </div>
            </div>
        </div>
    );
}
