import React, { useContext, useState } from 'react'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ListAltIcon from '@mui/icons-material/ListAlt';
import TwitterIcon from '@mui/icons-material/Twitter';
import HomeIcon from '@mui/icons-material/Home';
import TagIcon from '@mui/icons-material/Tag';
import { Button } from '@mui/material';
import { Avatar } from '@mui/material'
import SidebarOption from '../sidebaroption/SidebarOption'
import { AuthContext } from '../../context/AuthContextProvider';
import "./sidebar.css"


const Sidebar = () => {
  const { userData, handelingLogout } = useContext(AuthContext);
  const findCurrentUser = userData.find(user => user.isAuth);
  const [isShow, setIsShow] = useState(false)

  
  return (
    <div className='sidebar' >
      <TwitterIcon className="sidebar__twitterIcon" />
      <SidebarOption active Icon={HomeIcon} text="Home" />
      <SidebarOption Icon={TagIcon} text="Explore" />
      <SidebarOption Icon={NotificationsNoneIcon} text="Notifications" />
      <SidebarOption Icon={MailOutlineIcon} text="Messages" />
      <SidebarOption Icon={BookmarkIcon} text="Bookmarks" />
      <SidebarOption Icon={ListAltIcon} text="Twitter Blue" />
      <SidebarOption Icon={PermIdentityIcon} text="Profile" />
      <SidebarOption Icon={MoreHorizIcon} text="More" />


      <Button variant='outlined' className='sidebar__tweet' fullWidth>Tweet</Button>



      <div className='logout__section'>
        {isShow && <div className='popup-section' onClick={()=>handelingLogout()}>Log out <span>@{findCurrentUser.username}</span></div>}
        {
          findCurrentUser && <div className='Log__Out__Section'>

            <Avatar src={findCurrentUser.AvatarImage} onClick={()=>setIsShow(!isShow)}/>
            <div className='text__dn'>
              <p className='userName'>{findCurrentUser.userName}</p>
              <p>@{findCurrentUser.username}</p>
            </div>
            <div className='display__none'>
              <MoreHorizIcon onClick={()=>setIsShow(!isShow)}/>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default Sidebar;