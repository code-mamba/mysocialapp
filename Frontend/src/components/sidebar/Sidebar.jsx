import "./sidebar.css";
import { 
  Groups,
  Bookmark,
  Chat,
  PlayCircle,
  CalendarMonth,
  Home
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
const Sidebar = () => {
  const navigate = useNavigate();

  const logout = () => {
    axios.get("http://localhost:5000/api/v1/auth/logout").then(() => {
      sessionStorage.clear();
      Cookies.remove("token");
      navigate("/");
    });
  };

  

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li
            className="sidebarListItem"
          onClick={()=>{navigate("/home")}}>
            <Home className="sidebarIcon"></Home>
            <span className="sidebarListItemText">Home</span>
          </li>
          <li
            className="sidebarListItem"
          onClick={()=>{navigate('/messenger')}}>
            <Chat className="sidebarIcon"></Chat>
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem"
          onClick={()=>{navigate('/videos')}}>
            <PlayCircle className="sidebarIcon"></PlayCircle>
            <span className="sidebarListItemText">Videos</span>
          </li>

          <li
            className="sidebarListItem"
            onClick={()=>{navigate('/friendsPost')}}
          >
            <Groups
              className="sidebarIcon"
            ></Groups>
            <span className="sidebarListItemText">Friends post</span>
          </li>

          <li
            className="sidebarListItem"
            onClick={()=>{navigate("/savedPost")}}
          >
            <Bookmark className="sidebarIcon"></Bookmark>
            <span className="sidebarListItemText">Saved</span>
          </li>
          <li className="sidebarListItem">
            <CalendarMonth className="sidebarIcon"></CalendarMonth>
            <span className="sidebarListItemText">Events</span>
          </li>
        </ul>
        <hr className="sidebarHr"></hr>

        <button onClick={() => logout()} className="sidebarButton">
          Log Out
        </button>
      </div>
    </div>
  );
};
export default Sidebar;
