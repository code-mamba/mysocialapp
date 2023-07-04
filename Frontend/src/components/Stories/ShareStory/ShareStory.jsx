import { Dialog, DialogTitle, DialogContent,DialogActions,Button } from "@mui/material"
import { useEffect, useState } from "react"
import { EmojiEmotions } from "@mui/icons-material"
import EmojiPicker from "emoji-picker-react"
import axios from "axios"
const ShareStory = ({myId,title,open,onClose,setRefresh,refresh}) =>{
	const[caption, setCaption] = useState("")
	const[showEmojis,setShowEmojis] = useState(false)
	const [file, setFile] = useState(null);
  const userId = sessionStorage.getItem("userId")
	const addEmoji = (e) => {
		console.log(e)
		setCaption((prevCaption)=>prevCaption+e.emoji)
	  };
	  const handleFileChange = (e) => {
		setFile(e.target.files[0]);
	  };
	  const handleSubmit = (e) =>{
		e.preventDefault()
		const formData = new FormData()
    formData.append("senderId",userId);
    formData.append("caption", caption);
    formData.append('file',file)
		axios.post('http://localhost:5000/api/v1/stories',formData).then((res)=>{
      setRefresh(!refresh);
      onClose(false)
    }).catch((err)=>{console.log(err)})
	  }
	
  
	return (
		<>
		<Dialog className="Dialogue" open={open} onClose={onClose}>
        <DialogTitle></DialogTitle>
        <DialogContent>
          {title}
		  <div className="captionInputContainer">
          <input
            className="captionInput"
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Add a caption"
          />
		  <EmojiEmotions className="Emoji" htmlColor="goldenrod" onClick={()=>setShowEmojis(!showEmojis)}></EmojiEmotions>
		  {showEmojis&&(
          <div>
            <EmojiPicker onEmojiClick={(e)=>addEmoji(e)}></EmojiPicker>
          </div>)

          }
		  </div>
          <input
            className="chooseFile"
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
          ></input>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>onClose(false)} color="primary">
            Close
          </Button>
		  <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
	
      </Dialog>
	 
		</>
	)
}
export default ShareStory