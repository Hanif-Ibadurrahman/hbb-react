import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
// import { useHistory } from 'react-router-dom';
import "./profile.scoped.scss";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import EditProfile from "./sections/EditProfile";
import ChangePassword from "./sections/ChangePassword";

export function UserProfile() {
	// let history = useHistory();

	function NavLinkAction(e, href) {
		e.preventDefault();
		window.location.pathname = href;
	}

	const NavLink = props => {
		return (
			<div onClick={e => NavLinkAction(e, props.href)}>{props.children}</div>
		);
	};

	return (
		<BrowserRouter>
			<Helmet>
				<title>Dox - Login</title>
				<meta name="description" content="DOX" />
			</Helmet>
			<div className="pos-r d-flex" style={{ minHeight: "calc(100% - 80px" }}>
				<div
					className="pos-r d-flex w-100% profile-wrapper"
					style={{ minHeight: "calc(100% - 80px" }}
				>
					<div
						className="col col-3 ph-0"
						style={{ minHeight: "calc(100% - 80px" }}
					>
						<NavLink href="/Profile/Edit">
							<div className="ph-8 pv-4 tc-medium cur-p">
								<span className="icon mr-4">
									<i className="far fa-user-circle p-xl"></i>
								</span>
								<span className="text p-md ff-1-bd tc-medium-shade">
									Profile
								</span>
							</div>
						</NavLink>
						<div className="d-block w-100% h-2px bg-medium op-10%"></div>
						<NavLink href="/Profile/Password">
							<div className="ph-8 pv-4 tc-medium cur-p">
								<span className="icon mr-4">
									<i className="far fa-lock p-xl"></i>
								</span>
								<span className="text p-md ff-1-bd tc-medium-shade">
									Privacy & Password
								</span>
							</div>
						</NavLink>
						<div className="d-block w-100% h-2px bg-medium op-10%"></div>
						<div className="pos-a r-0 t-0 h-100% w-2px bg-medium op-10%"></div>
					</div>
					{/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */}
					<div className="col col-9 ph-0">
						<Switch>
							<Route
								exact
								path={process.env.PUBLIC_URL + "/Profile/Edit"}
								component={EditProfile}
							/>
							<Route
								path={process.env.PUBLIC_URL + "/Profile/Password"}
								component={ChangePassword}
							/>
						</Switch>
					</div>
				</div>
			</div>
		</BrowserRouter>
	);
}
