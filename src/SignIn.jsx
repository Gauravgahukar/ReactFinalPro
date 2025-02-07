import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "./store.js";


function SignIn() {
    let username = useRef(null);
    let password = useRef(null);

    let dispatch = useDispatch();
    let navigate = useNavigate();

    const loginCheck = () => {
        if (username.current.value === "Gaurav" && password.current.value === "Patil008") {
            dispatch(login(username.current.value));
            // localStorage.setItem("username", username.current.value);
            navigate("/home");
        } else {
            alert("Your credentials are wrong. Try again!");
        }
    };

    return (
        <>
            <div className="contact-container">
                <h1>Login Form</h1>
                <p>
                    Please enter your credentials to sign in and access your account. If you don't have an account, sign up to start shopping!
                </p>
                <form className="contact-form">
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" ref={username} placeholder="Enter Username" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" ref={password} placeholder="Enter Password" />
                    </div>
                    <button type="button" onClick={loginCheck}>
                        Sign In
                    </button>
                </form>
            </div>
        </>
    );
}

export default SignIn;
