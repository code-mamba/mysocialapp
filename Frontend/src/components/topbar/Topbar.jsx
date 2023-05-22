import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
const Topbar = () => {
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">MyFB</span>
      </div>
      <div className="topbarRight">
        <div className="searchbar">
          <Search className="searchIcon"></Search>
          <input
            placeholder="Search for friend, post or videos"
            className="searchInput"
          ></input>
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarlinks">
          <span className="topbarlink">Homepage</span>
          <span className="topbarlink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person></Person>
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat></Chat>
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications></Notifications>
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
		<img src="/assets/person/2.jpg" alt="" className="topbarImg"></img>
      </div>
    </div>
  );
};
export default Topbar;
