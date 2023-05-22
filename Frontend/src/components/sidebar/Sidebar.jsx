import "./sidebar.css"
import {RssFeed, Groups, Bookmark, QuestionAnswer, Chat, PlayCircle, Work, CalendarMonth, School} from "@mui/icons-material"
const Sidebar = () =>{
 return(
	<div className="sidebar">
		<div className="sidebarWrapper">
			<ul className="sidebarList">
				<li className="sidebarListItem">
					<RssFeed className="sidebarIcon"></RssFeed>
					<span className="sidebarListItemText">Feed</span>
				</li>
				<li className="sidebarListItem">
					<Chat className="sidebarIcon"></Chat>
					<span className="sidebarListItemText">Chats</span>
				</li>
				<li className="sidebarListItem">
					<PlayCircle className="sidebarIcon"></PlayCircle>
					<span className="sidebarListItemText">Videos</span>
				</li>
				
				<li className="sidebarListItem">
					<Groups className="sidebarIcon"></Groups>
					<span className="sidebarListItemText">Groups</span>
				</li>
				<li className="sidebarListItem">
					<Bookmark className="sidebarIcon"></Bookmark>
					<span className="sidebarListItemText">Bookmarks</span>
				</li>
				<li className="sidebarListItem">
					<QuestionAnswer className="sidebarIcon"></QuestionAnswer>
					<span className="sidebarListItemText">Questions</span>
				</li>
				<li className="sidebarListItem">
					<Work className="sidebarIcon"></Work>
					<span className="sidebarListItemText">Jobs</span>
				</li>
				<li className="sidebarListItem">
					<CalendarMonth className="sidebarIcon"></CalendarMonth>
					<span className="sidebarListItemText">Events</span>
				</li>
				<li className="sidebarListItem">
					<School className="sidebarIcon"></School>
					<span className="sidebarListItemText">Courses</span>
				</li>
			</ul>
			<button className="sidebarButton">Show More</button>
			<hr className="sidebarHr"></hr>
			<ul className="sidebarFriendList">
				<li className="sidebarFriend" >
					<img className="sidebarFriendImg" src="/assets/person/2.jpg" alt="" ></img>
					<span className="sidebarFriend">Jane Doe</span>
				</li>
				<li className="sidebarFriend" >
					<img className="sidebarFriendImg" src="/assets/person/2.jpg" alt="" ></img>
					<span className="sidebarFriend">Jane Doe</span>
				</li>
				<li className="sidebarFriend" >
					<img className="sidebarFriendImg" src="/assets/person/2.jpg" alt="" ></img>
					<span className="sidebarFriend">Jane Doe</span>
				</li>
				<li className="sidebarFriend" >
					<img className="sidebarFriendImg" src="/assets/person/2.jpg" alt="" ></img>
					<span className="sidebarFriend">Jane Doe</span>
				</li>
				<li className="sidebarFriend" >
					<img className="sidebarFriendImg" src="/assets/person/2.jpg" alt="" ></img>
					<span className="sidebarFriend">Jane Doe</span>
				</li>
				<li className="sidebarFriend" >
					<img className="sidebarFriendImg" src="/assets/person/2.jpg" alt="" ></img>
					<span className="sidebarFriend">Jane Doe</span>
				</li>
				<li className="sidebarFriend" >
					<img className="sidebarFriendImg" src="/assets/person/2.jpg" alt="" ></img>
					<span className="sidebarFriend">Jane Doe</span>
				</li>
				<li className="sidebarFriend" >
					<img className="sidebarFriendImg" src="/assets/person/2.jpg" alt="" ></img>
					<span className="sidebarFriend">Jane Doe</span>
				</li>
				<li className="sidebarFriend" >
					<img className="sidebarFriendImg" src="/assets/person/2.jpg" alt="" ></img>
					<span className="sidebarFriend">Jane Doe</span>
				</li>
				<li className="sidebarFriend" >
					<img className="sidebarFriendImg" src="/assets/person/2.jpg" alt="" ></img>
					<span className="sidebarFriend">Jane Doe</span>
				</li>
				<li className="sidebarFriend" >
					<img className="sidebarFriendImg" src="/assets/person/2.jpg" alt="" ></img>
					<span className="sidebarFriend">Jane Doe</span>
				</li>
				<li className="sidebarFriend" >
					<img className="sidebarFriendImg" src="/assets/person/2.jpg" alt="" ></img>
					<span className="sidebarFriend">Jane Doe</span>
				</li>
				<li className="sidebarFriend" >
					<img className="sidebarFriendImg" src="/assets/person/2.jpg" alt="" ></img>
					<span className="sidebarFriend">Jane Doe</span>
				</li>
				<li className="sidebarFriend" >
					<img className="sidebarFriendImg" src="/assets/person/2.jpg" alt="" ></img>
					<span className="sidebarFriend">Jane Doe</span>
				</li>
				
			</ul>
		</div>
	</div>
 )
}
export default Sidebar;