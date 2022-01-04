import React, { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { PageWrapper } from "app/components/PageWrapper";
import Breadcrumb from "app/components/BreadCrumb";
import QR from "app/components/QRCode";
import "../master.scoped.scss";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDivisionDetail } from "actions/DivisionAction";
import {
	selectDivisions,
	selectDivision,
} from "store/Selector/DivisionSelector";
import { DivisionInterfaceState } from "store/Types/DivisionTypes";

const DivisionPageDetail = ({ match }) => {
	const Divisions: DivisionInterfaceState = useSelector(selectDivision);
	let history = useHistory();

	const goToPreviousPath = e => {
		e.preventDefault();
		history.goBack();
	};

	const divisions_id = match.params.id;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getDivisionDetail(divisions_id));
	}, []);

	return (
		<>
			<PageWrapper className="row w-100%">
				<Breadcrumb
					crumbs={["Dashboard", "Division", "Detail"]}
					selected
					className="mb-4"
				/>
				<div className="col col-9">
					<Card className="ph-5 pv-3 bd-rs-2">
						<Form className="mt-3">
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Nama Divisi</Form.Label>

								<Form.Control
									type="text"
									disabled
									defaultValue={Divisions.code_name}
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
			</PageWrapper>
		</>
	);
};

export default DivisionPageDetail;
