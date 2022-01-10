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
	const [alertMessage, setalertMessage] = useState("");
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
		// area_id: Yup.string().required("*Wajib diisi"),
	});

	console.log("Room >>>>", rooms.Rooms);

	const FetchData = (page = 1) => {
		dispatch(getRoomsList(page));
	};

	useEffect(() => {
		FetchData();
	}, []);

	return (
		<>
			<Alert
				text="Data Berhasil Di Input"
				variant="success"
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
							// dispatch(loadingbarTurnOn)
							const res = await action;
							await dispatch(res);
							action.then(() => {
								dispatch({ type: RESET_CABINET_FORM });
								props.modalSet(props.valueModalSet);
							});
							dispatch({ type: RESET_CABINET_FORM });
							props.modalSet(props.valueModalSet);
							cabinet.id ? (
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
												{console.log(values)}
												<Form.Group className="mb-4" controlId="formBasicEmail">
													<Form.Label>Pilih Area</Form.Label>
													<Autocomplete
														id="room"
														options={rooms.Rooms}
														getOptionLabel={option => option.code_room}
														onChange={(e, value) => {
															console.log(value);
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
													<Form.Label>Block Number</Form.Label>
													<Form.Control
														type="text"
														name="block_number"
														placeholder="Blok"
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
													<Form.Label>Bays</Form.Label>
													<Form.Control
														type="text"
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
													<Form.Label>Row</Form.Label>
													<Form.Control
														type="text"
														name="total_rows"
														placeholder="Row"
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
													<Form.Label>Columns</Form.Label>
													<Form.Control
														type="text"
														name="total_columns"
														placeholder="Columns"
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
													<Form.Label>Muatan</Form.Label>
													<Form.Control
														type="text"
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
