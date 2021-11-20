import React, { useContext, useState } from "react";
import BaseContext from "../Context/BaseContext";

import "./Styles/CreateNewPlaylist.css";

export default function CreateNewPlaylist() {
    const context = useContext(BaseContext);

    const [imgURL, setimgURL] = useState(
        "https://firebasestorage.googleapis.com/v0/b/sampleproject-321915.appspot.com/o/blankCover.png?alt=media&token=5e8ade58-8ce6-4d50-a69e-9eb27634d636"
    );

    const listCoverChg = (x) => {
        console.log(x.target.files[0]);
        const img = document.getElementById("listcover");
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            console.log("df");
            setimgURL(e.target.result);
        };
        fileReader.readAsDataURL(x.target.files[0]);
    };

    const closeme = ()=>{
        context.setcreateListShow(false);
    }

    const addSong = async (d)=>{
        var data = {
            "token":localStorage.getItem("jwtTokken"),
            "songs":JSON.stringify(context.curMusic)
        }
        console.log("/api/playlist/",d.id, context.curMusic);
        data = await context.callApi("/api/playlist/"+d.id,"PUT", data);
        console.log(data);
        context.setshowAddto(false);
    }

    const createList = async (e)=>{
        e.preventDefault();
        const uploadbtn = document.getElementById("uploadbtn");
        uploadbtn.value="Uploading..."
        var img = "https://firebasestorage.googleapis.com/v0/b/sampleproject-321915.appspot.com/o/emptyAlbum.jpg?alt=media&token=6a4b6f16-4cae-4fe8-81d5-3210c0c16afe";
        console.log("Uploading image");
        if(document.getElementById("listUploadCover").files.length > 0) img = await context.upload("image/jpg", "listUploadCover")
        uploadbtn.value="Uploaded"
        let data = {
            name:document.getElementById("nameList").value,
            token:localStorage.getItem("jwtTokken"),
            clip:img,
        }
        console.log(data);
        const resp = await context.callApi("/api/playlist","POST",data);
        context.setAlert(true);
        context.setalertBody(resp.success);
        uploadbtn.value="Upload";
        console.log(resp);

        context.setcreateListShow(false);
        await addSong(resp.data);

    }


    if(context.createListShow === false) return (<></>);

    return (
        <div class="uploadmusiccont createlist">
            <form id="listcreatorForm">
                <i class="fas fa-times signinclose" onClick={closeme}></i>
                <div className="musicCoverCont">
                    <div class="musicCoverImage">
                        <label htmlFor="listUploadCover">
                            <img
                                src={imgURL}
                                width="100px"
                                height="100px"
                                id="listcover"
                            />
                        </label>
                    </div>
                    <input
                        type="file"
                        id="listUploadCover"
                        style={{ display: "none" }}
                        onChange={listCoverChg}
                    />
                        <input
                            type="text"
                            id="nameList"
                            class="detail"
                            placeholder="Enter Name"
                        />
                </div>
                <input
                    type="submit"
                    id="uploadbtn"
                    className="createList"
                    value="Create"
                    className="music-upload"
                    onClick={createList}
                />
            </form>
        </div>
    );
}
