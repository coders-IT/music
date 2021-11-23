import "./Styles/AddtoList.css";

import React, { useContext } from "react";
import BaseContext from "../Context/BaseContext";
import PlaylistCard2 from "./PlaylistCard2";

export default function AddtoList() {
    const context = useContext(BaseContext);
    const hideMe = ()=>{

    }
    const createList = async ()=>{
        var x = window.prompt();
        if(x){
            var data = {
                "token":localStorage.getItem("jwtTokken"),
                "songs":[context.curMusic._id]
            }
            data = await context.callApi("/api/playlist/create","POST", data);
            console.log(data);
        }

    }
    return (
        <div className="addToplayList">
            <i className="fas fa-times signinclose" onClick={hideMe}></i>
            {
                context.user?(
                    context.user.contribPlayList.map((elem, ind) => {
                        // elem["index"] = ind;
                        return (
                            <PlaylistCard2
                                key={elem._id}
                                name={elem.name}
                                follwer={elem.followers}
                                creator={elem.createdBy}
                                id={elem}
                                src={elem.clip}
                            />
                        );
                    })
                ):(
                    <></>
                )
            }
            <div className="addList" onClick={createList}>
                <i className="fas fa-plus"></i>
            </div>
        </div>
    );
}
