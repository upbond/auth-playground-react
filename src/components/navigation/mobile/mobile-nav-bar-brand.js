import React from "react";
import { NavLink } from "react-router-dom";

export const MobileNavBarBrand = ({ handleClick }) => {
  return (
    <div onClick={handleClick} className="mobile-nav-bar__brand">
      <NavLink to="/">
        <img
          className="mobile-nav-bar__logo"
          src="https://da7udebijaype.cloudfront.net/uploads/startups/logos/c915d3a2-faa5-47c1-952c-45432b0ef32f.png?=1661886060"
          alt="logo"
          width="32"
          height="24"
        />
      </NavLink>
    </div>
  );
};
