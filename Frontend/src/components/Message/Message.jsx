import './message.css'
const Message = ({own}) =>{
	return(
		<div className={own? "message own" :"message"}>
			<div className="messageTop">
				<img  className="messageImg" src="/assets/person/3.jpg" alt=""></img>
				<p className="messageText">Lorem ipsum dolor sit amet consectetur adipisicing elit.on.</p>
			</div>
			<div className="messageBottom">1 hour ago</div>

		</div>
	)
}
export default Message