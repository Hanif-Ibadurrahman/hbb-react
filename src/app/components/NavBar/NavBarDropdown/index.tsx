import React, { useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Profile } from "../../Image";
import { useHistory } from "react-router-dom";

const Username = props => {
	return (
		<span className="username text txtf-c p-lg tc-dark op-75% pr-12">
			{props.username}
		</span>
	);
};

export function NavBarDropdown(props) {
	let history = useHistory();
	useEffect(() => {
		console.log(props);
	});

	const gotoProfile = e => {
		e.preventDefault();
		history.push("/Profile/Edit");
	};

	const logout = e => {
		e.preventDefault();
		history.push("/Login");
	};

	return (
		<Dropdown>
			<Dropdown.Toggle className="dropdown-toggle p-0 bg-n bd-n bd-rs-0 h-20">
				<div className="d-flex ai-center">
					<div className="w-2px h-20 bg-dark-contrast op-25%"></div>
					<Profile className="d-flex ai-center jc-center h-12 w-12 bd-rs-16 of-h mh-4" />
					<Username username={props.username} />
					<i className="dropdown-toggle-indicator fas fa-chevron-down tc-dark op-75%"></i>
				</div>
			</Dropdown.Toggle>

			<Dropdown.Menu className="pos-r">
				<Dropdown.Item className="ph-6" onClick={gotoProfile}>
					<div className="d-flex ai-center p-lg">
						<span className="icon mr-4 d-flex ai-center">
							<i className="far fa-user"></i>
						</span>
						<span className="text">Profile</span>
					</div>
				</Dropdown.Item>
				<span className="d-block h-1px w-100% bg-medium-tint op-50% mv-2"></span>
				{/* separator */}
				<Dropdown.Item className="ph-6" onClick={logout}>
					<div className="d-flex ai-center p-lg tc-danger-5">
						<span className="icon mr-4 d-flex ai-center">
							<i className="far fa-sign-out"></i>
						</span>
						<span className="text">Logout</span>
					</div>
				</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	);
}
