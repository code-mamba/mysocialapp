import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { useEffect, useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import "./requestnotification.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RequestNotification = ({ open, setOpen }) => {
  const [scroll, setScroll] = useState('paper');
  const[pendingRequest,setPendingRequest] = useState([])
  const navigate = useNavigate

const confirm = (userId) =>{
  const myId = sessionStorage.getItem("userId")
  axios.post(`http://localhost:5000/api/v1/request/${userId}`,{myId}).then((res)=>{
    axios.get(`http://localhost:5000/api/v1/request/${myId}`).then((res)=>{
      setPendingRequest(res.data.data)
    })
    console.log(res)
  })
  
}
const ignore = (userId)=>{
  const myId = sessionStorage.getItem("userId")
  axios.delete(`http://localhost:5000/api/v1/request/${userId}/${myId}`).then((res)=>{
    axios.get(`http://localhost:5000/api/v1/request/${myId}`).then((res)=>{
      setPendingRequest(res.data.data)
    })
  })
}
  const handleClose = () => {
    setOpen(false);

  };
  useEffect(()=>{
	const id = sessionStorage.getItem('userId')
	axios.get(`http://localhost:5000/api/v1/request/${id}`).then((res)=>{
		console.log('notification',res.data.data);
		setPendingRequest(res.data.data)
    console.log("pending",pendingRequest)
		
	})
  },[])
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
          scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Friend requests</DialogTitle>
        <DialogContent className="notification-container">
          {pendingRequest.map(request=>(
               <div>
               <p className="info">
                 <b>{request.name}</b> <br /> <span>14 mutual friends</span>
               </p>
               <div className="button-block">
                 <div className="confirm" onClick={()=>{confirm(request._id)}}>Confirm</div>
                 <div className="delete" onClick={()=>{ignore(request._id)}}>Delete Request</div>
               </div>	
             </div>
          ))}
       
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default RequestNotification;
