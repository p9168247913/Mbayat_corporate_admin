import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContextProvider';
import TweetBox from '../tweetBox/TweetBox';
import Post from '../post/Post';
import "./feed.css";


const Feed = () => {
  const { userData } = useContext(AuthContext);
  const findCurrentUser = userData.find(user => user.isAuth);
  const [updatedTweets, setUpdatedTweets] = useState(findCurrentUser.data);



  const toggleLike = (index) => {
    const currentTweet = { ...updatedTweets[index], isLiked: !updatedTweets[index].isLiked }
    const updatTweets = [...updatedTweets]
    currentTweet.isLiked ? currentTweet.likeCount++ : currentTweet.likeCount--;
    updatTweets[index] = currentTweet
    setUpdatedTweets(updatTweets)
  }

  useEffect(() => {
    setUpdatedTweets(findCurrentUser.data)
  }, [findCurrentUser.data])


  return (
    <div className='feed' >
      <div className="feed__header">
        <h2>Home</h2>
      </div>

      <TweetBox />

      {updatedTweets &&
        updatedTweets.map((singleUser, index) => (
          <Post key={index} displayName={singleUser.tweetedBy?.name} emoji={singleUser.emoji} varified={singleUser.isVarified} text={singleUser.content} avatar={singleUser.tweetedBy.userImage} image={singleUser.image} like={singleUser.likeCount} comment={singleUser.commentCount} reTweet={singleUser.reTweetsCount} isLike={singleUser.isLiked} toggleLikeValue={() => toggleLike(index)} username={singleUser.tweetedBy.username === undefined ? singleUser.tweetedBy?.name.split(" ")[0] + Math.floor(Math.random() * 9000) + 1000 : singleUser.tweetedBy.username} />
        ))
      }

    </div>
  )
}

export default Feed