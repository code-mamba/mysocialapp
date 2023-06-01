import "./sharephoto.css";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
const SharePhoto = ({
  showPopup,
  open,
  title,
  userName,
  userId,
  caption,
  onClose,
  setCaption,
}) => {
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    console.log("handleSubmit");
    e.preventDefault();
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("userName", userName);
    formData.append("caption", caption);
    formData.append("file", file);
    axios
      .post("http://localhost:5000/api/v1/posts", formData)
      .then(()=>{
        axios.get(`http://localhost:5000/api/v1/posts${userId}`)
      }).then((res)=>{
        window.location.reload()
        onClose()
        
      })
      // .then((response) => {
      //   console.log("successfully uploaded");

      //   console.log(response);
      //   setCaption("");
      //   onClose();
      // })
      .catch((error) => {
        console.log(error);
      });
  };
  const saveChanges = (e) =>{
     e.preventDefault()
     const formDate = new FormData()
  }
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  return (
    <form className="formContainer">
      <Dialog open={open} onClose={onClose}>
        <DialogTitle></DialogTitle>
        <DialogContent>
          {title}
            <input
              className="captionInput"
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Add a caption"
            />
            <input
              className="chooseFile"
              type="file"
              onChange={handleFileChange}
            ></input>
          {caption}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Submit</Button>
          <Button onClick={onClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};

export default SharePhoto;
