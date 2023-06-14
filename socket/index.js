const axios = require("axios")
const io = require("socket.io")(8900,{
	cors:{
		origin:"http://localhost:3000"
	}
})
const mongoose = require("mongoose")
const Post = require("../Backend/models/Post")

mongoose.connect("mongodb://localhost:27017/myFb_db",{
	useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{console.log("connected to mongodb")})
.catch((error)=>{console.error("failed to connect Mongodb",error)})

let users = [];
const addUser = (userId,socketId) =>{
	!users.some(user=>user.userId === userId) &&
	users.push({userId,socketId})
}
const removeUser = (socketId)=>{
	users = users.filter((user)=>user.socketId !== socketId)
}

const getUser = (myId)=>{
	return users.find(user=>user.userId===myId)
}

io.on("connection", (socket)=>{
	// when connect
	console.log("a user connected")
	io.emit("welcome","hello this is socket server!")
	// take userId and socketId from user
	socket.on("addUser",userId=>{
		addUser(userId,socket.id)
		io.emit("getUsers",users)
	})
// send and get message 
socket.on("sendMessage",({senderId, receiverId, text})=>{
	const user = getUser(receiverId)
	io.to(user.socketId).emit("getMessage",{
		senderId,
		text
	})

})
socket.on("sendComment",async({senderId, comment, postId,postuserId})=>{
	console.log(senderId,comment,postId,postuserId)
	const data={senderId,comment,postId,postuserId}
	try{
		const response = await axios.post('http://localhost:5000/api/v1/comments',data)
		console.log(response.data)
	}
	catch(err){
		console.log(err)
	}
	// try {
	// 	const post = await Post.findById(postId);
	// 	if (post) {
	// 	  post.comments.push({
	// 		senderId,
	// 		comment,
	// 		postUserId: postuserId,
	// 	  });
	// 	  await post.save();
	// 	  console.log("Comment saved successfully.");
	// 	}
	//   } catch (error) {
	// 	console.error("Failed to save comment:", error);
	//   }

})

	// when disconnect
	socket.on("disconnect",()=>{
		console.log("user disconnected")
		removeUser(socket.id)
		io.emit("getUsers",users)


	})

})