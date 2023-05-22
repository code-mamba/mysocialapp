import { useEffect, useState } from "react";
import axios from "axios";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
const Feed = () => {
  const [posts, setPosts] = useState([]);
  
  useEffect(()=>{
	axios.get('http://localhost:5000/api/v1/posts').then((res)=>{
		console.log(res)
    setPosts(res.data.data)
    // console.log(posts)
	})
  },[])
 
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share></Share>

		{posts.map((post)=>(<Post key={post.id} post={post}></Post>))}
        <Post></Post>
      </div>
    </div>
  );
};
export default Feed;
