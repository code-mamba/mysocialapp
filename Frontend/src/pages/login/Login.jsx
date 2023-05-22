import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";
import jwtDecode from "jwt-decode"
import { GoogleLogin } from "@react-oauth/google";

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


  const handleLoginSuccess = (response) => {
    console.log("hi")
    console.log(response);
    const tokenId = response.tokenId
    console.log(tokenId)
    axios.post('http://localhost:5000/api/v1/auth/google',{tokenId})
    .then(()=>{
      navigate('/')
    })
    .catch((error)=>{
      console.log("hi")
      console.log(error)
    })
  };
  const handleLoginFailure = (error) => {
    console.log(error);
  };

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
          if(res.data.success===true){
            const token = res.data.token
            const decoded = jwtDecode(token)
            const userId = decoded.id
            setisLogedIn(true);
            sessionStorage.setItem('userId',userId)
            navigate('/home')
            
          }
          else{
            setisLogedIn(false)
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
            <span className="loginForgot" onClick={()=>{navigate('/forgotPassword')}} >Forgot Password?</span>
            <button
              className="loginRegisterButton"
              onClick={() => navigate("/register")}
            >
              Create a New Account
            </button>
            <div className="googleButton">
              <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginFailure}></GoogleLogin>

              {/* <GoogleLogin
                clientId="588708527535-2ub345bg4jcbaklujqj6ttkr5ihd4gcl.apps.googleusercontent.com"
                buttontext="Log in with Google"
                onSuccess={handleLoginSuccess}
                onFailure={handleLoginFailure}
                cookiePolicy={"single_host_origin"}
                /> */}
            
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
