import "./post.css";
import { MoreVert } from "@mui/icons-material";
const Post = ({ post }) => {
  console.log(post, "line 4");

  if (!post) {
    return null;
  }
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              className="postProfileImg"
              src="/assets/person/1.jpg"
              alt=""
            ></img>
            <span className="postUsername">Dhanush</span>
            <span className="postDate">{post.date}</span>
          </div>
          <div className="postTopRight">
            <MoreVert></MoreVert>
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.desc}</span>
          <img className="postImg" src={`${post.photo}`} alt=""></img>
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src="/assets/like.png" alt=""></img>
            <img className="likeIcon" src="/assets/images.png" alt=""></img>
            <span className="postlikeCounter">{post.like}</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Post;
