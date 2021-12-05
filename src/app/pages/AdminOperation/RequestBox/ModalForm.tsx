import { Form, Modal, Container, Row, Col, Button } from "react-bootstrap";
import React, { useState } from "react";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";
import Alert from "app/components/Alerts";
import { useDispatch, useSelector } from "react-redux";
import {
	SelectApprovalAdmin,
	SelectApprovalOperation,
	selectRequestBox,
	selectRequestBoxes,
} from "../../../../store/Selector/RequestBoxSelector";
import {
	CreateRequestBox,
	UpdateRequestBox,
	ApprovalAdmin,
	ApprovalOpertaion,
	RejectOpertaion,
	RESET_REQUEST_BOX_FORM,
} from "actions/RequestBoxAction";
import {
	RequestBoxInterfaceState,
	ApprovalInterfaceState,
	ApprovalOperationInterfaceState,
} from "store/Types/RequestBoxTypes";
import { Autocomplete, TextField } from "@mui/material";
import moment from "moment";

const Driver = [
	{ id: "10c7780a-f456-44f9-b47a-cdb00daa8ce7", driver: "Andri Sanjaya" },
	{ id: "10c7780a-f456-44f9-b47a-cdb00daa8ce7", driver: "Wawan Sutisna" },
	{ id: "10c7780a-f456-44f9-b47a-cdb00daa8ce7", driver: "Eky Rahman" },
	{ id: "10c7780a-f456-44f9-b47a-cdb00daa8ce7", driver: "Luki Hakim" },
	{ id: "10c7780a-f456-44f9-b47a-cdb00daa8ce7", driver: "Mamat Suparman" },
];

const Archiver = [
	{ id: "159c8fc3-6ead-4dbf-9a7d-6152e4fca0da", archiver: "Wiwin Sunarsih" },
	{ id: "159c8fc3-6ead-4dbf-9a7d-6152e4fca0da", archiver: "Rico Abdan" },
	{ id: "159c8fc3-6ead-4dbf-9a7d-6152e4fca0da", archiver: "Herman Jumawan" },
	{ id: "159c8fc3-6ead-4dbf-9a7d-6152e4fca0da", archiver: "Hakim Ahmad" },
	{ id: "159c8fc3-6ead-4dbf-9a7d-6152e4fca0da", archiver: "Ilman Sudari" },
];

export const ModalFormReject = props => {
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setalertMessage] = useState("");
	const requestBox: RequestBoxInterfaceState = useSelector(selectRequestBox);
	// const requestBoxes: useSelector(selectRequestBoxes);
	const approvalAdmin: ApprovalInterfaceState =
		useSelector(SelectApprovalAdmin);

	const dispatch = useDispatch();
	const validationSchema = Yup.object().shape({
		Description: Yup.string().required("*Wajib diisi"),
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
					initialValues={approvalAdmin}
					enableReinitialize={true}
					onSubmit={async values => {
						try {
							values.Id = requestBox.Id;
							dispatch(await RejectOpertaion(values));
							dispatch({ type: RESET_REQUEST_BOX_FORM });
							props.modalSet(props.valueModalSet);
							approvalAdmin.Id ? (
								<>Data Berhasil di Edit</>
							) : (
								<>Data Berhasil di Tambah</>
							);
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
									Tambah Keterangan
								</Modal.Title>
							</Modal.Header>
							<Modal.Body className="show-grid">
								<Container>
									<Row>
										<Col xs={12}>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Deskripsi</Form.Label>
												<Form.Control
													type="text"
													name="Description"
													placeholder="Description"
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
									Kirim
								</Button>{" "}
							</Modal.Footer>
						</Form>
					)}
				</Formik>
			</Modal>
		</>
	);
};

export const ModalFormApprove = props => {
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setalertMessage] = useState("");
	const requestBox: RequestBoxInterfaceState = useSelector(selectRequestBox);
	// const requestBoxes: useSelector(selectRequestBoxes);
	// const approvalAdmin: ApprovalInterfaceState = useSelector(SelectApprovalAdmin);
	const approvalOperation: ApprovalOperationInterfaceState = useSelector(
		SelectApprovalOperation,
	);

	const dispatch = useDispatch();
	function addDays(days) {
		const result = new Date();
		result.setDate(result.getDate() + days);
		return result;
	}
	const DeliveredDate = moment(addDays(2)).format("YYYY-MM-DD");
	const validationSchema = Yup.object().shape({
		Date: Yup.string().required("*Wajib diisi"),
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
				show={props.modalApprove}
				onHide={props.hide}
				aria-labelledby="contained-modal-title-vcenter"
			>
				{" "}
				<Formik
					validationSchema={validationSchema}
					initialValues={approvalOperation}
					enableReinitialize={true}
					onSubmit={async values => {
						try {
							values.Id = requestBox.Id;
							values.Approved = true;
							values.Transporter = "10c7780a-f456-44f9-b47a-cdb00daa8ce7";
							values.Archiver = "159c8fc3-6ead-4dbf-9a7d-6152e4fca0da";
							dispatch(await ApprovalOpertaion(values));
							dispatch({ type: RESET_REQUEST_BOX_FORM });
							props.modalSet(props.valueModalSet);
							approvalOperation.Id ? (
								<>Data Berhasil di Edit</>
							) : (
								<>Data Berhasil di Tambah</>
							);
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
									Tambah Keterangan
								</Modal.Title>
							</Modal.Header>
							<Modal.Body className="show-grid">
								<Container>
									<Row>
										<Col xs={12}>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Tanggal Pengiriman</Form.Label>
												<Form.Control
													type="date"
													min={DeliveredDate}
													name="Date"
													placeholder="Date"
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
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Pilih Archiver</Form.Label>
												<Autocomplete
													id="Archiver"
													options={Archiver}
													// value={values.Transporter = Archiver["id"]}
													getOptionLabel={option => option.archiver}
													renderInput={params => (
														<TextField {...params} label="..." />
													)}
													onChange={(event, newValue) => {
														console.log(
															JSON.stringify(newValue?.id, null, " "),
														);
													}}
												/>
											</Form.Group>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Pilih Driver</Form.Label>
												<Autocomplete
													id="Driver"
													options={Driver}
													// value={values.Transporter = Driver["id"]}
													getOptionLabel={option => option.driver}
													renderInput={params => (
														<TextField {...params} label="..." />
													)}
													onChange={(event, newValue) => {
														console.log(JSON.stringify(newValue, null, " "));
													}}
												/>
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
									Kirim
								</Button>{" "}
							</Modal.Footer>
						</Form>
					)}
				</Formik>
			</Modal>
		</>
	);
};
