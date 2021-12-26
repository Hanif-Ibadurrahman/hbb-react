import React, { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { PageWrapper } from "app/components/PageWrapper";
import Breadcrumb from "app/components/BreadCrumb";
import QR from "app/components/QRCode";
import "../master.scoped.scss";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCabinetDetail } from "actions/CabinetAction";
import { selectCabinets, selectCabinet } from "store/Selector/CabinetSelector";
import { CabinetInterfaceState } from "store/Types/CabinetTypes";

const CabinetPageDetail = ({ match }) => {
	const cabinet: CabinetInterfaceState = useSelector(selectCabinet);
	let history = useHistory();

	const goToPreviousPath = e => {
		e.preventDefault();
		history.goBack();
	};

	console.log("test boy", cabinet.CabinetSlots);

	const cabinet_id = match.params.id;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCabinetDetail(cabinet_id));
	}, []);

	return (
		<>
			<PageWrapper className="row w-100%">
				<Breadcrumb
					crumbs={["Dashboard", "Cabinet", "Detail"]}
					selected
					className="mb-4"
				/>
				<div className="col col-9">
					<Card className="ph-5 pv-3 bd-rs-2">
						<Form className="mt-3">
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Code Cabinet</Form.Label>
								<Form.Control
									type="text"
									disabled
									defaultValue={cabinet.CodeCabinet}
								/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Total Bays</Form.Label>
								<Form.Control
									type="number"
									disabled
									defaultValue={cabinet.CodeTotalBays}
								/>
							</Form.Group>

							{/* <Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Status</Form.Label>
								<Form.Control
									className="bg-success-6 w-100%"
									defaultValue="Approve"
									disabled
								></Form.Control>
							</Form.Group> */}
							<div className="d-flex jc-end">
								<Button
									className="mv-4 mr-4"
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
							value="SLO-baf01be1-af41-448c-9e99-f1a0d59de5a1"
							className="d-flex jc-center"
						/>
						<div className="d-flex jc-center">
							<p className="p-xl ff-1-bd ta-center mt-3">Slot</p>
						</div>
					</Card>
				</div>
			</PageWrapper>
		</>
	);
};

export default CabinetPageDetail;
