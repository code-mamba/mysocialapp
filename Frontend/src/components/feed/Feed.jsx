import { useEffect, useState } from "react";
import axios from "axios";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import Stories from "../Stories/Stories";
const Feed = ({ myPosts, savedPost, userPost, friendsPost, videos }) => {
  const [posts, setPosts] = useState([]);
  const[myId, setMyId] = useState(null)



  useEffect(() => {
    const myId = sessionStorage.getItem("userId")
    setMyId(myId)
    if (myPosts) {
      setPosts(myPosts);
    }
    if (savedPost) {
      setPosts(savedPost);
    }
    if (userPost) {
      setPosts(userPost);
    }
    if (friendsPost) {
      setPosts(friendsPost);
    }
    if (videos) {
      setPosts(videos);
    } else if (!myPosts && !savedPost && !friendsPost && !userPost) {
      axios.get("http://localhost:5000/api/v1/posts").then((res) => {
        setPosts(res.data.data);
      });
    }
  }, [myPosts, savedPost, userPost, friendsPost, videos]);

  return (
    <>
    
    <div className="feed">
      <div className="feedWrapper">
      <Stories myId={myId}></Stories>
        {myPosts && <Share></Share>}
        {posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            myPosts={myPosts}
            setPosts={setPosts}
            savedPost={savedPost}
          ></Post>
        ))}
      </div>
    </div>
    </>
  );
};
export default Feed;
