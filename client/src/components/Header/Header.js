import React, { useState } from "react";

import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { FaList, FaRegHeart } from "react-icons/fa";
import {
  FiHome,
  FiLogOut,
  FiArrowLeftCircle,
  FiArrowRightCircle,
  FiLogIn,
  FiAperture
} from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";
import "react-pro-sidebar/dist/css/styles.css";
import "./Header.css";

import { Button, Container, InputGroup } from "reactstrap";
import { useTheme } from "../../utils/ThemeContext";
// import ToggleDark from './components/toggleDark';

import Auth from '../../utils/auth';

const Header = () => {
  const [menuCollapse, setMenuCollapse] = useState(false);
  const { darkTheme, toggleTheme } = useTheme();
  const menuIconClick = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <>
      <div id="header" className={`d-flex ${darkTheme ? " dark-content" : ""}`}>
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            <div className="logotext">
              <p>{menuCollapse ? "Photo" : "Smart Photo Organizer"}</p>
            </div>
            <div className="closemenu" onClick={menuIconClick}>
              {menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">

              <MenuItem dataIndex="home" icon={<FiHome />}>
                <Link to="/home" className="sideBtn">
                  Home
                </Link>
              </MenuItem>
              <MenuItem icon={<FaList />}>
                <Link to="/collections" className="sideBtn">
                  Collections
                </Link>
              </MenuItem>

              <MenuItem icon={<RiPencilLine />}>
                <Link to="/classifier" className="sideBtn">
                  Classifier
                </Link>
              </MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <InputGroup>
              <Button color="link" onClick={toggleTheme}>
                <i className={darkTheme ? "fas fa-sun" : "fas fa-moon"}></i>
                <span className="d-md-block">Switch mode</span>
              </Button>
            </InputGroup>
            {Auth.loggedIn() ? (
              <Menu iconShape="square">
              <MenuItem icon={<FiLogOut />} onClick={logout}>Logout</MenuItem>
              </Menu>
            ) : (
              
              <Menu iconShape="square">
              <MenuItem icon={<FiLogIn />}>
                <Link to="/login" className="sideBtn">
                  Login
                </Link>
              </MenuItem>
              <MenuItem icon={<FiAperture />}>
              <Link to="/signup" className="sideBtn">
                Signup    
              </Link>
              </MenuItem>
              </Menu>
            )}
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

export default Header;
