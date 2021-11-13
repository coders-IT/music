import React, { useContext } from "react";
import BaseContext from "../Context/BaseContext";
import "./Styles/Alert.css";

export default function Alert(props) {
    const context = useContext(BaseContext);


    const hideForm = () => {
        context.setAlert(false);
    }

    if (context.alert === false) return <></>;
    return (
        <>
            <div className="alertBox">
                <div className="alertBody">{context.alertBody}</div>
                <div className="alertOk" onClick={hideForm}>Ok</div>
            </div>
            <div className="cover" onClick={hideForm}></div>
        </>
    );
    
}
