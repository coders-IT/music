import React, { useContext, useState } from "react";
import BaseContext from "../Context/BaseContext";
import "./Styles/UploadMusic.css";

export default function UploadMusic() {
    const context = useContext(BaseContext);

    const [imgURL, setimgURL] = useState(
        "https://firebasestorage.googleapis.com/v0/b/sampleproject-321915.appspot.com/o/blankCover.png?alt=media&token=5e8ade58-8ce6-4d50-a69e-9eb27634d636"
    );
    const [music, setmusic] = useState("Select A file Please...");

    const musicCoverChg = (x) => {
        if(x.target.files.length === 0)return;
        //console.log(x.target.files[0]);
        // const img = document.getElementById("musicCover");
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            //console.log("df");
            setimgURL(e.target.result);
        };
        fileReader.readAsDataURL(x.target.files[0]);
    };

    const musicFileChg = (e) => {
        if(e.target.files.length === 0)return;
        setmusic(e.target.files[0].name);
    };

    const uploadMusic = async (e) => {
        e.preventDefault();
        const uploadbtn = document.getElementById("uploadbtn");

        var fileInput = document.getElementById("musicUploadCover");
        var musicInput = document.getElementById("musicFile");
        var img = "https://firebasestorage.googleapis.com/v0/b/sampleproject-321915.appspot.com/o/blankCover.png?alt=media&token=5e8ade58-8ce6-4d50-a69e-9eb27634d636";
        if (fileInput.files.length > 0) {
            if (
                fileInput.files[0].name.endsWith(".jpg") ||
                fileInput.files[0].name.endsWith(".jpeg") ||
                fileInput.files[0].name.endsWith(".png")
            );
            else {
                context.setAlert(true);
                context.setalertBody(
                    "Cover image foramt should be in jpg, png or jpeg"
                );
                return;
            }

            if ( musicInput.files.length === 0 || !musicInput.files[0].name.endsWith(".mp3") ) {
                context.setAlert(true);
                context.setalertBody("Song format should be .mp3");
                return;
            }
            uploadbtn.setAttribute("disabled",true);
            //console.log("Uploading image");
            uploadbtn.value = "Uploading...";
            img = await context.upload("image/jpg", "musicUploadCover");
        }else{
            if ( musicInput.files.length === 0 || !musicInput.files[0].name.endsWith(".mp3") ) {
                context.setAlert(true);
                context.setalertBody("Song format should be .mp3");
                return;
            }
            uploadbtn.setAttribute("disabled",true);
            //console.log("Uploading image");
            uploadbtn.value = "Uploading...";

        }

        //console.log("Uploading Music", img);

        const musicUrl = await context.upload("audio/mp3", "musicFile");
        //console.log("Uploaded", music);
        uploadbtn.value = "Uploaded";
        let data = {
            name: music,
            token: localStorage.getItem("jwtTokken"),
            audio: musicUrl,
            clip: img,
            singer: document.getElementById("singer").value,
            tags: document.getElementById("tags").value.split(","),
        };
        //console.log(data);
        const resp = await context.callApi("/api/song", "POST", data);
        context.setAlert(true);
        context.setalertBody(resp.success);
        context.setuploadMusicShow(false);
        uploadbtn.value = "Upload";
        setmusic("Select A file Please...");
        uploadbtn.removeAttribute("disabled");
    };

    const hideUpload = () => {
        context.setuploadMusicShow(false);
    };

    if (context.uploadMusicShow === false) return <></>;
    if (context.user === null) {
        hideUpload();
        context.setloginShow(true);
    }
    return (
        <div className="uploadmusiccont">
            <form id="musicUploadForm">
                <i className="fas fa-times signinclose" onClick={hideUpload}></i>
                <div className="musicCoverCont">
                    <div className="musicCoverImage">
                        <label htmlFor="musicUploadCover">
                            <img
                                alt=""
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
                        <div id="labelmusicFile">
                            <label htmlFor="musicFile">{music}</label>
                        </div>
                        <input
                            type="file"
                            id="musicFile"
                            style={{ display: "none" }}
                            onChange={musicFileChg}
                        />
                    </div>
                </div>
                <div className="othersongdetail">
                    <input
                        type="text"
                        id="singer"
                        className="detail"
                        placeholder="Enter Singer"
                        required={true}
                    />
                    <input
                        type="text"
                        id="tags"
                        className="detail"
                        placeholder="Enter Tags(Coma Seprated)"
                        required={true}
                    />
                </div>
                <input
                    type="submit"
                    id="uploadbtn"
                    value="Upload"
                    className="music-upload"
                    onClick={uploadMusic}
                />
            </form>
        </div>
    );
}
