import React, { useState, useEffect } from "react";
import { NavBarDropdown } from "./NavBarDropdown/index";
import Profile from "assets/images/profile.png";
import "./navbar.scoped.scss";

const user = localStorage.getItem("UserName");

export function NavBar() {
	return (
		<div className="navbar pt-0 pb-0">
			<div className="pl-4 h-20 w-100% bg-primary-5 d-flex ai-center">
				<div className="ml-a cur-p">
					<NavBarDropdown username={user} profile={Profile} />
				</div>
			</div>
		</div>
	);
}
