import React, { useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { PageWrapper } from "app/components/PageWrapper";
import Breadcrumb from "app/components/BreadCrumb";
import QR from "app/components/QRCode";
import "../master.scoped.scss";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getBoxDetail } from "actions/BoxActions";
import { selectBox } from "store/Selector/BoxSelector";
import { BoxInterfaceState } from "store/Types/BoxTypes";
import { DataTable } from "app/components/Datatables";
import DropdownAction from "../Components/DropdownAction";

const BoxPageDetail = ({ match }) => {
	const box: BoxInterfaceState = useSelector(selectBox);
	let history = useHistory();

	const goToPreviousPath = e => {
		e.preventDefault();
		history.goBack();
	};

	const box_id = match.params.id;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getBoxDetail(box_id));
	}, []);

	const folders = box?.folders;

	const action = id => [
		{
			icon: "fa-search",
			title: "Detail",
			url: "Folder-Detail/" + id,
			type: 1,
		},
	];

	const header = [
		{
			title: "No Folder",
			prop: "no",
			sortable: true,
			cellProps: {
				style: { width: "80%" },
			},
			headerCell: () => {
				return (
					<div className="cur-p">
						{`No Folder`}
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
								<Form.Label>Code Box</Form.Label>
								<Form.Control
									type="text"
									disabled
									defaultValue={box?.code_box}
								/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Custome Code</Form.Label>
								<Form.Control
									type="text"
									disabled
									defaultValue={box?.custom_code_box}
								/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Status</Form.Label>
								<Form.Control type="text" disabled defaultValue={box?.status} />
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Code Lemari</Form.Label>
								<Form.Control
									type="text"
									disabled
									defaultValue={box?.cabinet_slot?.name}
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
							// value={box !== null ? box?.sign_code : "-"}
							value={"-"}
							className="d-flex jc-center"
						/>
						<div className="d-flex jc-center">
							<p className="p-xl ff-1-bd ta-center mt-3">Box Barcode</p>
						</div>
					</Card>
				</div>
				<div>
					<h6 className="mb-4 mt-4">Folder</h6>
					<DataTable tableHeader={header} tableBody={folders} />
				</div>
			</PageWrapper>
		</>
	);
};

export default BoxPageDetail;
