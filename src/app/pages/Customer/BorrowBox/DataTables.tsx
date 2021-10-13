import React, { useEffect, useState } from "react";
import { DataTable } from "../../../components/Datatables";
import { Dropdown } from "react-bootstrap";
import { ConfirmationModal } from "./components/ConfirmationModal";

export function DataTables() {
	const header = [
		{
			title: "Code Box",
			prop: "CodeBox",
			sortable: true,
			cellProps: {
				style: { width: "25%" },
			},
		},
		{
			title: "Tanggal",
			prop: "Tanggal",
			sortable: true,
			// Add classes and styles by objects and strings.
			cellProps: {
				style: { background: "#fafafa", width: "20%" },
				className: "realname-class",
			},
		},
		{
			title: "Waktu",
			prop: "Waktu",
			sortable: true,
			cellProps: {
				style: { width: "20%" },
			},
		},
		{
			title: "Quantity",
			prop: "Quantity",
			sortable: true,
			cellProps: {
				style: { background: "#fafafa", width: "20%" },
				className: "realname-class",
			},
		},
		// {
		//   title: 'Notes',
		//   prop: 'Notes',
		//   cellProps: {
		//     style: { width: '25%' },
		//   },
		// },
		{
			title: "Action",
			prop: "Action",
			cellProps: {
				style: { flex: 1 },
				className: "realname-class",
			},
		},
	];

	const body = Array.from(new Array(30), () => {
		const rd = (Math.random() * 10).toFixed(2);
		const codeBox = `A000${rd}`;

		return {
			CodeBox: codeBox,
			Tanggal: "05 - 09 - 21",
			Waktu: "09:52 WIB",
			Quantity: "10",
			Action: (
				<Dropdown>
					<Dropdown.Toggle variant="success" id="dropdown-basic">
						Action
					</Dropdown.Toggle>
					<Dropdown.Menu style={{ minWidth: 200 }}>
						<Dropdown.Item href="/DetailBox">
							<div className="d-flex ai-center pv-2">
								<span className="icon">
									<i className="far fa-search p-sm mr-3"></i>
								</span>
								<span className="text">Detail</span>
							</div>
						</Dropdown.Item>
						<div className="d-flex w-100% h-1px bg-medium op-25%"></div>
						<Dropdown.Item>
							<div className="d-flex ai-center pv-2">
								<span className="icon">
									<i className="far fa-hand-holding-box p-sm mr-3"></i>
								</span>
								<span className="text">Pinjam</span>
							</div>
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			),
		};
	});

	function Cart(): JSX.Element {
		return (
			<>
				<div className="ph-4 pv-4 bg-dark-contrast bd-tl-rs-4 bd-tr-rs-4 d-flex cart-popup">
					<div className="d-flex ai-center">
						<span className="h-12 w-12 bd-rs-6 d-flex ai-center jc-center bg-light-shade mr-6">
							<span
								className="icon h-9 w-9 bd-rs-6 d-flex ai-center jc-center bg-medium-tint"
								style={{ marginTop: -3 }}
							>
								<i className="fas fa-box-check"></i>
							</span>
						</span>
						<h5 className="text ff-1-bd mr-3">4</h5>
						<p className="p-lg">Box dipilih</p>
					</div>
					<ConfirmationModal />
					{/* <div className="d-flex ai-center">
            <span className="icon p-lg mr-2" style={{ marginTop: -3 }}>
              <i className="fas fa-exclamation-circle"></i>
            </span>
            <span className="text">Tidak ada box dipinjam</span>
          </div> */}
				</div>
			</>
		);
	}

	return (
		<>
			<div className="d-flex fd-col-r">
				<DataTable tableHeader={header} tableBody={body} />
				<Cart />
			</div>
		</>
	);
}

// const Wrapper = styled.div`
//   height: calc(100vh - ${StyleConstants.NAV_BAR_HEIGHT});
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex-direction: column;
//   min-height: 320px;
// `;
