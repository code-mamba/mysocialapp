import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import axios from "axios";
import "./friendsform.css";
const FriendsForm = ({ open, setOpen, userId, userProfile }) => {
  const scroll = "paper";
  const [refresh, setRefresh] = useState(null);
  const[request,setRequest] = useState(null)
  const [friendsData, setFriendsData] = useState([]);
  const defaultPic = "/assets/person/default-avatar.jpg";



  
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/getfriends/${userId}`)
      .then((res) => {
        console.log(res.data.data);
        setFriendsData(res.data.data);
      });
  }, [refresh, userId]);
  const refreshMethod = () => {
    setRefresh((prevState) => !prevState);
  };
    const addFriend = (myId,userId) => {
    console.log(myId,userId)
    axios
      .post(`http://localhost:5000/api/v1/request/`, { userId, myId })
      .then((res) => {
          refreshMethod()

      })
      .catch((err) => {
        console.log(err);
      });
  };
  const unFriend = (userId) => {
    const myId = sessionStorage.getItem("userId");
    axios
      .delete(`http://localhost:5000/api/v1/request/unfriend/${myId}/${userId}`)
      .then(() => {
        refreshMethod();
      });
  };
  const cancelRequest = (myId,userId) =>{
    axios.delete(`http://localhost:5000/api/v1/request/${myId}/${userId}`).then(()=>{
      refreshMethod()
    }).catch((err)=>{console.log(err)})

  }
  const close = () => {
    setOpen(false);
  };

  const renderButton = (data) =>{
    const myId = sessionStorage.getItem("userId")
    if(data.friends.includes(myId)){
      return(
        <div className="button-block" onClick={() => unFriend(data._id)}>
          <div className="delete">Unfriend</div>
        </div>
      )
    }
    else if(data.pendingrequest.includes(myId)){
      return(
        <div>
          <div className="cancelRequest" onClick={()=>{cancelRequest(myId,data._id)}}>cancel request</div>
        </div>
      )
    }
    else{
      return(
        <div className="button-block" onClick={()=>{addFriend(myId,data._id)}}>
        <div className="add">Add Friend</div>
      </div>
      )
    }
  }
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
                        : `http://localhost:5000/public/${data.profilepic}`
                    }
                    alt=""
                  ></img>
                  <b>{data.name}</b> <br /> 
                </p>
                {renderButton(data)}
     
              </div>
            ))
          )}

        </DialogContent>
        <DialogActions>
          <Button onClick={() => close()}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default FriendsForm;
