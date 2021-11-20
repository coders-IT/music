import React, { useContext, useState } from "react";
import BaseContext from "../Context/BaseContext";

import "./Styles/CreateNewPlaylist.css";

export default function CreateNewPlaylist() {
    const context = useContext(BaseContext);

    const [imgURL, setimgURL] = useState(
        "https://firebasestorage.googleapis.com/v0/b/sampleproject-321915.appspot.com/o/blankCover.png?alt=media&token=5e8ade58-8ce6-4d50-a69e-9eb27634d636"
    );

    const listCoverChg = (x) => {
        if (x.target.files.length === 0) return;

        console.log(x.target.files[0]);
        const img = document.getElementById("listcover");
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            console.log("df");
            setimgURL(e.target.result);
        };
        fileReader.readAsDataURL(x.target.files[0]);
    };

    const closeme = () => {
        context.setcreateListShow(false);
    };

    const addSong = async (d) => {
        var data = {
            token: localStorage.getItem("jwtTokken"),
            songs: JSON.stringify(context.curMusic),
        };
        console.log("/api/playlist/", d.id, context.curMusic);
        data = await context.callApi("/api/playlist/" + d.id, "PUT", data);
        console.log(data);
        context.setshowAddto(false);
    };

    const createList = async (e) => {
        e.preventDefault();
        console.log("you clicked");
        const uploadbtn = document.getElementById("uploadbtn");
        var img =
            "https://firebasestorage.googleapis.com/v0/b/sampleproject-321915.appspot.com/o/emptyAlbum.jpg?alt=media&token=6a4b6f16-4cae-4fe8-81d5-3210c0c16afe";
        var fileInput = document.getElementById("listUploadCover");

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
            uploadbtn.setAttribute("disabled", true);
            console.log("Uploading image");
            uploadbtn.value = "Uploading...";
            img = await context.upload("image/jpg", "listUploadCover");
        }
        uploadbtn.value = "Uploaded";
        let data = {
            name: document.getElementById("nameList").value,
            token: localStorage.getItem("jwtTokken"),
            clip: img,
        };
        console.log(data);
        const resp = await context.callApi("/api/playlist", "POST", data);
        context.setAlert(true);
        context.setalertBody(resp.success);
        uploadbtn.value = "Upload";
        console.log(resp);

        context.setcreateListShow(false);
        await addSong(resp.data);
        uploadbtn.removeAttribute("disabled");
    };

    if (context.createListShow === false) return <></>;

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
