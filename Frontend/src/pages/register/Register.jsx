import { useState } from "react";
import { useNavigate } from "react-router-dom";


import axios from "axios";
import "./register.css";
const Register = () => {
  const [userName, setuserName] = useState("");
  const [nameErr, setNameErr] = useState(null);
  const [userEmail, setuserEmail] = useState("");
  const [emailErr, setEmailErr] = useState(null);
  const [userPassword, setuserPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState(null);
  const [confPassword, setconfPassword] = useState("");
  const [confPasswordErr, setConfPasswordErr] = useState(null);
  const [passwordIsEqual, setPasswordIsEqual] = useState(null);

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordPattern =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  const navigate = useNavigate();

  const validateForm = (name, email, password, confirmpassword) => {
    if (name == null || name === "") {
      setNameErr("Please fill the name field");
    }
    if (email == null || email === "") {
      setEmailErr("Please fill the Email field");
    }
    if (password == null || password === "") {
      setPasswordErr("Please fill Password field");
    }
    if (confirmpassword == null || confirmpassword === "") {
      setConfPasswordErr("Please fill the Confirm password field");
    }
    if (password !== confirmpassword) {
      setPasswordIsEqual("Both password must be equal");
      return false;
    }
    if (!email.match(emailPattern)) {
      setEmailErr("please enter valid email");
      return false;
    }
    if (!password.match(passwordPattern)) {
      setPasswordErr("Please enter valid password");
      return false;
    }
    if (email.match(emailPattern) && password.match(passwordPattern)) {
      console.log(true);
      return true;
    } else {
      return false;
    }
  };

  const addUser = (e) => {
    e.preventDefault();
    if (validateForm(userName, userEmail, userPassword, confPassword)) {
      const user = {
        userName,
        userEmail,
        userPassword,
      };
      axios.post(`${process.env.REACT_APP_API_URL}auth/register`,user)
        .then(() => {
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
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
          <form className="loginBox" onSubmit={addUser}>
            <input
              type="text"
              placeholder="Username"
              className="loginInput"
              value={userName}
              onClick={() => {
                setNameErr("");
              }}
              onChange={(e) => {
                setuserName(e.target.value);
              }}
            />
            {nameErr && <p style={{ color: "red" }}>{nameErr}</p>}
            <input
              type="email"
              placeholder="Email"
              className="loginInput"
              value={userEmail}
              onClick={() => {
                setEmailErr(null);
              }}
              onChange={(e) => {
                setuserEmail(e.target.value);
              }}
            />
            {emailErr && <p style={{ color: "red" }}>{emailErr}</p>}
            <input
              type="password"
              placeholder="Password"
              className="loginInput"
              value={userPassword}
              onClick={() => {
                setPasswordErr(null);
                setPasswordIsEqual(null);
              }}
              onChange={(e) => {
                setuserPassword(e.target.value);
              }}
            />
            {passwordErr && <p style={{ color: "red" }}>{passwordErr}</p>}
            <input
              type="password"
              placeholder="Password Again"
              className="loginInput"
              value={confPassword}
              onClick={() => {
                setConfPasswordErr(null);
                setPasswordIsEqual(null);
              }}
              onChange={(e) => {
                setconfPassword(e.target.value);
              }}
            />
            {confPasswordErr && (
              <p style={{ color: "red" }}>{confPasswordErr}</p>
            )}
            {passwordIsEqual && (
              <p style={{ color: "red" }}>{passwordIsEqual}</p>
            )}
            <button type="submit" className="loginButton">
              Sign Up
            </button>

            <button
              className="loginRegisterButton"
              onClick={() => {
                navigate("/");
              }}
            >
              Log into Account
            </button>
            
          </form>
        </div>
      </div>
    </div>
  );
};
export default Register;
