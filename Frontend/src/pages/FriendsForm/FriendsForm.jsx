import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import axios from "axios";
import "./friendsform.css";
const FriendsForm = ({ open, setOpen, userId }) => {
  const scroll = "paper";
  const [refresh, setRefresh] = useState(false);
  const [friendsData, setFriendsData] = useState([]);
  const defaultPic = "assets/person/default-avatar.jpg";

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/getfriends/${userId}`)
      .then((res) => {
        console.log(res.data.data);
        setFriendsData(res.data.data);
      });
  }, [refresh, userId]);
  const refreshMethod = () => {
    console.log("inside refresh method");
    setRefresh((prevState) => !prevState);
  };
  const unFriend = (userId) => {
    const myId = sessionStorage.getItem("userId");
    axios
      .delete(`http://localhost:5000/api/v1/request/unfriend/${myId}/${userId}`)
      .then(() => {
        refreshMethod();
      });
  };
  const close = () => {
    setOpen(false);
  };
  console.log("friendform", userId);
  return (
    <>
      <Dialog
        open={open}
        onClose={close}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        className="center-dialog"
      >
        <DialogTitle id="scroll-dialog-title">Friends</DialogTitle>
        <DialogContent className="notification-container">
          {friendsData.length === 0 ? (
            <p className="no-friends-message">
              There are no friends in your List
            </p>
          ) : (
            friendsData.map((data) => (
              <div className="friendsContainer">
                <p className="info">
                  <img
                    className="profileImg"
                    src={
                      data.profilepic === "no-photo.jpg"
                        ? defaultPic
                        : data.profilepic
                    }
                    alt=""
                  ></img>
                  <b>{data.name}</b> <br /> <span>14 mutual friends</span>
                </p>
                <div
                  className="button-block"
                  onClick={() => {
                    unFriend(data._id);
                  }}
                >
                  <div className="delete">unfriend</div>
                </div>
              </div>
            ))
          )}
          {/* {friendsData.map((data) => (
          
          ))} */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => close()}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default FriendsForm;
