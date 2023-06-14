import Topbar from "../../components/topbar/Topbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Feed from "../../components/feed/Feed"
import { useEffect, useState } from "react"
import Rightbar from "../../components/rightbar/Rightbar"
import axios from "axios"
const Videos = () =>{
	const[videos, setVideos] = useState([])
	useEffect(()=>{
		axios.get(`http://localhost:5000/api/v1/videos`)
		.then((res)=>{
			console.log(res.data.data)
			setVideos(res.data.data)
		})
	},[])
	return(
		<>
		<Topbar></Topbar>
		<div className="homeContainer">
		<Sidebar></Sidebar>
		<Feed videos={videos}></Feed>
		<Rightbar></Rightbar>
		</div>
		</>
	)
}
export default Videos