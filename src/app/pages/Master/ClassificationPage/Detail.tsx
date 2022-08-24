import React, { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { PageWrapper } from "app/components/PageWrapper";
import Breadcrumb from "app/components/BreadCrumb";
import QR from "app/components/QRCode";
import "../master.scoped.scss";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getClassificationDetail } from "actions/ClassificationAction";
import {
	selectClassification,
	selectClassifications,
} from "store/Selector/ClassificationSelector";
import { ClassificationInterfaceState } from "store/Types/ClassificationTypes";
import { getCompanyDetail } from "actions/CompanyAction";
import { selectCompany, selectCompanys } from "store/Selector/CompanySelector";
import { getAreaDetail } from "actions/AreaActions";
import { selectAreas, selectArea } from "store/Selector/AreaSelector";
import { AreaInterfaceState } from "store/Types/AreaTypes";

const ClassificationPageDetail = ({ match }) => {
	const classification: ClassificationInterfaceState =
		useSelector(selectClassification);
	let history = useHistory();

	const goToPreviousPath = e => {
		e.preventDefault();
		history.goBack();
	};

	const classification_id = match.params.id;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getClassificationDetail(classification_id));
	}, []);

	useEffect(() => {
		dispatch(getCompanyDetail(classification_id));
	}, []);

	return (
		<>
			<PageWrapper className="row w-100%">
				<Breadcrumb
					crumbs={["Dashboard", "Klasifikasi", "Detail"]}
					selected
					className="mb-4"
				/>
				<div className="col col-9">
					<Card className="ph-5 pv-3 bd-rs-2">
						<Form className="mt-3">
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Nama Klasifikasi</Form.Label>
								<Form.Control
									type="text"
									disabled
									defaultValue={classification.name}
								/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Kode Klasifikasi</Form.Label>
								<Form.Control
									type="text"
									disabled
									defaultValue={classification.code_classification}
								/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Tipe Klasifikasi</Form.Label>
								<Form.Control
									type="text"
									disabled
									defaultValue={classification.type}
								/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Company</Form.Label>
								<Form.Control
									type="text"
									disabled
									defaultValue={classification?.company?.name}
								/>
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
				{/* <div className="col col-3">
					<Card className="p-4 bd-rs-2 d-flex ai-center jc-center">
						<QR
							id="Detail-Box-QR"
							title="Scan here"
							value="ID : A12O2O3"
							className="d-flex jc-center"
						/>
						<div className="d-flex jc-center">
							<p className="p-xl ff-1-bd ta-center mt-3">{area.id}</p>
						</div>
					</Card>
				</div> */}
			</PageWrapper>
		</>
	);
};

export default ClassificationPageDetail;
