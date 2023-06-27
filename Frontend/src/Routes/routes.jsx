import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import ForgotPasswordForm from "../pages/forgotPassword/ForgotPassword";
import ResetPassword from "../pages/resetPassword/ResetPassword";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import SharePhoto from "../components/share/sharePhoto/SharePhoto";
import Profile from "../pages/myProfile/myProfile";
import Popup from "../pages/myProfile/Popup/Popup"
import SavedPost from "../pages/Savedpost/Savedpost";
import FormDialogue from "../pages/FormDialogue/FormDialogue";
import RequestNotification from "../pages/RequestNotification/RequestNotification";
import UserProfile from "../pages/UserProfile/UserProfile";
import FriendsPost from "../pages/FriendsPost/FriendsPost";
import Messenger from "../pages/Messenger/Messenger";
import Videos from "../pages/Videos/Videos";
import CommentBox from "../pages/CommentBox/CommentBox";
import PageNotFound from "../pages/404/404";


const RoutePage = () => {
  const [islogedIn, setisLogedIn] = useState(false);
  return (
    // <SavedPost></SavedPost>
    <Routes>
      <Route path="/" element={<Login setisLogedIn={setisLogedIn}></Login>} />
      <Route path="/home" element={<Home></Home>} />
      <Route path="/register" element={<Register></Register>} />
      <Route
        path="/forgotPassword"
        element={<ForgotPasswordForm></ForgotPasswordForm>}
      ></Route>
      <Route path="/resetPassword" element={<ResetPassword></ResetPassword>} ></Route>
      <Route path="/sharephoto" element={<SharePhoto></SharePhoto>}></Route>
      <Route path="/myprofile" element={<Profile></Profile>}></Route>
      <Route path="/popup" element={<Popup></Popup>}></Route>
      <Route path="/savedpost" element={<SavedPost></SavedPost>}></Route>
      <Route path="/FormDialogue" element={<FormDialogue></FormDialogue>}></Route>
      <Route path="/requestnotification" element={<RequestNotification></RequestNotification>}></Route>
      <Route path="/userprofile/:userId" element ={<UserProfile></UserProfile>}></Route>
      <Route path="/friendspost" element={<FriendsPost></FriendsPost>}></Route>
      <Route path="/videos" element={<Videos></Videos>} ></Route>
      <Route path="/messenger" element={<Messenger></Messenger>}></Route>
      <Route path="/comments" element={<CommentBox></CommentBox>}></Route>
      <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
    </Routes>
  );
};
export default RoutePage;
