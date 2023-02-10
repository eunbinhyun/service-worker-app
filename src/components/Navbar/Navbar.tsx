import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import './Navbar.css';

export const Navbar = () => {


  return (
    <nav className="navbar">
      <ul className="menu">
        <li className="menuItem">
          <Link to="/">Home</Link>
        </li>
        <li className="menuItem">
          <Link to="/menu1">Menu1</Link>
        </li>
      </ul>
    </nav>
  );
};
