import React, { useEffect, useState } from "react";
import BaseContext from "./BaseContext";
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import storage from "./FirebaseInit";

const ContextState = (props) => {
    
    const [alertBody, setalertBody] = useState("No Error");
    const [alert, setAlert] = useState(false);
    const [user, setuser] = useState(null);
    const [loginShow, setloginShow] = useState(false);
    const [signUpShow, setsignUpShow] = useState(false);


    useEffect(()=>{
        if(user) console.log(user.profilePic,user);
    },[user]);


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
        <BaseContext.Provider value={{ callApi, upload, alertBody, setalertBody, alert, setAlert, user, setuser, loginShow, setloginShow, signUpShow, setsignUpShow }}>
            {props.children}
        </BaseContext.Provider>
    );
};

export default ContextState;
