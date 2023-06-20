import React, { useContext, useRef, useState } from 'react';
import { FaGlobe, FaImage } from "react-icons/fa";
import { RiFileGifFill } from "react-icons/ri";
import { BsEmojiSmile } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { RxCross1 } from "react-icons/rx";
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import EmojiPicker from "emoji-picker-react";
import { nanoid } from 'nanoid'
import { AuthContext } from '../../context/AuthContextProvider';
import "./tweetbox.css";



const Icons = [
  { id: 0, icon: <FaImage />, action: "pickImage", title: "Media" },
  { id: 1, icon: <RiFileGifFill />, action: "pickImage", title: "GIF" },
  { id: 2, icon: <BsEmojiSmile />, action: "pickImage", title: "Emoji" },
  { id: 3, icon: <SlCalender />, action: "pickImage", title: "Schedule" },
  { id: 4, icon: <MdLocationOn />, action: "pickImage", title: "Location" },

];


const TweetBox = () => {
  const [tweet, setTweet] = useState("");
  const inputRef = useRef(null);
  const [image, setImage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState([]);
  const { userData, updateUserData } = useContext(AuthContext)
  const findCurrentUser = userData.find(user=>user.isAuth);

  
  const handelTweetChange = (e) => {
    setTweet(e.target.value)
  }

  

  const handelPostTweet = () => {
  
    const newUserData = {
      "id": nanoid(),
      "content": tweet,
      "image": image,
      "tweetedBy": {
        "id": nanoid(),
        "name": findCurrentUser.userName,
        "userImage": findCurrentUser.AvatarImage,
        "username" : findCurrentUser.username
      },
      "likeCount": Math.floor(Math.random() * 900) + 100 ,
      "commentCount": Math.floor(Math.random() * 900) + 100,
      "reTweetsCount": Math.floor(Math.random() * 900) + 100,
      "isLiked": false,
      "isVarified": false,
      "emoji" : selectedEmoji
    }
    updateUserData(newUserData)

    setTweet("")
    setImage("")
    setSelectedEmoji([])
  }


  const handelIconClick = (title) => {
    if (title === "Media") {
      inputRef.current.click();
    } else if (title === "Emoji") {
      setShowEmojiPicker(!showEmojiPicker);
    }

  }


  // Function to pick image
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const selectedImage = reader.result
      setImage(selectedImage);
    }
  }
  console.log("image", image)

  const handleEmojiClick = (event) => {
    setSelectedEmoji([...selectedEmoji, event.emoji]);
  };

  const isDisabled = tweet.trim() === "" && image.trim() === "" && selectedEmoji.length < 1;



  return (
    <div className='tweetBox' >
      <form >
        <div>
          <div className="twwetBox__input">
            <Avatar src={findCurrentUser.AvatarImage} />
            <textarea name='tweetMessage' rows={3} value={tweet} onChange={handelTweetChange} type="text" placeholder="what's happening?"></textarea>
          </div>
          {selectedEmoji && <div className='eoji' onClick={() => setShowEmojiPicker(false)}>{selectedEmoji.map((emoj, i) => (
            <span key={i}>{emoj}</span>
          ))}</div>}
          <div className='globalIcon'>
            <FaGlobe />
            <span>Everyone can reply</span>
          </div>

          <div className='contain__emoji__and__pic'>
            {
              image && <div className='image-container'>
                <img src={image} alt="" onClick={() => setShowEmojiPicker(false)} />
                <div>
                  <RxCross1 className='cancel__btn' onClick={() => setImage("")} />
                </div>
              </div>
            }

            <div className={`${image ? "emojiPicker-t" : "emojiPicker-f"}`}>
              {showEmojiPicker && (
                <EmojiPicker onEmojiClick={handleEmojiClick} disableSearchBar />
              )}
            </div>
          </div>
          <div className='icons-btn-container'>
            <div className='icons'>
              {Icons.map((menu) => ( 
                <div key={menu.id} title={menu.title} onClick={() => handelIconClick(menu.title)}>{menu.icon}</div>
              ))}
            </div>
            <button className={isDisabled ? "tweetBox__tweet__Dis__Btn" : 'tweetBox__tweetBtn'} disabled = {isDisabled} onClick={handelPostTweet}>Tweet</button>
          </div>

        </div>
        <input type="file" hidden name='tweetPic' ref={inputRef} onChange={handleFileInputChange} />
      </form>
    </div>
  )
}

export default TweetBox