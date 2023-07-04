import axios from "axios";
import { useEffect, useState } from "react";
import FullScreenView from "./FullScreenView";
import ShareStory from "./ShareStory/ShareStory";
import "./stories.css";
const Stories = () => {
  const [FullView, setFullView] = useState(false);
  const [isShareStory, setisShareStory] = useState(false);
  const userId = sessionStorage.getItem("userId")
  const [user,setUser] = useState([])
  const [senderId, setSenderId] = useState("")
  const[usersStories, setUserStories] = useState([])
  const[author, setAuthor] = useState("")
  const [refresh, setRefresh] = useState(false)
  const defaultPic = "assets/person/default-avatar.jpg";
  useEffect(()=>{
    axios
      .get(`http://localhost:5000/api/v1/auth/me/${userId}`)
      .then((res) => {
        setUser(res.data.data);
        axios.get('http://localhost:5000/api/v1/stories').then((res)=>{
          console.log(res.data.userStories)
          setUserStories(res.data.userStories)
          
        })
  
      })
  },[refresh])
  console.log(usersStories)
  return (
    <>
    
      <div className="stories-container">
        <div className="content">
          <div className="previous-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </div>
          <div className="stories">
            {user&&(<div
              className="createStory"
              onClick={() => {
                setisShareStory(true);
              }}
            >
              <img src={ user.profilepic === "no-photo.jpg"
				  ? defaultPic
				  : `http://localhost:5000/public/${user.profilepic}`} alt=""></img>
              <div className="create-btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </div>
            </div>)}
            {usersStories&&usersStories.map((story)=>(
                <div className="story" onClick={() => {setSenderId(story.senderId);setAuthor(story.user_status[0].name);setFullView(true)}}>
                <img src={story.user_status[0].profilepic==="no-photo.jpg"? defaultPic : `http://localhost:5000/public/${story.user_status[0].profilepic}`} alt=""></img>
                <div className="author">{story.user_status[0].name}</div>
              </div>
            ))}
          
            {/* <div className="story">
              <img src="assets/person/2.jpg" alt=""></img>
              <div className="author">author</div>
            </div>
            <div className="story">
              <img src="assets/person/2.jpg" alt=""></img>
              <div className="author">author</div>
            </div>
            <div className="story">
              <img src="assets/person/2.jpg" alt=""></img>
              <div className="author">author</div>
            </div>
            <div className="story">
              <img src="assets/person/2.jpg" alt=""></img>
              <div className="author">author</div>
            </div>
            <div className="story">
              <img src="assets/person/2.jpg" alt=""></img>
              <div className="author">author</div>
            </div>
            <div className="story">
              <img src="assets/person/2.jpg" alt=""></img>
              <div className="author">author</div>
            </div>
            <div className="story">
              <img src="assets/person/2.jpg" alt=""></img>
              <div className="author">author</div>
            </div>
            <div className="story">
              <img src="assets/person/2.jpg" alt=""></img>
              <div className="author">author</div>
            </div> */}
          </div>
          <div className="next-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
        </div>
        {FullView && (
          <FullScreenView setFullView={setFullView} senderId={senderId} author={author}></FullScreenView>
        )}
        {isShareStory && (
          <ShareStory
            title={"share story"}
            open={isShareStory}
            onClose={setisShareStory}
            refresh={refresh}
            setRefresh={setRefresh}
          ></ShareStory>
        )}
      </div>

      {/* <div className="stories-container">
        <div className="content">
          <div className="previous-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </div>
			<div className="stories">
				<img src="assets/person/2.jpg" alt=""></img>
				<div className="author">Author</div>
			</div>
			<div className="stories">
				<img src="assets/person/2.jpg" alt=""></img>
				<div className="author">Author</div>
			</div>
			<div className="stories">
				<img src="assets/person/2.jpg" alt=""></img>
				<div className="author">Author</div>
			</div>

          <div className="next-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
        </div>
      </div> */}
    </>
  );
};
export default Stories;
