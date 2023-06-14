import "./commentbox.css";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

const CommentBox = ({open, setOpen, postuserId, postId}) => {

  const myId = sessionStorage.getItem("userId")
  const[allComments,setAllComments] = useState([])
  const[comment, setComment] = useState("")
  const [refresh, setRefresh] = useState(false)
  useEffect(()=>{
	axios.get(`http://localhost:5000/api/v1/comments/${postId}`).then((res)=>{
    console.log(res)
    setAllComments(res.data.getComments)
	})
  },[refresh])

  const handleClose = () => {
    setOpen(false);
  };


  const refreshMethod = ()=>{
    
		setRefresh((prevState)=>!prevState)
    
  }

  const handleCommentSubmit = () =>{
	const data = {senderId:myId,comment,postId,postuserId}
		axios.post('http://localhost:5000/api/v1/comments',data).then((res)=>{
			console.log(res.data);
			refreshMethod();
      setComment("")
      

		}).catch((err)=>{
			console.log(err)
		})

  }
  return (
    <>
	<Dialog open={open} onClose={handleClose}>
		<DialogTitle>Comments</DialogTitle>
		<DialogContent className="DialogBox" >
		<div class="comment-section">
        <h2>Comments</h2>
        {allComments.map((comment)=>(
              <div className="comment-list">
              <div className="comment">
                <div className="comment-avatar">
                  <img src={`http://localhost:5000/public/${comment.commentedUserData[0]['profilepic']}`} alt=""></img>
                </div>
                <div className="comment-content">
                  <div className="comment-author">{comment.commentedUserData[0]['name']}</div>
                  <div className="comment-text">{comment.comment}</div>
                </div>
              </div>
            </div>
        ))}
    
		
        <div className="comment-form">
          <input type="text" placeholder="Write a comment" value={comment} onChange={(e)=>{setComment(e.target.value)}} />
          <button onClick={()=>{handleCommentSubmit()}}>Comment</button>
        </div>
      </div>
		</DialogContent>
	</Dialog>
    </>
  );
};
export default CommentBox;
