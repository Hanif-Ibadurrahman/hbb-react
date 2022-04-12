import { Form, Modal, Container, Row, Col, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Alert from "app/components/Alerts";
import { connect } from "react-redux";
import {
	selectCabinets,
	selectCabinet,
} from "../../../../store/Selector/CabinetSelector";
import {
	CreateCabinet,
	UpdateCabinet,
	RESET_CABINET_FORM,
} from "actions/CabinetAction";
import { useDispatch, useSelector } from "react-redux";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { CabinetInterfaceState } from "store/Types/CabinetTypes";
import { RoomsInterfaceState } from "store/Types/RoomTypes";
import { selectRooms, selectRoom } from "store/Selector/RoomSelector";
import { getRoomsList } from "actions/RoomAction";

export const ModalForm = props => {
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [varianAlert, setVarianAlert] = useState("");
	const cabinet: CabinetInterfaceState = useSelector(selectCabinet);
	const rooms: RoomsInterfaceState = useSelector(selectRooms);

	const dispatch = useDispatch();

	const validationSchema = Yup.object().shape({
		code_cabinet: Yup.string().required("*Wajib diisi"),
		block_number: Yup.string().required("*Wajib diisi"),
		total_bays: Yup.string().required("*Wajib diisi"),
		total_rows: Yup.string().required("*Wajib diisi"),
		total_columns: Yup.string().required("*Wajib diisi"),
		depth: Yup.string().required("*Wajib diisi"),
	});

	const FetchData = (page = 1) => {
		dispatch(getRoomsList(page));
	};

	useEffect(() => {
		FetchData();
	}, []);

	return (
		<>
			<Alert
				text={alertMessage}
				variant={varianAlert}
				show={showAlert}
				style={{
					top: 50,
					position: "fixed",
					left: "50%",
					transform: [{ translateX: "50%" }],
				}}
				onHide={() => setShowAlert(false)}
			/>
			<Modal
				show={props.modal}
				onHide={props.hide}
				arialabelledby="containedmodaltitlevcenter"
			>
				{" "}
				<Formik
					validationSchema={validationSchema}
					initialValues={cabinet}
					enableReinitialize={true}
					onSubmit={async values => {
						try {
							let action = cabinet.id
								? UpdateCabinet(values)
								: CreateCabinet(values);
							const res = await action;
							await dispatch(res);
							action.then(() => {
								dispatch({ type: RESET_CABINET_FORM });
								props.modalSet(props.valueModalSet);
							});
							dispatch({ type: RESET_CABINET_FORM });
							props.modalSet(props.valueModalSet);
							setShowAlert(true);
							setVarianAlert("success");
							cabinet.id
								? setAlertMessage("Data Berhasil di Edit")
								: setAlertMessage("Data Berhasil di Tambah");
							setTimeout(function () {
								window.location.reload();
							}, 1000);
						} catch (e) {
							setShowAlert(true);
							setAlertMessage("Gagal Update Data");
							setVarianAlert("danger");
							setTimeout(function () {
								setShowAlert(false);
							}, 4000);
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
									{cabinet.id ? <>Edit Data</> : <>Tambah Data</>}
								</Modal.Title>
							</Modal.Header>
							<Modal.Body className="show-grid">
								<Container>
									<Row>
										<Col xs={12}>
											<Form onSubmit={handleSubmit}>
												<Form.Group className="mb-4" controlId="formBasicEmail">
													<Form.Label>Pilih Ruangan</Form.Label>
													<Autocomplete
														id="room"
														options={rooms.Rooms}
														value={values.room}
														getOptionLabel={option => option.code_room}
														onChange={(e, value) => {
															setFieldValue(
																"room",
																value !== null ? value : values.room.code_room,
															);
														}}
														renderInput={params => (
															<TextField
																margin="normal"
																placeholder="Area"
																name="area_id"
																{...params}
															/>
														)}
													/>
												</Form.Group>
												<Form.Group className="mb-4" controlId="formname">
													<Form.Label>Code Cabinet</Form.Label>
													<Form.Control
														type="text"
														name="code_cabinet"
														placeholder="Code"
														value={values.code_cabinet}
														onChange={e => {
															handleChange(e);
														}}
														onBlur={handleBlur}
													/>
													{touched.code_cabinet && errors.code_cabinet ? (
														<p className="tcdanger5 posa psm">
															{errors.code_cabinet}
														</p>
													) : null}
												</Form.Group>
												<Form.Group className="mb-4" controlId="formname">
													<Form.Label>Nomor Blok</Form.Label>
													<Form.Control
														type="number"
														name="block_number"
														placeholder="Bays"
														value={values.block_number}
														onChange={e => {
															handleChange(e);
														}}
														onBlur={handleBlur}
													/>
													{touched.block_number && errors.block_number ? (
														<p className="tcdanger5 posa psm">
															{errors.block_number}
														</p>
													) : null}
												</Form.Group>
												<Form.Group className="mb-4" controlId="formname">
													<Form.Label>Jumlah Bays</Form.Label>
													<Form.Control
														type="number"
														name="total_bays"
														placeholder="Bays"
														value={values.total_bays}
														onChange={e => {
															handleChange(e);
														}}
														onBlur={handleBlur}
													/>
													{touched.total_bays && errors.total_bays ? (
														<p className="tcdanger5 posa psm">
															{errors.total_bays}
														</p>
													) : null}
												</Form.Group>
												<Form.Group className="mb-4" controlId="formname">
													<Form.Label>Jumlah Baris</Form.Label>
													<Form.Control
														type="number"
														name="total_rows"
														placeholder="Jumlah Baris"
														value={values.total_rows}
														onChange={e => {
															handleChange(e);
														}}
														onBlur={handleBlur}
													/>
													{touched.total_rows && errors.total_rows ? (
														<p className="tcdanger5 posa psm">
															{errors.total_rows}
														</p>
													) : null}
												</Form.Group>
												<Form.Group className="mb-4" controlId="formname">
													<Form.Label>Jumlah Column</Form.Label>
													<Form.Control
														type="number"
														name="total_columns"
														placeholder="columns"
														value={values.total_columns}
														onChange={e => {
															handleChange(e);
														}}
														onBlur={handleBlur}
													/>
													{touched.total_columns && errors.total_columns ? (
														<p className="tcdanger5 posa psm">
															{errors.total_columns}
														</p>
													) : null}
												</Form.Group>
												<Form.Group className="mb-4" controlId="formname">
													<Form.Label>Depth</Form.Label>
													<Form.Control
														type="number"
														name="depth"
														placeholder="Depth"
														value={values.depth}
														onChange={e => {
															handleChange(e);
														}}
														onBlur={handleBlur}
													/>
													{touched.depth && errors.depth ? (
														<p className="tcdanger5 posa psm">{errors.depth}</p>
													) : null}
												</Form.Group>
											</Form>
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
									className="bgsuccess6"
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
