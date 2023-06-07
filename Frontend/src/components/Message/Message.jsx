import './message.css'
import {format} from 'timeago.js'
const Message = ({message,own}) =>{
	return(
		<div className={own? "message own" :"message"}>
			<div className="messageTop">
				<img  className="messageImg" src="/assets/person/3.jpg" alt=""></img>
				<p className="messageText">{message.text}</p>
			</div>
			<div className="messageBottom">{format(message.createdAt)}</div>

		</div>
	)
}
export default Message