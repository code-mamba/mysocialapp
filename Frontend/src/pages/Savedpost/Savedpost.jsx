import './savedpost.css'
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { useEffect, useState } from 'react';
import axios from 'axios';
const SavedPost = () =>{
	const[savedPost, setSavedPost] = useState([])
 	useEffect(()=>{
		const userId = sessionStorage.getItem('userId')
		axios.get(`http://localhost:5000/api/v1/saved/${userId}`).then((res)=>{
			setSavedPost(res.data.data)
		})
	},[])
	return(
		<>
		<Topbar></Topbar>
		<div className="homeContainer">
		<Sidebar></Sidebar>
		<Feed savedPost = {savedPost} ></Feed>
		<Rightbar></Rightbar>
		</div>
		
		</>
	)
}
export default SavedPost