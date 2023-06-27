import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import "./alertbox.css";

const AlertBox = ({ isDeleteAlertOpen, setIsDeleteAlertOpen, handleDeletePost }) => {
  return (
    <Dialog className="alertBox" open={isDeleteAlertOpen} onClose={() => setIsDeleteAlertOpen(false)}>
      <DialogTitle className="alertTitle">Delete Post</DialogTitle>
      <DialogContent className="alertContent">
        <p>Are you sure you want to delete this post?</p>
      </DialogContent>
      <DialogActions className="alertActions">
        <Button className="alertCancel" onClick={() => setIsDeleteAlertOpen(!isDeleteAlertOpen)}>
          Cancel
        </Button>
        <Button className="alertDelete" onClick={() => handleDeletePost()}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertBox;