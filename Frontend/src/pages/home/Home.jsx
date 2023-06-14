import React, { useEffect } from "react";
import "./home.css"
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
const Home =()=>{
return(
		<>
		<Topbar></Topbar>
		<div className="homeContainer">
		<Sidebar></Sidebar>
		<Feed></Feed>
		<Rightbar></Rightbar>
		</div>
		
		</>
	)
}
export default Home;