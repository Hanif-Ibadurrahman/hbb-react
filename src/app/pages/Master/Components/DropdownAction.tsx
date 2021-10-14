import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { BrowserRouter } from "react-router-dom";

export default function DropdownAction(props) {
	const [modalShow, setModalShow] = useState(false);

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
			<Dropdown>
				<Dropdown.Toggle variant="success" id="dropdown-basic">
					Action
				</Dropdown.Toggle>
				<Dropdown.Menu style={{ minWidth: 200 }}>
					<Dropdown.Item>
						<div className="d-flex ai-center pv-2">
							<span className="icon">
								<i className="far fa-search p-sm mr-3"></i>
							</span>
							<span className="text">Detail</span>
						</div>
					</Dropdown.Item>
					{/* <Dropdown.Item>
						<div className="d-flex ai-center pv-2">
							<span className="icon">
								<i className="far fa-copy p-sm mr-3"></i>
							</span>
							<span className="text">Duplicate</span>
						</div>
					</Dropdown.Item> */}
					<div className="d-flex w-100% h-1px bg-medium op-25%"></div>
					<Dropdown.Item>
						<div className="d-flex ai-center pv-2">
							<span className="icon">
								<i className="far fa-edit p-sm mr-3"></i>
							</span>
							<span className="text">Edit</span>
						</div>
					</Dropdown.Item>
					<div className="d-flex w-100% h-1px bg-medium op-25%"></div>
					<Dropdown.Item>
						<div className="d-flex ai-center pv-2 tc-danger-5">
							<span className="icon">
								<i className="far fa-trash-alt p-sm mr-3"></i>
							</span>
							<span className="text">Delete</span>
						</div>
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</BrowserRouter>
	);
}
