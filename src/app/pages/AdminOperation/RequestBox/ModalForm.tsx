import { Form, Modal, Container, Row, Col, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Alert from "app/components/Alerts";
import { useDispatch, useSelector } from "react-redux";
import {
	SelectApprovalAdmin,
	SelectApprovalOperation,
	selectRequestBox,
} from "../../../../store/Selector/RequestBoxSelector";
import {
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
import { selectTransporters } from "store/Selector/TransporterSelector";
import { getTransporterList } from "actions/TransporterAction";
import { selectArchivers } from "store/Selector/ArchiverSelector";
import { getArchiverList } from "actions/ArchiverAction";
import "./autocomplete.scoped.scss";

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
				text="Data di Reject"
				variant="danger"
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
							values.Id = requestBox.id;
							dispatch(await RejectOpertaion(values));
							setShowAlert(true);
							setTimeout(function () {
								window.location.reload();
							}, 1000);
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
	// const [alertMessage, setalertMessage] = useState("");
	const requestBox: RequestBoxInterfaceState = useSelector(selectRequestBox);
	const approvalOperation: ApprovalOperationInterfaceState = useSelector(
		SelectApprovalOperation,
	);
	const dispatch = useDispatch();

	const transporter = useSelector(selectTransporters);
	const archiver = useSelector(selectArchivers);

	console.log("driver >>>>", transporter.Transporters);
	console.log("archiver >>>>", archiver.Archivers);

	const FetchData = (page = 1) => {
		dispatch(getTransporterList(page));
	};

	const ArchiverData = (page = 1) => {
		dispatch(getArchiverList(page));
	};

	useEffect(() => {
		ArchiverData();
	}, []);

	useEffect(() => {
		FetchData();
	}, []);

	function addDays(days) {
		const result = new Date();
		result.setDate(result.getDate() + days);
		return result;
	}
	const DeliveredDate = moment(addDays(2)).format("YYYY-MM-DD");
	const validationSchema = Yup.object().shape({
		delivery_date: Yup.string().required("*Wajib diisi"),
	});

	return (
		<>
			<Alert
				text="Data Berhasil Approve"
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
							console.log("Kambing Hitam", values);

							values.id = requestBox.id;
							values.is_approved = true;
							dispatch(await ApprovalOpertaion(values));
							dispatch({ type: RESET_REQUEST_BOX_FORM });
							props.modalSet(props.valueModalSet);
							setShowAlert(true);
							// setTimeout(function () {
							// 	window.location.reload();
							// }, 1000);
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
						setFieldValue,
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
													name="delivery_date"
													placeholder="Date"
													value={values.delivery_date}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.delivery_date && errors.delivery_date ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.delivery_date}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Pilih Archiver</Form.Label>
												<Autocomplete
													id="archiver_id"
													options={archiver.Archivers}
													getOptionLabel={option => option.staff.name}
													onChange={(e, value) => {
														console.log(value);
														setFieldValue(
															"archiver_id",
															value !== null ? value : values.archiver_id,
														);
													}}
													renderInput={params => (
														<TextField
															margin="normal"
															placeholder="Archiver"
															name="archiver_id"
															{...params}
														/>
													)}
												/>
											</Form.Group>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Pilih Driver</Form.Label>
												<Autocomplete
													id="transporter_id"
													options={transporter.Transporters}
													getOptionLabel={option => option.staff.name}
													onChange={(e, value) => {
														console.log(value);
														setFieldValue(
															"transporter_id",
															value !== null ? value : values.transporter_id,
														);
													}}
													renderInput={params => (
														<TextField
															margin="normal"
															placeholder="Transporter"
															name="transporter_id"
															{...params}
														/>
													)}
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
