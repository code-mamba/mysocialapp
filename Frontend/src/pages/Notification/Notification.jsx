import { RxCross2, RxInfoCircled } from "react-icons/rx"
import "./notification.css"
const Notification = ({type, title, description}) =>{
  return(
	<div className={`notification notification__${type}`}>
		<div className={`notification__left`}>
			<RxInfoCircled className={`notification__icon__${type}`}></RxInfoCircled>
		</div>
		<div className="notification__content">
			<div className={`notification__title notification__title__${type}`}>{title}</div>
			<div className={`notification__description notification__description__${type}`}>{description}</div>
		</div>
		<RxCross2 className={`notification__icon__${type}`}></RxCross2>
	</div>
  )
}
export default Notification