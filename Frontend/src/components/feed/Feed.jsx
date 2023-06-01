import { useEffect, useState } from "react";
import axios from "axios";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
const Feed = ({myPosts, savedPost, userPost}) => {
  const [posts, setPosts] = useState([]);

  useEffect(()=>{
    if(myPosts){
      setPosts(myPosts)
      }
    if(savedPost){
      setPosts(savedPost)
    }
    if(userPost){
      setPosts(userPost)
    }
    else if(!myPosts && !savedPost){
     axios.get('http://localhost:5000/api/v1/posts').then((res)=>{
      setPosts(res.data.data);
     });
    

    }
 },[myPosts,savedPost,userPost]);
 
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share></Share>

		{posts.map((post)=>(<Post key={post.id} post={post} myPosts = {myPosts} setPosts ={setPosts} savedPost = {savedPost}></Post>))}
        
      </div>
    </div>
  );
};
export default Feed;
