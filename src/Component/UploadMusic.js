import React, { useContext, useState } from "react";
import BaseContext from "../Context/BaseContext"
import "./Styles/UploadMusic.css";


export default function UploadMusic() {
    const context = useContext(BaseContext);

    const [imgURL, setimgURL] = useState(
        "https://firebasestorage.googleapis.com/v0/b/sampleproject-321915.appspot.com/o/blankCover.png?alt=media&token=5e8ade58-8ce6-4d50-a69e-9eb27634d636"
    );
    const [music, setmusic] = useState("Select A file Please...");

    const musicCoverChg = (x) => {
        console.log(x.target.files[0]);
        const img = document.getElementById("musicCover");
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            console.log("df");
            setimgURL(e.target.result);
        };
        fileReader.readAsDataURL(x.target.files[0]);
    };

    const musicFileChg = (e) => {
        setmusic(e.target.files[0].name);
    };

    
    const uploadMusic = async (e)=>{
        e.preventDefault();
        const uploadbtn = document.getElementById("uploadbtn");
        uploadbtn.value="Uploading..."
        
        console.log("Uploading image");
        
        var img = "https://firebasestorage.googleapis.com/v0/b/sampleproject-321915.appspot.com/o/blankCover.png?alt=media&token=5e8ade58-8ce6-4d50-a69e-9eb27634d636";
        if(document.getElementById("musicUploadCover").files.length > 0)img = await context.upload("image/jpg", "musicUploadCover")
        console.log("Uploading Music", img);
        const musicUrl = await context.upload("audio/mp3", "musicFile");
        console.log("Uploaded",music);
        uploadbtn.value="Uploaded"
        let data = {
            name:music,
            token:localStorage.getItem("jwtTokken"),
            audio:musicUrl,
            clip:img,
            singer:document.getElementById("singer").value,
            tags:document.getElementById("tags").value.split(",")
        }
        console.log(data);
        const resp = await context.callApi("/api/song","POST",data);
        context.setAlert(true);
        context.setalertBody(resp.success);
        context.setuploadMusicShow(false);
        uploadbtn.value="Upload";
        setmusic("");

    }

    const hideUpload = ()=>{
        context.setuploadMusicShow(false);
    }

    if(context.uploadMusicShow == false)return(<></>);

    return (
        <div class="uploadmusiccont">
        <form id="musicUploadForm" onSubmit={uploadMusic}>
            <i class="fas fa-times signinclose" onClick={hideUpload}></i>
            <div className="musicCoverCont">
               <div class="musicCoverImage">
                <label htmlFor="musicUploadCover">
                    <img
                        src={imgURL}
                        width="100px"
                        height="100px"
                        id="musicCover"
                    />
                </label>
                </div>
                <input
                    type="file"
                    id="musicUploadCover"
                    style={{ display: "none" }}
                    onChange={musicCoverChg}
                />
                <div className="musicname">
                    <div id="labelmusicFile"><label htmlFor="musicFile">{music}</label></div>
                    <input
                        type="file"
                        id="musicFile"
                        style={{ display: "none" }}
                        onChange={musicFileChg}
                    />
                </div>
            </div>
            <div className="othersongdetail">
                <input type="text" id="singer" class="detail" placeholder="Enter Singer"/>
                <input type="text" id="tags" class="detail" placeholder="Enter Tags(Coma Seprated)"/>

            </div>
            <input type="submit" id="uploadbtn" value="Upload" className="music-upload"/>
        </form>
        </div>
    );
}