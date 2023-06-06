import "./sidebar.css"
import {RssFeed, Groups, Bookmark, QuestionAnswer, Chat, PlayCircle, CalendarMonth, School, Home} from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Cookies from 'js-cookie'
const Sidebar = () =>{
	const navigate = useNavigate()

const logout = () =>{
	axios.get("http://localhost:5000/api/v1/auth/logout").then(()=>{
		sessionStorage.clear();
		Cookies.remove('token')
		navigate('/')

	})
}
 return(
	<div className="sidebar">
		<div className="sidebarWrapper">
			<ul className="sidebarList">
				<li className="sidebarListItem" onClick={()=>navigate('/home')}>
					<Home className="sidebarIcon"></Home>
					<span className="sidebarListItemText">Home</span>
				</li>
				<li className="sidebarListItem" onClick={()=>{navigate('/messenger')}}>
					<Chat className="sidebarIcon"></Chat>
					<span className="sidebarListItemText">Chats</span>
				</li>
				<li className="sidebarListItem">
					<PlayCircle className="sidebarIcon"></PlayCircle>
					<span className="sidebarListItemText">Videos</span>
				</li>
				
				<li className="sidebarListItem" onClick={()=>{navigate('/friendspost')}}>
					<Groups className="sidebarIcon"></Groups>
					<span className="sidebarListItemText">Friends post</span>
				</li>
				<li className="sidebarListItem">
					<Bookmark className="sidebarIcon"></Bookmark>
					<span className="sidebarListItemText">Bookmarks</span>
				</li>
				<li className="sidebarListItem">
					<QuestionAnswer className="sidebarIcon"></QuestionAnswer>
					<span className="sidebarListItemText">Questions</span>
				</li>
				<li className="sidebarListItem" onClick={()=>navigate('/savedPost')}>
					<Bookmark className="sidebarIcon"></Bookmark>
					<span className="sidebarListItemText">Saved</span>
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
			<hr className="sidebarHr"></hr>
		
			<button onClick = {()=>logout()} className="sidebarButton">Log Out</button>
		</div>
	</div>
 )
}
export default Sidebar;