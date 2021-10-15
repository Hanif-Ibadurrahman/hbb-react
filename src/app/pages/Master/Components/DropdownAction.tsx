import React from "react";
import { Dropdown } from "react-bootstrap";
import { BrowserRouter } from "react-router-dom";

export default function DropdownAction(props) {
	const listItems = props.list.map((item, index) => {
		const divider = index === props.list.length - 1 ? "d-none" : "d-flex";
		return (
			<>
				<Dropdown.Item>
					<div className={"d-flex ai-center pv-2 " + item.titleClass}>
						<span className="icon">
							<i className={"far " + item.icon + " p-sm mr-3"}></i>
						</span>
						<span className="text">{item.title}</span>
					</div>
				</Dropdown.Item>
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
