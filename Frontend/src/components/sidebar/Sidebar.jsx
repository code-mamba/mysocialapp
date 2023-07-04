import "./sidebar.css";
import { Groups, Bookmark, Chat, PlayCircle, Home } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
const Sidebar = () => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);

  const logout = () => {
    axios.get("http://localhost:5000/api/v1/auth/logout").then(() => {
      sessionStorage.clear();
      Cookies.remove("token");
      navigate("/");
      
    });
  };

  const choose = (value) => {
    setSelectedItem(value);
  };

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li
            className={`sidebarListItem ${
              selectedItem === "home" ? "selected" : null
            }`}
            onClick={() => {
              navigate("/home");
              choose("home");
            }}
          >
            <Home className="sidebarIcon"></Home>
            <span className="sidebarListItemText">Home</span>
          </li>
          <li
            className={`sidebarListItem ${
              selectedItem === "messenger" ? "selected" : null
            }`}
            onClick={() => {
              navigate("/messenger");
              choose("messenger");
            }}
          >
            <Chat className="sidebarIcon"></Chat>
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li
            className={`sidebarListItem ${
              selectedItem === "videos" ? "selected" : null
            }`}
            onClick={() => {
              navigate("/videos");
              choose("videos");
            }}
          >
            <PlayCircle className="sidebarIcon"></PlayCircle>
            <span className="sidebarListItemText">Videos</span>
          </li>

          <li
            className={`sidebarListItem ${
              selectedItem === "friendsPost" ? "selected" : null
            }`}
            onClick={() => {
              choose("friendsPost");
              navigate("/friendsPost");
            }}
          >
            <Groups className="sidebarIcon"></Groups>
            <span className="sidebarListItemText">Friends post</span>
          </li>

          <li
            className={`sidebarListItem ${
              selectedItem === "saved" ? "selected" : null
            }`}
            onClick={() => {
              choose("saved");
              navigate("/savedPost");
            }}
          >
            <Bookmark className="sidebarIcon"></Bookmark>
            <span className="sidebarListItemText">Saved</span>
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
