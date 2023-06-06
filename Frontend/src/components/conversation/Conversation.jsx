import "./conversation.css"
const Conversation = ({name,userId,profilepic}) =>{
	const defaultPic = 'assets/person/default-avatar.jpg'
	return(
		<div className="conversation">
			<img className="conversationImg" src={profilepic=="no-photo.jpg"?defaultPic:profilepic} alt="profile"/>
			<span className="conversationName">{name}</span>
		</div>
	)
}
export default Conversation