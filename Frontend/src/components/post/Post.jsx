import "./post.css";
import { MoreHoriz, FavoriteBorder } from "@mui/icons-material";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { format } from "timeago.js";
import CommentBox from "../../pages/CommentBox/CommentBox";
import AlertBox from "../../pages/AlertBox/AlertBox";
import { Snackbar } from "@mui/material";

const Post = ({ post, myPosts, setPosts, savedPost }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [open, setOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(null);
  const [like, setLike] = useState(post.likedby.length);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const[openSnackbar, setOpenSnackbar] = useState(false)
  const [message,setMessage] = useState('')

  const navigate = useNavigate();
  const toggleDropdown = () => {
    setShowDropdown((prevState) => !prevState);
  };
  const myId = sessionStorage.getItem("userId");

  /* this useEffect calls an api it returns a response whether the current user already liked the particular post, 
   it returns whether the current user's id is present in post's likedby array so that's why I'm sending the current user id
   and post's id. if the data is there means I'm setting isliked(true) else false
  */
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/likes/${post._id}/${myId}`)
      .then((res) => {
        res.data.isLiked.length === 0 ? setIsLiked(false) : setIsLiked(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  /*this `likehandler` method triggers when the user clicks the like icon it will set the `like` state to increment by 1 when the isliked is false.
 else setlike to decrement by 1 when the isliked is true and then change the state of isLiked to opposite boolean and it will calls the api according to the boolean*/
  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
    if (isLiked === true) {
      axios
        .post("http://localhost:5000/api/v1/likes", {
          postId: post._id,
          userId: myId,
        })
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
    } else if (isLiked === false) {
      axios
        .post(`http://localhost:5000/api/v1/likes/${post._id}/${myId}`)
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
    }
  };

  /*this `handleSave` method is used to add current user'id into the post's savedby array  */
  const handleSave = async () => {
    setOpenSnackbar(false)
    const postId = post._id;
    await axios
      .post(`http://localhost:5000/api/v1/saved/${myId}`, { postId })
      .then((res) => {
        console.log("before save", openSnackbar)
        setOpenSnackbar(true)
        console.log("after setOpenSnackbar", openSnackbar);
        setMessage("saved successfully")
        console.log("after setMessage", openSnackbar);
        
        
      })
      .catch((err) => {
        setOpenSnackbar(true)
        setMessage("unable to save")
        
      });
  };

  /*This `handleDeletePost` method is used to delete the current user's post,
  so it first checks the id of current user's id and post's userid if the both id is equal means 
  this function allows us to delete the particular post
  */
  const handleDeletePost = async () => {
    setOpenSnackbar(false)
    if (post.userId === myId) {
      try {
        await axios
          .delete(`http://localhost:5000/api/v1/posts/${post._id}`)

          .then(() => {
            axios
              .get(`http://localhost:5000/api/v1/posts/${myId}`)
              .then((res) => {
                setPosts(res.data.data);
                setIsDeleteAlertOpen(!isDeleteAlertOpen)
                setOpenSnackbar(true)
                setMessage("Post Deleted Successfully")
                console.log("openSnackbar",openSnackbar)
               
              });
          });
      } catch (error) {
        console.log(error);
        setOpenSnackbar(true)
        setMessage("Error deleting post.")
      }
    }
  };
  const unSave = async () => {
    
    const userId = sessionStorage.getItem("userId");
    const postId = post._id;
    try {
      axios
        .post("http://localhost:5000/api/v1/saved/", { userId, postId })
        .then(() => {
          console.log("before unsave",openSnackbar)
          axios
            .get(`http://localhost:5000/api/v1/saved/${userId}`)
            .then((res) => {
              setOpenSnackbar(true);
              setPosts(res.data.data);
              setMessage("post unsaved")
              console.log("after un save openSnackbar",openSnackbar)
              setOpenSnackbar(false)
            });
        }).catch((error)=>{
      setOpenSnackbar(true)
          setMessage("something went wrong")
        });
    } catch (error) {
      setOpenSnackbar(true)
      setMessage("something went wrong")
    }
  };
  const navigateToUserProfile = () => {
    const myId = sessionStorage.getItem("userId");
    if (post.userId === myId) {
      navigate("/myprofile");
    } else {
      navigate(`/userprofile/${post.userId}`);
    }
  };
  if (!post) {
    return null;
  }

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft" onClick={() => navigateToUserProfile()}>
            <img
              className="postProfileImg"
              src="/assets/person/1.jpg"
              alt=""
            ></img>
            <span className="postUsername">{post.userName}</span>
            <span className="postDate">{format(post.date)}</span>
          </div>
          <div className="postTopRight">
            <div className="option" onClick={toggleDropdown}>
              <MoreHoriz id="icon"></MoreHoriz>
              {myPosts && showDropdown && (
                <div className="dropdown">
                  <ul>
                    <li onClick={()=>setIsDeleteAlertOpen(!isDeleteAlertOpen)}>Delete</li>
                  </ul>
                </div>
              )}
              {savedPost && showDropdown && (
                <div className="dropdown">
                  <ul>
                    <li onClick={unSave}>Unsave</li>
                  </ul>
                </div>
              )}
              {!myPosts && !savedPost && showDropdown && (
                <div className="dropdown">
                  <ul>
                    <li onClick={handleSave}>save</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.caption}</span>
          {post.photo.includes("mp4") ? (
            <video className="postVideo" controls>
              <source
                src={`http://localhost:5000/public/${post.photo}`}
                type="video/mp4"
              />
            </video>
          ) : (
            <img
              className="postImg"
              src={`http://localhost:5000/public/${post.photo}`}
              alt=""
            ></img>
          )}
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            {isLiked ? (
              <FavoriteBorder
                sx={{ color: "red" }}
                onClick={likeHandler}
              ></FavoriteBorder>
            ) : (
              <FavoriteBorder onClick={likeHandler}></FavoriteBorder>
            )}
            <span className="postlikeCounter"> {like} people liked</span>
          </div>
          <div
            className="postBottomRight"
            onClick={() => {
              setOpen(true);
            }}
          >
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
      {open && (
        <CommentBox
          open={open}
          setOpen={setOpen}
          postuserId={post.userId}
          postId={post._id}
        ></CommentBox>
      )}
      {isDeleteAlertOpen && (
        <AlertBox
        
          isDeleteAlertOpen={isDeleteAlertOpen}
          setIsDeleteAlertOpen={setIsDeleteAlertOpen}
          handleDeletePost={handleDeletePost}
        />
      )}
       <Snackbar open={openSnackbar} autoHideDuration={1000}
        onClose={()=>setOpenSnackbar(false)}
        anchorOrigin={{vertical:'bottom',horizontal:'center'}}
        message={<span>{message}</span>}
        ></Snackbar>
        
    </div>
  );
};
export default Post;
