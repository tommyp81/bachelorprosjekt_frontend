import React from "react";
import "./SideDrawer.css";

const SideDrawer = (props) => {
  let drawerClasses = "sideDrawer";

  if (props.show) {
    drawerClasses = "sideDrawer open";
  }

  return (
    <nav className={drawerClasses}>
      <ul>
        <li>
          <a href="/">Hjem</a>
        </li>
        <li>
          <a href="/Forum">Forum</a>
        </li>
        <li>
          <a href="/Kunnskapsportalen">Kunnskapsportalen</a>
        </li>
        <li>
          <a href="/Login">Logg inn</a>
        </li>
      </ul>
    </nav>
  );
};

export default SideDrawer;
