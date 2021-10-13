/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "./image.scoped.scss";

// -=-=-=- IMAGE LIST -=-=-=-=-
import ProfileImg from "assets/images/profile.png";
import ProfileBg from "assets/images/user-bg.jpg";

const Profile = props => {
	return (
		<div style={props.style} className={props.className}>
			<img src={ProfileImg} className="h-100%" />
		</div>
	);
};

const ProfileHero = props => {
	return (
		<div
			style={{ backgroundImage: "url(" + ProfileBg + ")" }}
			className={"hero " + props.className}
		>
			{props.children}
		</div>
	);
};

export { Profile, ProfileImg, ProfileHero };
