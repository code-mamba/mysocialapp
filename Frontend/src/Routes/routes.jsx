import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import ForgotPasswordForm from "../pages/forgotPassword/ForgotPassword";
import ResetPassword from "../pages/resetPassword/ResetPassword";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

const RoutePage = () => {
  const [islogedIn, setisLogedIn] = useState(false);
  return (
    <Routes>
      <Route path="/" element={<Login setisLogedIn={setisLogedIn}></Login>} />
      <Route path="/home" element={<Home></Home>} />
      <Route path="/register" element={<Register></Register>} />
      <Route
        path="/forgotPassword"
        element={<ForgotPasswordForm></ForgotPasswordForm>}
      ></Route>
      <Route path="/resetPassword" element={<ResetPassword></ResetPassword>} ></Route>
    </Routes>
  );
};
export default RoutePage;
