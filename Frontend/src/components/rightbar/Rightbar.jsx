import "./rightbar.css";
const Rightbar = ({ profile }) => {

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="/assets/gift.png" alt=""></img>
          <span className="birthdayText">
            <b>Madee</b> and <b>3 other friends</b> have a birthday today
          </span>
        </div>
        <img className="rightbarAd" src="/assets/ad.jpg" alt=""></img>
        <h4 className="rightbarTitle">Online Friends</h4>
        <h4 className="rightbarFriendList">
          <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
              <img
                className="rightbarProfileImg"
                src="assets/person/3.jpg"
                alt=""
              ></img>
              <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">John Carter</span>
          </li>
        </h4>
      </>
    );
  };
  const ProfileRightbar = () =>{
	return(
		<>
		<h4 className="rightbarTitle" >User information </h4>
		<div className="rightbarInfo">
			<div className="rightbarInfoItem">
				<span className="rightbarInfoKey">City:</span>
				<span className="rightbarInfoValue">New York</span>
			</div>
			<div className="rightbarInfoItem">
				<span className="rightbarInfoKey">From:</span>
				<span className="rightbarInfoValue">Madrid</span>
			</div>
			<div className="rightbarInfoItem">
				<span className="rightbarInfoKey">Relationship:</span>
				<span className="rightbarInfoValue">single</span>
			</div>
			<h4 className="rightbarTitle">User friends</h4>
			<div className="rightbarFollowings">
				<div className="rightbarFollowing">
					<img src="assets/person/2.jpg" alt="" className="rightbarFollowingImg" />
					<span className="rightbarFollowingName">John Carter</span>
				</div>
				<div className="rightbarFollowing">
					<img src="assets/person/3.jpg" alt="" className="rightbarFollowingImg" />
					<span className="rightbarFollowingName">John Carter</span>
				</div>
				<div className="rightbarFollowing">
					<img src="assets/person/4.jpg" alt="" className="rightbarFollowingImg" />
					<span className="rightbarFollowingName">John Carter</span>
				</div>
				<div className="rightbarFollowing">
					<img src="assets/person/5.jpg" alt="" className="rightbarFollowingImg" />
					<span className="rightbarFollowingName">John Carter</span>
				</div>
				<div className="rightbarFollowing">
					<img src="assets/person/6.jpg" alt="" className="rightbarFollowingImg" />
					<span className="rightbarFollowingName">John Carter</span>
				</div>
				<div className="rightbarFollowing">
					<img src="assets/person/6.jpg" alt="" className="rightbarFollowingImg" />
					<span className="rightbarFollowingName">John Carter</span>
				</div>
			</div>
		</div>
		</>
	)
  }
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
		{!profile&&<HomeRightbar></HomeRightbar>}
		<ProfileRightbar></ProfileRightbar>
	  </div>
    </div>
  );
};
export default Rightbar;
