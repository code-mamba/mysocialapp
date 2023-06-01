import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
const Popup = ({ open,description,onClose,setDescription }) => {
	const handleFileChange = () =>{

	}

  return (
    <form className="popupContainer">
      <Dialog open ={open}>
        <DialogTitle></DialogTitle>
        <DialogContent>
			<h1>Hello</h1>
          <input
            className="DescriptionInput"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></input>
          <input className="chooseFile" type='file' onChange={handleFileChange}></input>
        </DialogContent>
		<DialogActions>
			<Button></Button>
			<Button onClick={onClose}></Button>
		</DialogActions>
      </Dialog>
    </form>
  );
};
export default Popup