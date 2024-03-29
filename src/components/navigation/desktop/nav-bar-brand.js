import React from "react";
import { NavLink } from "react-router-dom";

export const NavBarBrand = () => {
  return (
    <div className="nav-bar__brand">
      <NavLink to="/">
        {/* <img
          className="nav-bar__logo"
          src="https://da7udebijaype.cloudfront.net/uploads/startups/logos/c915d3a2-faa5-47c1-952c-45432b0ef32f.png?=1661886060"
          alt="Auth0 shield logo"
          width="40"
          height="36"
        /> */}
      </NavLink>
    </div>
  );
};
