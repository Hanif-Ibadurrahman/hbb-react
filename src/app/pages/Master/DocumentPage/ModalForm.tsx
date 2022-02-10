import { Form, Modal, Container, Row, Col, Button } from "react-bootstrap";
import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Alert from "app/components/Alerts";
import { selectBoxes, selectBox } from "../../../../store/Selector/BoxSelector";
import { useDispatch, useSelector } from "react-redux";
import { CreateBox, UpdateBox, RESET_BOX_FORM } from "actions/BoxActions";
import { BoxInterfaceState } from "store/Types/BoxTypes";
import { DocumentInterfaceState } from "store/Types/DocumentTypes";
import { selectDocument } from "store/Selector/DocumentSelector";
import {
	CreateDocument,
	RESET_DOCUMENT_FORM,
	UpdateDcoument,
} from "actions/DocumentAction";
import moment from "moment";

const ModalForm = props => {
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setalertMessage] = useState("");
	const document: DocumentInterfaceState = useSelector(selectDocument);
	const dispatch = useDispatch();

	function addDays(days) {
		const result = new Date();
		result.setDate(result.getDate() + days);
		return result;
	}

	const Year = moment(addDays(2)).format("YYYY");
	const MinDate = moment(addDays(0)).format("YYYY-MM-DD");

	console.log("year:", Year);

	const validationSchema = Yup.object().shape({
		No: Yup.string().required("*Wajib diisi"),
		Date: Yup.string().required("*Wajib diisi"),
		Detail: Yup.string().required("*Wajib diisi"),
		Nominal: Yup.number().required("*Wajib diisi"),
		ActiveYear: Yup.number().required("*Wajib diisi"),
		LevelProgress: Yup.string().required("*Wajib diisi"),
		MediaStorage: Yup.string().required("*Wajib diisi"),
		Condition: Yup.string().required("*Wajib diisi"),
		Amount: Yup.number().required("*Wajib diisi"),
		CrossPoint: Yup.string().required("*Wajib diisi"),
		Description: Yup.string().required("*Wajib diisi"),
		NoDigital: Yup.string().required("*Wajib diisi"),
	});

	return (
		<>
			<Alert
				text={alertMessage}
				variant="success"
				show={showAlert}
				style={{
					top: 50,
					position: "fixed",
					left: "50%",
					transform: [{ translateX: "-50%" }],
				}}
				onHide={() => setShowAlert(false)}
			/>

			<Modal
				show={props.modal}
				onHide={props.hide}
				aria-labelledby="contained-modal-title-vcenter"
			>
				{" "}
				<Formik
					validationSchema={validationSchema}
					initialValues={document}
					enableReinitialize={true}
					onSubmit={async values => {
						try {
							let action = document.id
								? UpdateDcoument(values)
								: CreateDocument(values);
							// dispatch(loadingbarTurnOn)
							const res = await action;
							await dispatch(res);
							action.then(() => {
								dispatch({ type: RESET_DOCUMENT_FORM });
								props.modalSet(props.valueModalSet);
							});
							dispatch({ type: RESET_DOCUMENT_FORM });
							props.modalSet(props.valueModalSet);
							document.id ? (
								<>Data Berhasil di Edit</>
							) : (
								<>Data Berhasil di Tambah</>
							);
							console.log(action);
						} catch (e) {
							console.log("ini error di depan");
						}
					}}
				>
					{({
						values,
						errors,
						touched,
						handleChange,
						handleBlur,
						handleSubmit,
						isSubmitting,
					}) => (
						<Form onSubmit={handleSubmit}>
							<Modal.Header closeButton className="bg-primary-5">
								<Modal.Title id="contained-modal-title-vcenter">
									{document.id ? <>Edit Data</> : <>Tambah Data</>}
								</Modal.Title>
							</Modal.Header>
							<Modal.Body className="show-grid">
								<Container>
									<Row>
										<Col xs={12}>
											<Form.Group className="mb-4">
												<Form.Label>Nomor Dokumen</Form.Label>
												<Form.Control
													type="text"
													name="no"
													placeholder="No Dokument"
													value={values.no}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.no && errors.no ? (
													<p className="tc-danger-5 pos-a p-sm">{errors.no}</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4">
												<Form.Label>Tanggal</Form.Label>
												<Form.Control
													type="date"
													name="date"
													min={MinDate}
													placeholder="Date Document"
													value={values.date}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.date && errors.date ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.date}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4">
												<Form.Label>Detail</Form.Label>
												<Form.Control
													as="textarea"
													name="detail"
													placeholder="Detail"
													value={values.detail}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.detail && errors.detail ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.detail}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4">
												<Form.Label>Nominal</Form.Label>
												<Form.Control
													type="number"
													name="nominal"
													placeholder="Nominal"
													min="1"
													value={values.nominal}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.nominal && errors.nominal ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.nominal}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4">
												<Form.Label>Masa Aktif</Form.Label>
												<Form.Control
													type="number"
													name="active_year_for"
													min={Year}
													value={values.active_year_for}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.active_year_for && errors.active_year_for ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.active_year_for}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4">
												<Form.Label>Level Progress</Form.Label>
												<Form.Control
													type="text"
													name="level_progress"
													value={values.level_progress}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.level_progress && errors.level_progress ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.level_progress}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4">
												<Form.Label>Media Storage</Form.Label>
												<Form.Control
													type="text"
													name="media_storage"
													value={values.media_storage}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.media_storage && errors.media_storage ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.media_storage}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4">
												<Form.Label>Kondisi Dokument</Form.Label>
												<Form.Control
													type="text"
													name="condition"
													value={values.condition}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.condition && errors.condition ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.condition}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4">
												<Form.Label>Jumlah</Form.Label>
												<Form.Control
													type="number"
													min="1"
													name="amount"
													value={values.amount}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.amount && errors.amount ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.amount}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4">
												<Form.Label>Cross Point</Form.Label>
												<Form.Control
													type="text"
													name="cross_point"
													value={values.cross_point}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.cross_point && errors.cross_point ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.cross_point}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4">
												<Form.Label>Deskripsi</Form.Label>
												<Form.Control
													as="textarea"
													name="description"
													value={values.description}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.description && errors.description ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.description}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4">
												<Form.Label>No Digital</Form.Label>
												<Form.Control
													type="text"
													name="no_digital"
													value={values.no_digital}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.no_digital && errors.no_digital ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.no_digital}
													</p>
												) : null}
											</Form.Group>
										</Col>
									</Row>
								</Container>
							</Modal.Body>
							<Modal.Footer>
								<Button variant="danger" onClick={props.hide}>
									Close
								</Button>
								<Button
									type="submit"
									disabled={isSubmitting}
									className="bg-success-6"
									variant="success"
								>
									Request
								</Button>{" "}
							</Modal.Footer>
						</Form>
					)}
				</Formik>
			</Modal>
		</>
	);
};

export default ModalForm;
