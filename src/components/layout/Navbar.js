import React, { useState, useContext } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Navbar.css";
import { IconContext } from "react-icons";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";

import { useUserAuth } from "../../context/UserAuthContext";

function Navbar() {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>

          <h1>
            &nbsp;
            <text style={{ color: "#0d6efd" }}>Fair</text>
            <text style={{ color: "white" }}>Transits</text>
          </h1>

          <div className="align-right" style={{ color: "white" }}>
            {user ? (
              <div> Hello {user.displayName}</div>
            ) : (
              <div> Hello guest</div>
            )}
          </div>

          <div className="d-grid gap-2">
            <Button
              className="align-right"
              variant="primary"
              onClick={() => (user ? handleLogout() : navigate("/login"))}
            >
              {user ? <div> Logout</div> : <div> Login</div>}
            </Button>
          </div>

          {/* <button className='align-right' > Logout </button> */}
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
