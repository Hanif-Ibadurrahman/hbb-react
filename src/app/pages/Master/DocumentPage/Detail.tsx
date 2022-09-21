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
import Swal from "sweetalert2";
import Alert from "app/components/Alerts";
import { deleteAttachmentDoc } from "api/documents";

const DocumentPageDetail = ({ match }) => {
	const document: DocumentInterfaceState = useSelector(selectDocument);
	let history = useHistory();
	const [showAlertSuccess, setShowAlertSuccess] = useState(false);

	const onDelete = id => {
		const newData = document?.document_file?.filter(data => data !== id);
		const payload = newData.map(data => {
			const delBefore = data.substring(data.indexOf("attachment"));
			const url = delBefore.substring(0, delBefore.indexOf("?"));
			return url;
		});
		Swal.fire({
			text: "Apakah anda ingin menghapus data ini?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#d33",
			confirmButtonText: "Hapus",
		}).then(willDelete => {
			if (willDelete.isConfirmed) {
				deleteAttachmentDoc(document.id, payload);
				setShowAlertSuccess(true);
				setTimeout(function () {
					setShowAlertSuccess(false);
				}, 4000);
				setTimeout(function () {
					window.location.reload();
				}, 1000);
			}
		});
	};

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
			<Alert
				text="Data Berhasil Di Hapus"
				variant="success"
				show={showAlertSuccess}
				onHide={() => setShowAlertSuccess(false)}
			/>
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
								<Form.Control type="text" disabled value={document?.nominal} />
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
							<Form.Group className="mb-3">
								<Form.Label>Lampiran File</Form.Label>
								{document?.document_file?.length > 0 ? (
									<>
										{document?.document_file?.map((data, index) => (
											<div className="d-flex ai-center">
												<div
													className="mb-3 w-50%"
													onClick={() =>
														window.open(
															`${data}`,
															"popup",
															"width=1200,height=1200",
														)
													}
												>
													<div className="d-flex jc-center ai-center mt-3">
														<div style={{ minWidth: "30px" }}>
															<div>{index + 1}</div>
														</div>
														<Form.Control
															type="text"
															disabled
															value={`Lampiran ${index + 1}`}
															style={{ color: "blue", cursor: "pointer" }}
														/>
													</div>
												</div>
												<Button
													variant="danger"
													className="d-flex jc-center ai-center"
													onClick={() => onDelete(data)}
													style={{
														height: "38px",
														width: "38px",
														marginLeft: "24px",
													}}
												>
													<i className="far fa-times"></i>
												</Button>
											</div>
										))}
									</>
								) : (
									<>
										<Form.Control type="text" disabled defaultValue="-" />
									</>
								)}
							</Form.Group>
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
							value={document?.sign_code || "-"}
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
