import React from 'react'
import "./sidebarOption.css";

const SidebarOption = ({ active, text, Icon }) => {
  return (
    <div className={`sidebarOption ${active && 'sidebarOption__active'}`}>
      <Icon />
      <p>{text}</p>
    </div>
  )
}

export default SidebarOption;