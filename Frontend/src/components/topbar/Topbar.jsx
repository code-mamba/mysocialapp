import "./topbar.css";
import { useEffect, useState } from "react";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormDialogue from "../../pages/FormDialogue/FormDialogue";
import RequestNotification from "../../pages/RequestNotification/RequestNotification";
const Topbar = () => {
  const [user, setUser] = useState([]);
  const defaultPic = "/assets/person/default-avatar.jpg";
  const [searchResults, setSearchResults] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [requestCount, setRequestCount] = useState("");
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId");
  useEffect(() => {
   
    axios
      .get(`http://localhost:5000/api/v1/auth/me/${userId}`)
      .then((res) => {
        setUser(res.data.data);
        setRequestCount(res.data.data.pendingrequest.length);
      })
      .catch((err) => {
        console.log("topbar catch", err);
      });
  }, [requestCount]);

  const toggleDropdown = () => {
    setShowDropdown((prevState) => !prevState);
  };

  const PopupForm = () => {
    setShowForm((prevState) => !prevState);
  };
  const requestNotification = () => {
    setShowNotification((prevState) => !prevState);
  };
  const search = (e) => {
    const searchTerm = e.target.value;
    setShowPopup(searchTerm !== "");
    axios
      .get(`http://localhost:5000/api/v1/search?name=${searchTerm}`)
      .then((res) => {
        setSearchResults(res.data.data);
      })
      .catch((err) => {
        console.log("search error", err);
      });
  };

  return (
    <>
      <div className="topbarContainer">
        <div className="topbarLeft" onClick={() => navigate("/home")}>
          <span className="logo">MyFB</span>
        </div>
        <div className="topbarRight">
          <div className="searchbar">
            <Search className="searchIcon"></Search>
            <input
              placeholder="Search for friend"
              className="searchInput"
              onChange={search}
            ></input>
          </div>
          {showPopup && (
            <div className="popupList">
              {searchResults.map((result) => (
                <div
                  className="popupListItem"
                  key={result.id}
                  onClick={() => {
                    if(userId === result._id){
                      navigate('/myprofile')
                    }
                    else{
                      navigate(`/userprofile/${result._id}`);
                    }
                    
                  }}
                >
                  <img
                    src={
                      result.profilepic === "no-photo.jpg"
                        ? defaultPic
                        : `http://localhost:5000/public/${result.profilepic}`
                    }
                    alt=""
                    className="popupListImg"
                  ></img>
                  <span className="popupListName">{result.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="topbarRight">
          <div className="topbarlinks"></div>
          <div className="topbarIcons">
            <div
              className="topbarIconItem"
              onClick={() => navigate("/myProfile")}
            >
              <Person></Person>
              <span></span>
            </div>
            <div
              className="topbarIconItem"
              onClick={() => {
                navigate("/messenger");
              }}
            >
              <Chat></Chat>
              <span></span>
            </div>
            <div
              className="topbarIconItem"
              onClick={() => {
                requestNotification();
              }}
            >
              <Notifications></Notifications>
              <span className="topbarIconBadge">{requestCount}</span>
            </div>
          </div>
          <div className="myProfile" onClick={() => toggleDropdown()}>
            <img
              src={
                user.profilepic === "no-photo.jpg"
                  ? defaultPic
                  : `http://localhost:5000/public/${user.profilepic}`
              }
              alt=""
              className="topbarImg"
            ></img>
          </div>
        </div>
      </div>
      {showDropdown && (
        <span className="profile-dropdown" onClick={() => PopupForm()}>
          Edit profile
        </span>
      )}
      {showForm && (
        <FormDialogue open={showForm} setOpen={setShowForm}></FormDialogue>
      )}
      {showNotification && (
        <RequestNotification
          open={showNotification}
          setOpen={setShowNotification}
        ></RequestNotification>
      )}
    </>
  );
};
export default Topbar;
