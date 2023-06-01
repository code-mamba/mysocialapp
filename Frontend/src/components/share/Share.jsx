import "./share.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { PermMedia, Label, Room, EmojiEmotions } from "@mui/icons-material";
import SharePhoto from "./sharePhoto/SharePhoto";

const Share = () => {
  const [user, setUser] = useState([]);
  const [isSharePost, setisSharePost] = useState(false);
  const [caption, setCaption] = useState("")
  const defaultProfile = '/assets/person/default-avatar.jpg'
  useEffect(() => {
	console.log("beforclick",isSharePost)
    const userId = sessionStorage.getItem("userId");
    axios
      .get(`http://localhost:5000/api/v1/auth/me/${userId}`)
      .then((res) => {
        setUser(res.data.data);
        console.log("userstate", user);
        console.log("share", res);
      })
      .catch((err) => {
        console.log("share catch", err);
      });
  }, []);
  const formControl = () => {
	
    if (isSharePost === false) {
      setisSharePost(true);
      console.log(isSharePost);
    } else if (isSharePost === true) {
      setisSharePost(false);
      console.log(isSharePost);
    }
  };
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={user.profilepic === 'no-photo.jpg'?defaultProfile:user.profilepic}
            alt=""
          ></img>
          <input
            type="text"
            className="shareInput"
            placeholder={`What's in your mind ${user.name}?`}
            onChange={(e)=>setCaption(e.target.value)}
          ></input>
        </div>
        <hr className="shareHr"></hr>
        <div className="shareBottom">
          <div className="shareOptions">
            <div
              className="shareOption"
              onClick={(e) => {
                formControl();
              }}
            >
              <PermMedia htmlColor="tomato" className="shareIcon"></PermMedia>
              <span className="shareOptionText">Photo or Video</span>
            </div>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon"></Label>
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon"></Room>
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions
                htmlColor="goldenrod"
                className="shareIcon"
              ></EmojiEmotions>
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton">Share</button>
        </div>
		{isSharePost && <SharePhoto open={isSharePost}
          title="share something"
          caption={caption}
          setCaption = {setCaption}
          userId={user._id}
          userName={user.name}
          onClose={formControl}></SharePhoto>}
      </div>
	  
    </div>
  );
};
export default Share;
