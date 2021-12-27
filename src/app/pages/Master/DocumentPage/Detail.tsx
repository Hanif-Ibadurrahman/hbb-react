import React, { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { PageWrapper } from "app/components/PageWrapper";
import Breadcrumb from "app/components/BreadCrumb";
import QR from "app/components/QRCode";
import "../master.scoped.scss";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DocumentInterfaceState } from "store/Types/DocumentTypes";
import { selectDocument } from "store/Selector/DocumentSelector";
import { getDocumentDetail } from "actions/DocumentAction";
import moment from "moment";

const DocumentPageDetail = ({ match }) => {
	const document: DocumentInterfaceState = useSelector(selectDocument);
	let history = useHistory();

	const goToPreviousPath = e => {
		e.preventDefault();
		history.goBack();
	};

	const document_id = match.params.id;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getDocumentDetail(document_id));
	}, []);

	const NewDate = moment(document.Date).format("d MMMM YYYY");

	console.log("Sign Code", document.SignCode);

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
							<Form.Group className="mb-3">
								<Form.Label>No Document</Form.Label>
								<Form.Control type="text" disabled defaultValue={document.No} />
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Tanggal</Form.Label>
								<Form.Control type="text" disabled defaultValue={NewDate} />
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Detail</Form.Label>
								<Form.Control
									type="text"
									disabled
									defaultValue={document.Detail}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Nominal</Form.Label>
								<Form.Control
									type="text"
									disabled
									defaultValue={document.Nominal}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Masa Aktif Dokument</Form.Label>
								<Form.Control
									type="text"
									disabled
									defaultValue={document.ActiveYear}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Progress Level</Form.Label>
								<Form.Control
									type="text"
									disabled
									defaultValue={document.LevelProgress}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Media Penyimpanan</Form.Label>
								<Form.Control
									type="text"
									disabled
									defaultValue={document.MediaStorage}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Kondisi</Form.Label>
								<Form.Control
									type="text"
									disabled
									defaultValue={document.Condition}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Jumlah</Form.Label>
								<Form.Control
									type="text"
									disabled
									defaultValue={document.Amount}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Cross Point</Form.Label>
								<Form.Control
									type="text"
									disabled
									defaultValue={document.CrossPoint}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Deskripsi</Form.Label>
								<Form.Control
									type="text"
									disabled
									defaultValue={document.Description}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>No Digital</Form.Label>
								<Form.Control
									type="text"
									disabled
									defaultValue={document.NoDigital}
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
				<div className="col col-3">
					<Card className="p-4 bd-rs-2 d-flex ai-center jc-center">
						<QR
							id="Detail-Box-QR"
							title="Scan here"
							value={document.SignCode}
							className="d-flex jc-center"
						/>
						<div className="d-flex jc-center">
							<p className="p-xl ff-1-bd ta-center mt-3">Document</p>
						</div>
					</Card>
				</div>
			</PageWrapper>
		</>
	);
};

export default DocumentPageDetail;
