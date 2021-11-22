import React, { useContext, useState } from "react";
import BaseContext from "../Context/BaseContext";
import Alert from "./Alert";
import "./Styles/Signup.css";

export default function Signup() {
    const context = useContext(BaseContext);
    const [image, setimage] = useState(null);

    const uploadImg = async (x) => {
        console.log(x.target.files[0]);
        const img = document.getElementById("SignupprofilePic");
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            img.setAttribute("src", e.target.result);
        };
        fileReader.readAsDataURL(x.target.files[0]);
    };

    const toLogin = ()=>{
        context.setsignUpShow(false);
        context.setloginShow(true);
    }
    

    const signUpMe = async (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const cpassword = document.getElementById("cpassword").value;
        var file = document.getElementById("signupfile");
        var profilepic = "https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814050_960_720.png";
        if (password !== cpassword) {
            context.setalertBody("Both Password should match");
            context.setAlert(true);
            return;
        }

        if(file.files.length > 0){
            profilepic = await context.upload("image/jpg", "signupfile");
        }
        console.log(profilepic);
        const data = {
            "username":username,
            "name" : name,
            "password":password,
            "profilePic":profilepic
        }

        console.log(data)

        const resp = await context.callApi("/api/user/signup", "POST", data);

        console.log(resp);
        if(resp.error){
            context.setalertBody(resp.error);
            context.setAlert(true);
            return;
        }

        localStorage.setItem("jwtTokken", resp.data);
        window.location.href = "http://localhost:3000/";
    };

    const hideMe = ()=>{
        context.setsignUpShow(false);
    }

    if(context.signUpShow == false) return(<></>);

    return (
        <div class="divsignupcont">

        <form className="signupCont" onSubmit={signUpMe}>
            <i class="fas fa-times signUpclose" onClick={hideMe}></i>
            {/* <div id="linktoSignIn"></div> */}

            <div className="signuptext">
                <div>
                    <i className="fas fa-signature"></i>
                    <input
                        id="name"
                        type="text"
                        placeholder="Your Name"
                        required="true"
                        class="signuptextfield"
                    />
                </div>
                <div>
                    <i className="fas fa-user"></i>
                    <input
                        id="username"
                        type="text"
                        placeholder="Your Username"
                        required="true"
                        class="signuptextfield"
                    />
                </div>
                <div>
                    <i className="fas fa-lock"></i>
                    <input
                        id="password"
                        type="password"
                        placeholder="Your Password"
                        required="true"
                        class="signuptextfield"
                    />
                </div>
                <div>
                    <i className="fas fa-lock"></i>
                    <input
                        id="cpassword"
                        type="password"
                        placeholder="Confirm Password"
                        required="true"
                        class="signuptextfield"
                    />
                </div>
            </div>

            <div className="signupphoto">
                <label htmlFor="signupfile">
                    <img
                        src="https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814050_960_720.png"
                        width="175px"
                        height="175px"
                        alt="Profile Pic"
                        title="Chose Image"
                        id="SignupprofilePic"
                    />
                </label>
                <input
                    type="file"
                    id="signupfile"
                    style={{ display: "none" }}
                    onChange={uploadImg}
                />
                <input type="submit" value="Create" />
            </div>
            <div id="linktoSignIn" onClick={toLogin}>Already Have, Click Here</div>
        </form>
        </div>
    );
}
