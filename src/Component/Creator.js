import React, { useContext } from "react";
import BaseContext from "../Context/BaseContext";
import "./Styles/Creator.css";
import UploadMusic from "./UploadMusic";

export default function Creator() {
    const context = useContext(BaseContext);
    const showUploadMusic = ()=>{
        context.setuploadMusicShow(true)
    }
    return (
        <div class="creatorbody">
            <UploadMusic/>
            <div class="creator">PlayList</div>
            <div class="creator" onClick={showUploadMusic}>Audio</div>
        </div>
    );
}
