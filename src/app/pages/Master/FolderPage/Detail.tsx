import React, { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { PageWrapper } from "app/components/PageWrapper";
import Breadcrumb from "app/components/BreadCrumb";
import QR from "app/components/QRCode";
import "../master.scoped.scss";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getFolderDetail } from "actions/FolderAction";
import { FolderInterfaceState } from "store/Types/FolderTypes";
import { selectFolder } from "store/Selector/FolderSelector";
import { DataTable } from "app/components/Datatables";
import DropdownAction from "../Components/DropdownAction";

const FolderPageDetail = ({ match }) => {
	const folder: FolderInterfaceState = useSelector(selectFolder);
	let history = useHistory();

	const goToPreviousPath = e => {
		e.preventDefault();
		history.goBack();
	};

	const documents = folder?.documents;

	const folder_id = match.params.id;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getFolderDetail(folder_id));
	}, []);

	const action = id => [
		{
			icon: "fa-search",
			title: "Detail",
			url: "Document-Detail/" + id,
			type: 1,
		},
	];

	const header = [
		{
			title: "Detail Document",
			prop: "detail",
			sortable: true,
			cellProps: {
				style: { width: "80%", textAlign: "left", lineHeight: "40px" },
			},
			headerCell: () => {
				return (
					<div className="cur-p">
						{`Detail Document`}
						<i className="fas fa-sort-alt ml-2"></i>
					</div>
				);
			},
		},
		{
			title: "Action",
			prop: "Action",
			cellProps: {
				style: { flex: 1 },
				className: "realname-class",
			},
			cell: row => {
				return <DropdownAction list={action(row.id)} />;
			},
		},
	];

	return (
		<>
			<PageWrapper className="row w-100%">
				<Breadcrumb
					crumbs={["Dashboard", "Folder", "Detail"]}
					selected
					className="mb-4"
				/>
				<div className="col col-9">
					<Card className="ph-5 pv-3 bd-rs-2">
						<Form className="mt-3">
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>No Folder</Form.Label>
								<Form.Control type="text" disabled defaultValue={folder?.no} />
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Code Box</Form.Label>
								<Form.Control
									type="text"
									disabled
									defaultValue={folder?.box?.code_box}
								/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Nama Perusahaan</Form.Label>
								<Form.Control
									type="text"
									disabled
									defaultValue={folder?.company?.name}
								/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Status</Form.Label>
								<Form.Control
									type="text"
									disabled
									defaultValue={folder?.status}
								/>
							</Form.Group>
							<div className="d-flex jc-end">
								<Button
									className="mv-4"
									variant="outline-secondary"
									onClick={goToPreviousPath}
								>
									Kembali
								</Button>{" "}
							</div>
						</Form>
					</Card>
				</div>
				<div className="col col-3">
					<Card className="p-4 bd-rs-2 d-flex ai-center jc-center">
						<QR
							id="Detail-Box-QR"
							title="Scan here"
							value={folder?.sign_code}
							className="d-flex jc-center"
						/>
						<div className="d-flex jc-center">
							<p className="p-xl ff-1-bd ta-center mt-3">Folder Barcode</p>
						</div>
					</Card>
				</div>
				<div>
					<h6 className="mb-4 mt-4">List Document</h6>
					<DataTable tableHeader={header} tableBody={documents} />
				</div>
			</PageWrapper>
		</>
	);
};

export default FolderPageDetail;
