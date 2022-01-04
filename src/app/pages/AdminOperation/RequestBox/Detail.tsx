import React, { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { PageWrapper } from "app/components/PageWrapper";
import Breadcrumb from "app/components/BreadCrumb";
import QR from "app/components/QRCode";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
	selectRequestBox,
	selectRequestBoxes,
} from "../../../../store/Selector/RequestBoxSelector";
import { getRequestBoxDetail } from "actions/RequestBoxAction";
import {
	RequestBoxInterfaceState,
	ApprovalInterfaceState,
} from "store/Types/RequestBoxTypes";
import moment from "moment";

const ApprovalAdminDetail = ({ match }) => {
	const requestBox: RequestBoxInterfaceState = useSelector(selectRequestBox);
	let history = useHistory();

	const goToPreviousPath = e => {
		e.preventDefault();
		history.goBack();
	};

	const request_id = match.params.id;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getRequestBoxDetail(request_id));
	}, []);

	const NewDate = moment(requestBox.delivered_at).format("d MMMM YYYY");
	return (
		<>
			<PageWrapper className="row w-100%">
				<Breadcrumb
					crumbs={["Dashboard", "Box", "Detail"]}
					selected
					className="mb-4"
				/>
				<div className="col col-9">
					<Card className="ph-5 pv-3 bd-rs-2">
						<Form className="mt-3">
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Quantity</Form.Label>
								<Form.Control
									type="text"
									disabled
									defaultValue={requestBox.quantity}
								/>
							</Form.Group>
							<Form.Group className="mb-4" controlId="formBasicEmail">
								<Form.Label>Tanggal Kirim</Form.Label>
								<Form.Control type="text" value={NewDate} disabled />
							</Form.Group>
							<Form.Group className="mb-4" controlId="formBasicEmail">
								<Form.Label>Note</Form.Label>
								<Form.Control as="textarea" value={requestBox.note} disabled />
							</Form.Group>
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
							value="ID : A12O2O3"
							className="d-flex jc-center"
						/>
						<div className="d-flex jc-center">
							<p className="p-xl ff-1-bd ta-center mt-3">{requestBox.id}</p>
						</div>
					</Card>
				</div>
			</PageWrapper>
		</>
	);
};

export default ApprovalAdminDetail;
