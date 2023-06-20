import React, { useState } from "react";
import "./followers.css";
import { Avatar } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";


const Followers = () => {
  const [suggestedUsers, setSuggestedUsers] = useState([
    {
      id: 1,
      name: "Ratan Tata",
      profilePic: "https://www.tatatrusts.org/images/Ratan_N_Tata_sm.jpg",
      username: "ratantata@gmail.com",
      followed: false,
    },
    {
      id: 2,
      name: "Sachin Tendulka",
      profilePic: "https://1.bp.blogspot.com/-fYE3ZHYjp1Q/W4-HJry1-VI/AAAAAAAAft8/vImCT2jMVUkx6el6hTgUAGdUNRNWFJjMQCLcBGAs/s400/Sachin_Tendulkar_at_MRF_Promotion_Event.jpg",
      username: "sachin@gmail.com",
      followed: false,
    },
    {
      id: 3,
      name: "Narendra modi",
      profilePic: "https://www.pmindia.gov.in/wp-content/themes/pmindia2015/images/know-the-pm.jpg",
      username: 'narendramodi@gmail.com',
      followed: false,
    },

    {
      id: 4,
      name: "Amitabh bachchan",
      profilePic: "https://resize.indiatvnews.com/en/resize/newbucket/930_-/2023/04/amitabh-bachchan-2-1682335127.jpg",
      username: "Amitabh@gmail.com",
      followed: false,
    },


    {
      id: 5,
      name: "virat kohli",
      profilePic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYc0adLCo9HOvc4425Lu9AsdPD9nA8-KHv0aIwWpOGPzOfOzLhF0tnsbn5RhAn2yBhGEg&usqp=CAU",
      username: "viratkohli@gmail.com",
      followed: false,
    },
  ]);
  const [showMore, setShowMore] = useState(false);
  const usersToShow = showMore ? suggestedUsers : suggestedUsers.slice(0, 3);

  const handleFollowClick = (id) => {
    setSuggestedUsers((prevState) =>
      prevState.map((user) =>
        user.id === id ? { ...user, followed: !user.followed } : user
      )
    );
  };

  const handleShowMoreClick = () => {
    setShowMore((prevState) => !prevState);
  };

  return (
    <div className="follow_container">
      <h1 className="follow_text">Who to Follow</h1>
      {usersToShow.map((user) => (
        <div key={user.id} className="user-container">
          <Avatar src={user.profilePic} alt={user.name}
          />
          <div className="user-info">
            <h3>{user.name} {" "}
              <VerifiedIcon style={{ color: "#1D9BF0", width: "1.2rem", marginTop: "10px" }} />

            </h3>

            <p>{user.username}</p>

          </div>

          <button className="btn_follow"
            onClick={() => handleFollowClick(user.id)}>
            {user.followed ? "Followed" : "Follow"}
          </button>





        </div>
      ))}
      {suggestedUsers.length > 2 && (
        <a href='#' onClick={handleShowMoreClick}
          className="btn_show">
          {showMore ? "Show Less" : "Show More"}
        </a>
      )}
    </div>
  );
};

export default Followers;