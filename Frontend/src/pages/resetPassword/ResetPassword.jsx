import { Email } from "@mui/icons-material";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./resetpassword.css";
import axios from "axios";


const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const[id,setId] = useState('')
  const[token, setToken] = useState('')
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get("email");
    const id = urlParams.get("id");
    setId(id)
    const token = urlParams.get("token");
    setToken(token)
    setEmail(email);

  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password === confirmPassword) {
      const user = {
        password,
      };
      await axios
        .post(
          `http://localhost:5000/api/v1/auth/reset-password/${id}/${token}`,
          user
        )
        .then((res) => {

          navigate('/')
          
        })
        .catch((err) => {
        
          console.log(err);
        });
    }
    else{
      window.alert("Password and confirm password must be same!")
    }
  };
  return (
    <div className="reset-password-container">
      <h2>Reset Password{email}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>New Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};
export default ResetPassword;
