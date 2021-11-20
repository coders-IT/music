import React, { useEffect, useState } from "react";
import BaseContext from "./BaseContext";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "./FirebaseInit";

const ContextState = (props) => {
    const [alertBody, setalertBody] = useState("No Error");
    const [alert, setAlert] = useState(false);
    const [user, setuser] = useState(null);
    const [loginShow, setloginShow] = useState(false);
    const [signUpShow, setsignUpShow] = useState(false);
    const [uploadMusicShow, setuploadMusicShow] = useState(false);
    const [recentMusic, setrecentMusic] = useState([]);
    const [curMusic, setcurMusic] = useState({});
    const [curQueue, setcurQueue] = useState([]);
    const [changeURL, setchangeURL] = useState(false);
    const [showAddto, setshowAddto] = useState(false);
    const [createListShow, setcreateListShow] = useState(false);
    const [curPlaylist, setcurPlaylist] = useState({});
    const [searchResult, setsearchResult] = useState({});
    const [searchResultshow, setsearchResultshow] = useState(false);
    useEffect(() => {
        console.log(curMusic);
    }, [curMusic]);

    const callApi = async (endpoint, type, data) => {
        const url = `http://localhost:5000${endpoint}`;
        console.log(data);
        const resp = await fetch(url, {
            method: type,
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(data),
        });

        const parsed = await resp.json();
        return parsed;
    };

    const upload = async (type, e) => {
        e = document.getElementById(e);
        const file = e.files[0];
        var fileRef = ref(storage, file.name);
        const metadata = {
            contentType: type,
        };

        await uploadBytesResumable(fileRef, file, metadata);

        const url = await getDownloadURL(fileRef);

        return url;
    };

    return (
        <BaseContext.Provider
            value={{
                callApi,
                upload,
                alertBody,
                setalertBody,
                alert,
                setAlert,
                user,
                setuser,
                loginShow,
                setloginShow,
                signUpShow,
                setsignUpShow,
                uploadMusicShow,
                setuploadMusicShow,
                recentMusic,
                setrecentMusic,
                curMusic,
                setcurMusic,
                curQueue,
                setcurQueue,
                changeURL,
                setchangeURL,
                showAddto,
                setshowAddto,
                createListShow,
                setcreateListShow,
                curPlaylist,
                setcurPlaylist,
                searchResult,
                setsearchResult,
                searchResultshow,
                setsearchResultshow,
            }}
        >
            {props.children}
        </BaseContext.Provider>
    );
};

export default ContextState;
