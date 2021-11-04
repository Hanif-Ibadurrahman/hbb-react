import React, { useState } from "react";
import {
	Dropdown,
	Form,
	Modal,
	Container,
	Row,
	Col,
	Button,
} from "react-bootstrap";
import { BrowserRouter } from "react-router-dom";
import Alert from "app/components/Alerts";
import { Link } from "react-router-dom";

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

	const listItems = props.list.map((item, index) => {
		const divider = index === props.list.length - 1 ? "d-none" : "d-flex";
		return (
			<>
				{item.type === 1 ? (
					<NavLink href={item.url}>
						<div className="dropdown-item cur-p">
							<div className={"d-flex ai-center pv-2 " + item.titleClass}>
								<span className="icon">
									<i className={"far " + item.icon + " p-sm mr-3"}></i>
								</span>
								<span className="text">{item.title}</span>
							</div>
						</div>
					</NavLink>
				) : item.type === 2 ? (
					<div
						className="dropdown-item cur-p"
						onClick={() => item.onclick(item.id)}
					>
						<div className={"d-flex ai-center pv-2 " + item.titleClass}>
							<span className="icon">
								<i className={"far " + item.icon + " p-sm mr-3"}></i>
							</span>
							<span className="text">{item.title}</span>
						</div>
					</div>
				) : null}
				<div className={"w-100% h-1px bg-medium op-25% " + divider} />
			</>
		);
	});

	return (
		<BrowserRouter>
			<Dropdown>
				<Dropdown.Toggle variant="success" id="dropdown-basic">
					Action
				</Dropdown.Toggle>
				<Dropdown.Menu style={{ minWidth: 200 }}>{listItems}</Dropdown.Menu>
			</Dropdown>
		</BrowserRouter>
	);
}
