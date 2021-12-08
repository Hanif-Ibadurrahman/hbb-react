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
							let action = document.Id
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
							document.Id ? (
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
									{document.Id ? <>Edit Data</> : <>Tambah Data</>}
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
													name="No"
													placeholder="No Dokument"
													value={values.No}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.No && errors.No ? (
													<p className="tc-danger-5 pos-a p-sm">{errors.No}</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4">
												<Form.Label>Tanggal</Form.Label>
												<Form.Control
													type="date"
													name="Date"
													min={MinDate}
													placeholder="Date Document"
													value={values.Date}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.Date && errors.Date ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.Date}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4">
												<Form.Label>Detail</Form.Label>
												<Form.Control
													as="textarea"
													name="Detail"
													placeholder="Detail"
													value={values.Detail}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.Detail && errors.Detail ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.Detail}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4">
												<Form.Label>Nominal</Form.Label>
												<Form.Control
													type="number"
													name="Nominal"
													placeholder="Nominal"
													min="1"
													value={values.Nominal}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.Nominal && errors.Nominal ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.Nominal}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4">
												<Form.Label>Masa Aktif</Form.Label>
												<Form.Control
													type="number"
													name="ActiveYear"
													min={Year}
													value={values.ActiveYear}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.ActiveYear && errors.ActiveYear ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.ActiveYear}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4">
												<Form.Label>Level Progress</Form.Label>
												<Form.Control
													type="text"
													name="LevelProgress"
													value={values.LevelProgress}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.LevelProgress && errors.LevelProgress ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.LevelProgress}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4">
												<Form.Label>Media Storage</Form.Label>
												<Form.Control
													type="text"
													name="MediaStorage"
													value={values.MediaStorage}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.MediaStorage && errors.MediaStorage ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.MediaStorage}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4">
												<Form.Label>Kondisi Dokument</Form.Label>
												<Form.Control
													type="text"
													name="Condition"
													value={values.Condition}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.Condition && errors.Condition ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.Condition}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4">
												<Form.Label>Jumlah</Form.Label>
												<Form.Control
													type="number"
													min="1"
													name="Amount"
													value={values.Amount}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.Amount && errors.Amount ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.Amount}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4">
												<Form.Label>Cross Point</Form.Label>
												<Form.Control
													type="text"
													name="CrossPoint"
													value={values.CrossPoint}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.CrossPoint && errors.CrossPoint ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.CrossPoint}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4">
												<Form.Label>Deskripsi</Form.Label>
												<Form.Control
													as="textarea"
													name="Description"
													value={values.Description}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.Description && errors.Description ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.Description}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4">
												<Form.Label>No Digital</Form.Label>
												<Form.Control
													type="text"
													name="NoDigital"
													value={values.NoDigital}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.NoDigital && errors.NoDigital ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.NoDigital}
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
