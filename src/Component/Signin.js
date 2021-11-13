import React, { useContext, useState } from "react";
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

        console.log(data)

        const resp = await context.callApi("/api/user/login", "POST", data);

        console.log(resp);
        if(resp.error){
            context.setalertBody(resp.error);
            context.setAlert(true);
            return;
        }

        localStorage.setItem("jwtTokken", resp.data);
    };

    return (
        <form className="signinCont" onSubmit={signinme}>
            <i class="fas fa-times signinclose"></i>

            <div className="signintext">
                <div>
                    <i className="fas fa-user"></i>
                    <input
                        id="username"
                        type="text"
                        placeholder="Your Username"
                        required="true"
                        class="text"
                    />
                </div>
                <div>
                    <i className="fas fa-lock"></i>
                    <input
                        id="password"
                        type="password"
                        placeholder="Your Password"
                        required="true"
                        class="text"
                    />
                </div>
                <input type="submit" value="Log In" />
            </div>

            <div id="linkSignUp">Don't have, Create One</div>
        </form>
    );
}
