import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";
import jwtDecode from "jwt-decode";
import { GoogleLoginButton } from "react-social-login-buttons";
import { LoginSocialGoogle } from "reactjs-social-login";

const Login = ({ setisLogedIn }) => {
  const [userEmail, setuserEmail] = useState("");
  const [EmailErr, setEmailErr] = useState(null);
  const [userPassword, setuserPassword] = useState("");
  const [passworErr, setPasswordErr] = useState(null);
  const [credErr, setCredErr] = useState(null);
  const emailPattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const passwordPattern =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  const navigate = useNavigate();

  function validateForm(email, password) {
    console.log("email", email);
    console.log("password", password);
    console.log("emailmatch", email.match(emailPattern));
    console.log("passwordmatch", password.match(passwordPattern));
    if ((email === "") | (email === null)) {
      setEmailErr("Please fill the email field");
    }
    if ((password === "") | (password === null)) {
      setPasswordErr("Please fill the password field");
    }
    if (email.match(emailPattern) && password.match(passwordPattern)) {
      return false;
    } else {
      return true;
    }
  }

  const login = (e) => {
    e.preventDefault();
    if (validateForm(userEmail, userPassword)) {
      setCredErr("Invalid User Name or Password");
    } else {
      const user = {
        userEmail,
        userPassword,
      };
      axios
        .post("http://localhost:5000/api/v1/auth/login", user)
        .then((res) => {
          if (res.data.success === true) {
            const token = res.data.token;
            const decoded = jwtDecode(token);
            sessionStorage.setItem("userId", decoded.id );
            setisLogedIn(true);
            
            navigate("/home");
          } else {
            setisLogedIn(false);
          }
        })
        .catch((error) => {
          setCredErr(error.response.data.error);
        });
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginleft">
          <h3 className="loginLogo">My Fb</h3>
          <span className="loginDesc">
            connect with friends and world around you on My Fb.
          </span>
        </div>
        <div className="loginright">
          <form className="loginBox" onSubmit={login}>
            <input
              type="text"
              placeholder="Email"
              className="loginInput"
              onChange={(e) => setuserEmail(e.target.value)}
              onClick={() => {
                setEmailErr(null);
                setCredErr(null);
              }}
            />
            {EmailErr && <p style={{ color: "red" }}>{EmailErr}</p>}

            <input
              type="Password"
              placeholder="Password"
              className="loginInput"
              onChange={(e) => setuserPassword(e.target.value)}
              onClick={() => {
                setPasswordErr(null);
                setCredErr(null);
              }}
            />
            {passworErr && <p style={{ color: "red" }}>{passworErr}</p>}
            {credErr && <p style={{ color: "red" }}>{credErr}</p>}
            <button className="loginButton">Log In</button>
            <span
              className="loginForgot"
              onClick={() => {
                navigate("/forgotPassword");
              }}
            >
              Forgot Password?
            </span>
            <button
              className="loginRegisterButton"
              onClick={() => navigate("/register")}
            >
              Create a New Account
            </button>
            <div className="googleButton">
              <LoginSocialGoogle
                client_id={
                  "588708527535-1s5esn1mfa0q9b5ods1tiv8mc4kdljak.apps.googleusercontent.com"
                }
                scope="openid profile email"
                discoveryDocs="claims supported"
                access_type="offline"
                onResolve={({ provider, data }) => {
                  console.log(data.picture);
                  const user = {
                    userName: data.name,
                    userEmail: data.email,
                    userPassword: "Password@123",
                    profilepic: data.picture,
                  };
                  axios
                    .post("http://localhost:5000/api/v1/auth/register", user)
                    .then((res) => {
                      if (res.data.success === true);
                      const token = res.data.token;
                      const decoded = jwtDecode(token);
                      const userId = decoded.id;
                      console.log(userId);
                      setisLogedIn(true);
                      sessionStorage.setItem("userId", userId);
                      sessionStorage.setItem("google", true);
                      navigate("/home");
                    });
                }}
                onReject={(err) => {
                  console.log(err);
                }}
              >
                <GoogleLoginButton></GoogleLoginButton>
              </LoginSocialGoogle>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
