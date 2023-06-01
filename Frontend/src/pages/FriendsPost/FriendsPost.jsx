import Topbar from "../../components/topbar/Topbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Feed from "../../components/feed/Feed"
import { useEffect } from "react"
const FriendsPost = () =>{
	useEffect(()=>{
	
	})
	return(
		<>
		<Topbar></Topbar>
		<div className="homeContainer">
		<Sidebar></Sidebar>
		<Feed></Feed>
		</div>
		</>
	)
}
export default FriendsPost