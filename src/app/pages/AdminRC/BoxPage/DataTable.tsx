import React, { useState } from "react";
import { DataTable } from "../../../components/Datatables";
import Button from "react-bootstrap/Button";
import { ModalForm } from "./components/ModalForm";

export default function DataTables() {
	function NavLinkAction(e, href) {
		e.preventDefault();
		window.location.pathname = href;
	}

	const NavLink = props => {
		return (
			<div onClick={e => NavLinkAction(e, props.href)}>{props.children}</div>
		);
	};

	const [modalShow, setModalShow] = useState(false);

	const header = [
		{
			title: "Code Box",
			prop: "CodeBox",
			sortable: true,
			cellProps: {
				style: { width: "15%" },
			},
		},
		{
			title: "Tanggal",
			prop: "Tanggal",
			sortable: true,
			// Add classes and styles by objects and strings.
			cellProps: {
				style: { background: "#fafafa", width: "15%" },
				className: "realname-class",
			},
		},
		{
			title: "Waktu",
			prop: "Waktu",
			cellProps: {
				style: { width: "15%" },
			},
		},
		{
			title: "Quantity",
			prop: "Quantity",
			cellProps: {
				style: { background: "#fafafa", width: "10%" },
				className: "realname-class",
			},
		},
		{
			title: "Notes",
			prop: "Notes",
			cellProps: {
				style: { width: "25%" },
			},
		},
		{
			title: "Action",
			prop: "Action",
			cellProps: {
				style: { background: "#fafafa" },
				className: "realname-class",
			},
		},
	];

	const body = Array.from(new Array(20), () => {
		const rd = (Math.random() * 10).toFixed(2);

		if (rd > "5") {
			return {
				CodeBox: `A1232${rd}`,
				Tanggal: "05 - 09 - 21",
				Waktu: "09:52 WIB",
				Quantity: "10",
				Notes: (
					<span className="notes">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit
					</span>
				),
				Action: (
					<div className="d-flex jc-between">
						<NavLink href="/RC/DetailBox">
							<Button variant="dark">Detail</Button>
						</NavLink>
						<Button
							variant="transparant"
							className="tc-success-5 w-24"
							disabled
						>
							Success
						</Button>
					</div>
				),
			};
		} else if (rd > "3") {
			return {
				CodeBox: `A1232${rd}`,
				Tanggal: "05 - 09 - 21",
				Waktu: "09:52 WIB",
				Quantity: "10",
				Notes: (
					<span className="notes">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit
					</span>
				),
				Action: (
					<div className="d-flex jc-between">
						<NavLink href="/RC/DetailBox">
							<Button variant="dark" className="">
								Detail
							</Button>
						</NavLink>
						<Button variant="transparant" className="tc-danger-6 w-24" disabled>
							Cancel
						</Button>
					</div>
				),
			};
		}

		return {
			CodeBox: `B2114${rd}`,
			Tanggal: "06 - 09 - 21",
			Waktu: "09:52 WIB",
			Quantity: "15",
			Notes: (
				<span className="notes">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit
				</span>
			),
			Action: (
				<div className="d-flex jc-between">
					<NavLink href="/RC/DetailBox">
						<Button variant="dark" className="">
							Detail
						</Button>
					</NavLink>
					<ModalForm />
				</div>
			),
		};
	});

	return (
		<>
			<div className="d-flex fd-col-r">
				<DataTable tableHeader={header} tableBody={body} />
			</div>
		</>
	);
}
