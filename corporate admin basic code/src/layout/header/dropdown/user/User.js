import React, {useEffect, useState} from "react";
import { DropdownToggle, DropdownMenu, Dropdown } from "reactstrap";
import { Icon } from "../../../../components/Component";
import { LinkList, LinkItem } from "../../../../components/links/Links";
import UserAvatar from "../../../../components/user/UserAvatar";
import Cookies from "universal-cookie";
import {getVendorDetails} from "../../../../services/userServices/user.service";

const User = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const toggle = () => setOpen((prevState) => !prevState);

  useEffect(() =>{
    getUserData();
  },[]);

  const getUserData = async () => {
    const userData = await getVendorDetails();
    if(userData.status === "success"){
      setUser(userData.data);
    }else{
      handleSignout();
    }
  }

  const handleSignout = () => {
    const cookies = new Cookies();
    cookies.remove("accessToken");
    cookies.remove("user");
  };

  return (
    <Dropdown isOpen={open} className="user-dropdown" toggle={toggle}>
      <DropdownToggle
        tag="a"
        href="#toggle"
        className="dropdown-toggle"
        onClick={(ev) => {
          ev.preventDefault();
        }}
      >
        <div className="user-toggle">
          <UserAvatar icon="user-alt" className="sm" />
          <div className="user-info d-none d-md-block">
            <div className="user-status">Administrator</div>
            <div className="user-name dropdown-indicator">
              {
                user !== null && (
                      user.first_name + ' '  + user.last_name
                  )
              }
            </div>
          </div>
        </div>
      </DropdownToggle>
      <DropdownMenu end className="dropdown-menu-md dropdown-menu-s1">
        <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
          <div className="user-card sm">
            <div className="user-avatar">
              <span>AB</span>
            </div>
            <div className="user-info">
              <span className="lead-text">{
                  user !== null && (
                      user.first_name + ' '  + user.last_name
                  )
              }</span>
              <span className="sub-text">{
                  user !== null && (
                      user.email
                  )
              }</span>
            </div>
          </div>
        </div>
        <div className="dropdown-inner">
          {/*<LinkList>*/}
          {/*  <LinkItem link="/user-profile-setting" icon="setting-alt" onClick={toggle}>*/}
          {/*    Account Setting*/}
          {/*  </LinkItem>*/}
          {/*</LinkList>*/}
        </div>
        <div className="dropdown-inner">
          <LinkList>
            <a href={`${process.env.PUBLIC_URL}/login`} onClick={handleSignout}>
              <Icon name="signout"></Icon>
              <span>Sign Out</span>
            </a>
          </LinkList>
        </div>
      </DropdownMenu>
    </Dropdown>
  );
};

export default User;
