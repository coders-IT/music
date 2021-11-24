import React, { useContext } from "react";
import BaseContext from "../Context/BaseContext";
import "./Styles/Signin.css";

export default function Signin() {
    const context = useContext(BaseContext);

    const signinme = async (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const data = {
            "username":username,
            "password":password,
        }

        //console.log(data)

        const resp = await context.callApi("/api/user/login", "POST", data);

        //console.log(resp);
        if(resp.error){
            context.setalertBody(resp.error);
            context.setAlert(true);
            return;
        }

        localStorage.setItem("jwtTokken", resp.data);
        window.location.href = "http://localhost:3000/";
    };
    const hideMe = ()=>{
        context.setloginShow(false);
    }

    const toSignUp= ()=>{
        context.setsignUpShow(true);
        context.setloginShow(false);
    }


    if(context.loginShow === false) return(<></>);

    return (
        <div className="divsigninCont">
        <form className="signinCont" onSubmit={signinme}>
            <i className="fas fa-times signinclose" onClick={hideMe}></i>

            <div className="signintext">
                <div>
                    <i className="fas fa-user"></i>
                    <input
                        id="username"
                        type="text"
                        placeholder="Your Username"
                        required="true"
                        className="text"
                    />
                </div>
                <div>
                    <i className="fas fa-lock"></i>
                    <input
                        id="password"
                        type="password"
                        placeholder="Your Password"
                        required="true"
                        className="text"
                    />
                </div>
                <input type="submit" value="Log In" className="loginbtn"/>
            </div>

            <div id="linkSignUp" onClick={toSignUp}>Don't have, Create One</div>
        </form>
        </div>
    );
}
