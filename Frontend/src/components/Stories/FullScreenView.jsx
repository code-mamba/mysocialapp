import axios from "axios";
import { useEffect, useState } from "react";
import { format } from "timeago.js";

const FullScreenView = ({ setFullView, senderId, author }) => {
  const [userStory, setUserStory] = useState([]);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/stories/${senderId}`)
      .then((res) => {
        console.log(res.data.data[0].story);
        setUserStory(res.data.data[0].story)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(()=>{
    const timer = setTimeout(()=>{
      if(currentStoryIndex<userStory.length-1){
        setCurrentStoryIndex(currentStoryIndex+1)
      }
    },5000)
  })

  const currentStory = userStory[currentStoryIndex]

  const showNextStory = () =>{
    if(currentStoryIndex<userStory.length -1){
      setCurrentStoryIndex(currentStoryIndex+1)
    }
  }

  const showPreviousStory = () =>{
    if(currentStoryIndex > 0){
      setCurrentStoryIndex(currentStoryIndex-1)
    }
  }
  console.log("currentStory",currentStory)
  if(!currentStory){
    return null
  }
  return (
    <div className="stories-full-view">
      <div className="close-btn" onClick={() => setFullView(false)}>
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
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      <div className="content">
        <div className="previous-btn" onClick={showPreviousStory}>
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
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </div>
        <div className="story">
            {currentStory.story.includes("mp4")?(<video className="postVideo" autoPlay>
              <source
                src={`http://localhost:5000/public/${currentStory.story}`}
                type="video/mp4"
              />
            </video>):(<img src={`http://localhost:5000/public/${currentStory.story}`} alt=""></img>)}
          
          <div className="author">{author} {format(currentStory.date)}</div>
        </div>
        <div className="next-btn" onClick={showNextStory}>
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
        <div className="caption">
          {currentStory.caption}
        </div>
      </div>
    </div>
  );
};
export default FullScreenView;
