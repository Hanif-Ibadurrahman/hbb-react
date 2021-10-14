import React from "react";
import { Dropdown } from "react-bootstrap";
import { BrowserRouter } from "react-router-dom";

export default function DropdownAction(props) {
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
					<NavLink href="/Approval/Detail">
						<Dropdown.Item>
							<div className="d-flex ai-center pv-2">
								<span className="icon">
									<i className="far fa-search p-sm mr-3"></i>
								</span>
								<span className="text">Detail</span>
							</div>
						</Dropdown.Item>
					</NavLink>
					<div className="d-flex w-100% h-1px bg-medium op-25%"></div>
					<Dropdown.Item>
						<div className="d-flex ai-center pv-2 tc-success-5">
							<span className="icon" style={{ marginTop: -2 }}>
								<i className="far fa-check-square p-lg mr-3"></i>
							</span>
							<span className="text">Terima</span>
						</div>
					</Dropdown.Item>
					<div className="d-flex w-100% h-1px bg-medium op-25%"></div>
					<Dropdown.Item>
						<div className="d-flex ai-center pt-3 pb-2 tc-danger-5">
							<span className="icon" style={{ marginTop: -1 }}>
								<i className="far fa-vote-nay p-md mr-3"></i>
							</span>
							<span className="text">Tolak</span>
						</div>
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</BrowserRouter>
	);
}
