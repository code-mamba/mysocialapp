import axios from "axios";
import jwtDecode from "jwt-decode";
const API_BASE_URL = process.env.REACT_APP_API_URL

export const loginUser = async (userEmail,userPassword) =>{
	const user = {
		userEmail,
		userPassword
	}
	return await axios.post(`${API_BASE_URL}auth/login`,user)
	.then((res)=>{
		if(res.data.success===true){
			const token = res.data.token
			const decoded = jwtDecode(token)
			sessionStorage.setItem("userId",decoded.id)
			return true
		}
		else{
			return false
		}
	})
	.catch((error)=>{
		throw new Error(error.response.data.error)
	})
}