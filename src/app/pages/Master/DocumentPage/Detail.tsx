import React, { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { PageWrapper } from "app/components/PageWrapper";
import Breadcrumb from "app/components/BreadCrumb";
import QR from "app/components/QRCode";
import "../master.scoped.scss";
import api from "../../../../api/dox";
import PaginatedFolderResponse from "app/pages/Interface/cabinet";
import { useHistory } from "react-router-dom";
import moment from "moment";

export function DocumentPageDetail({ match }) {
	let history = useHistory();

	const goToPreviousPath = e => {
		e.preventDefault();
		history.goBack();
	};

	const [documentDetails, setdocumentDetails] = useState([]);

	const document_id = match.params.key;

	const getDocumentsData = async key => {
		const { data } = await api.get<PaginatedFolderResponse>(
			`/documents/${key}`,
		);
		const newData = data.data as any;
		return newData;
	};

	const getDocument = async key => {
		const details = await getDocumentsData(key);
		setdocumentDetails(details);
	};

	useEffect(() => {
		getDocument(document_id);
	}, []);

	const moment = require("moment");
	const date = moment(documentDetails["date"]).format("d MMMM YYYY");

	return (
		<>
			<PageWrapper className="row w-100%">
				<Breadcrumb
					crumbs={["Dashboard", "Document", "Detail"]}
					selected
					className="mb-4"
				/>
				<div className="col col-9">
					<Card className="ph-5 pv-3 bd-rs-2">
						<Form className="mt-3">
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>No Document</Form.Label>
								<Form.Control
									type="text"
									disabled
									defaultValue={documentDetails["no"]}
								/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Date</Form.Label>
								<Form.Control type="text" disabled defaultValue={date} />
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Tahun Dokumen Aktif</Form.Label>
								<Form.Control
									type="text"
									disabled
									defaultValue={documentDetails["active_year_for"]}
								/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Detail</Form.Label>
								<Form.Control
									as="textarea"
									className="notesdisable"
									disabled
									defaultValue={documentDetails["detail"]}
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
								<Button
									className="bg-success-6 mv-4 d-flex ai-center"
									variant="success"
								>
									<i className="far fa-edit mr-2 p-md"></i>
									<span className="text p-md">Edit Data</span>
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
							<p className="p-xl ff-1-bd ta-center mt-3">
								{documentDetails["no"]}
							</p>
						</div>
					</Card>
				</div>
			</PageWrapper>
		</>
	);
}
