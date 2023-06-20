import React from 'react'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import IosShareIcon from '@mui/icons-material/IosShare';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RepeatIcon from '@mui/icons-material/Repeat';
import { Avatar } from '@mui/material'
import "./post.css"

const Post = ({ displayName,emoji, username, varified, text, image, avatar,like, comment, reTweet, isLike, toggleLikeValue }) => {
    return (
        <div className='post' >
            <div className="post__avatar">
                <Avatar src={avatar} />
            </div>
            <div className="post__body">
                <div className="post__header">
                    <div className="post__headerText">
                        <h3>
                            {displayName} {" "}
                            <span className='post__headerSpecial'>
                                {varified && <VerifiedUserIcon className="post__badge" />}@{username}
                            </span>
                        </h3>
                    </div>
                    <div className="postheader__description">
                        <p>{text}</p>
                        <span>{emoji && emoji.map((singleEmoji, index)=>(
                            <span key={index}>{singleEmoji}</span>
                        ))}</span>
                    </div>
                </div>
                <img src={image} alt="" onDoubleClick={toggleLikeValue}/>
                <div className="post__footer">
                    <div title="Reply">
                        <ChatBubbleOutlineIcon fontSize='small' />
                        <span>{comment}</span>
                    </div>
                    <div title="Retweet">
                        <RepeatIcon fontSize='small' />
                        <span>{reTweet}</span>
                    </div>
                    <div onClick={toggleLikeValue} title="Like">
                        {isLike ? <><FavoriteIcon fontSize='small' sx={{color:"red"}}/></> : <><FavoriteBorderIcon fontSize='small' /></>}  
                        <span>{like}</span>
                    </div>
                    <div title="Share">
                        <IosShareIcon fontSize='small' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post