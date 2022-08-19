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

	const newDate = moment(document?.date).format("d MMMM YYYY");

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
								<Form.Control
									type="text"
									disabled
									defaultValue={document?.no}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Tanggal</Form.Label>
								<Form.Control
									type="text"
									disabled
									value={document?.date ? newDate : "-"}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Detail</Form.Label>
								<Form.Control
									as="textarea"
									disabled
									defaultValue={document?.detail}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Nominal</Form.Label>
								<Form.Control
									type="text"
									disabled
									defaultValue={document?.nominal}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Masa Aktif Dokument</Form.Label>
								<Form.Control
									type="text"
									disabled
									defaultValue={document?.active_year_for}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Media Penyimpanan</Form.Label>
								<Form.Control
									type="text"
									disabled
									defaultValue={document?.media_storage}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Kondisi</Form.Label>
								<Form.Control
									type="text"
									disabled
									defaultValue={document?.condition}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Deskripsi</Form.Label>
								<Form.Control
									as="textarea"
									disabled
									defaultValue={document?.description}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>No Digital</Form.Label>
								<Form.Control
									type="text"
									disabled
									defaultValue={document?.no_digital}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Level Progress</Form.Label>
								<Form.Control
									type="text"
									disabled
									value={document?.level_progress}
								/>
							</Form.Group>
							<div
								className="mb-3"
								onClick={() =>
									window.open(`${document.document_file}`, "_blank")
								}
							>
								<Form.Label>Lampiran File</Form.Label>
								<Form.Control
									type="text"
									disabled
									defaultValue={document?.document_file?.slice(52)}
									style={{ color: "blue", cursor: "pointer" }}
								/>
							</div>
							<Form.Group className="mb-3">
								<Form.Label>No Folder</Form.Label>
								<Form.Control
									type="text"
									disabled
									defaultValue={document?.folder?.no}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>No Box</Form.Label>
								<Form.Control
									type="text"
									disabled
									value={document?.box?.code_box}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Index</Form.Label>
								<Form.Control
									type="text"
									disabled
									value={document?.index?.index}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>No Lemari</Form.Label>
								<Form.Control
									type="text"
									disabled
									defaultValue={document?.cabinet?.code_cabinet}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Divisi</Form.Label>
								<Form.Control
									type="text"
									disabled
									defaultValue={document?.division?.name}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Perusahaan</Form.Label>
								<Form.Control
									type="text"
									disabled
									defaultValue={document?.company?.name}
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
							value={document.sign_code}
							className="d-flex jc-center"
						/>
						<div className="d-flex jc-center">
							<p className="p-xl ff-1-bd ta-center mt-3">Document Barcode</p>
						</div>
					</Card>
				</div>
			</PageWrapper>
		</>
	);
};

export default DocumentPageDetail;
