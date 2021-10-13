import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Breadcrumb from "app/components/BreadCrumb";

export function DetailBoxCSR() {
	const [crumbs, setCrumbs] = useState(["Dashboard", "ApprovalBox", "Detail"]);

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
		<>
			<Breadcrumb crumbs={crumbs} selected />
			<div className="pos-r p-8 w-80%">
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Code</Form.Label>
					<Form.Control type="text" disabled defaultValue="A12O2O3" />
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Date</Form.Label>
					<Form.Control type="date" disabled defaultValue="2021-05-14" />
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Time</Form.Label>
					<Form.Control type="time" disabled defaultValue="16:27" />
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Quantity</Form.Label>
					<Form.Control type="text" disabled defaultValue="10" />
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Notes</Form.Label>
					<Form.Control
						as="textarea"
						className="notesdisable"
						disabled
						defaultValue="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Status</Form.Label>
					<Form.Control
						className="bg-success-6 w-100%"
						defaultValue="Approve"
						disabled
					></Form.Control>
				</Form.Group>
				<NavLink href="/CSR/EditBox">
					<Button className="mt-4" variant="warning">
						Edit Data
					</Button>{" "}
				</NavLink>
			</div>
		</>
	);
}
