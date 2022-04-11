import { Form, Modal, Container, Row, Col, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Alert from "app/components/Alerts";
import {
	selectRoom,
	selectRooms,
} from "../../../../store/Selector/RoomSelector";
import { useDispatch, useSelector } from "react-redux";
import { CreateRoom, UpdateRoom, RESET_ROOM_FORM } from "actions/RoomAction";
import { RoomInterfaceState } from "store/Types/RoomTypes";
import { Autocomplete, TextField } from "@mui/material";
import { AreasInterfaceState } from "store/Types/AreaTypes";
import { selectAreas, selectArea } from "store/Selector/AreaSelector";
import { getAreasList } from "actions/AreaActions";

const ModalForm = props => {
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [varianAlert, setVarianAlert] = useState("");
	const room: RoomInterfaceState = useSelector(selectRoom);
	const area: AreasInterfaceState = useSelector(selectAreas);
	const dispatch = useDispatch();
	const validationSchema = Yup.object().shape({
		code_room: Yup.string().required("*Wajib diisi"),
		name: Yup.string().required("*Wajib diisi"),
	});

	const FetchData = (page = 1) => {
		dispatch(getAreasList(page));
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
				aria-labelledby="contained-modal-title-vcenter"
			>
				{" "}
				<Formik
					validationSchema={validationSchema}
					initialValues={room}
					enableReinitialize={true}
					onSubmit={async values => {
						try {
							let action = room.id ? UpdateRoom(values) : CreateRoom(values);
							const res = await action;
							await dispatch(res);
							action.then(() => {
								dispatch({ type: RESET_ROOM_FORM });
								props.modalSet(props.valueModalSet);
								setShowAlert(true);
								setVarianAlert("success");
								room.id
									? setAlertMessage("Data Berhasil di Edit")
									: setAlertMessage("Data Berhasil di Tambah");
								setTimeout(function () {
									window.location.reload();
								}, 1000);
							});
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
							{console.log("valued", values)}
							<Modal.Header closeButton className="bg-primary-5">
								<Modal.Title id="contained-modal-title-vcenter">
									{room.id ? <>Edit Data</> : <>Tambah Data</>}
								</Modal.Title>
							</Modal.Header>
							<Modal.Body className="show-grid">
								<Container>
									<Row>
										<Col xs={12}>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Nama Ruangan</Form.Label>
												<Form.Control
													type="text"
													name="name"
													placeholder="Nama Ruangan"
													value={values.name}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.name && errors.name ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.name}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Kode Ruangan</Form.Label>
												<Form.Control
													type="text"
													name="code_room"
													placeholder="Kode Ruangan"
													value={values.code_room}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.code_room && errors.code_room ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.code_room}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Pilih Area</Form.Label>
												<Autocomplete
													id="area"
													options={area.Areas}
													value={values.area}
													getOptionLabel={option => option.code_area}
													onChange={(e, value) => {
														setFieldValue(
															"area",
															value !== null ? value : values.area.code_area,
														);
													}}
													renderInput={params => (
														<TextField
															margin="normal"
															placeholder="Area"
															name="area"
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
									disabled={isSubmitting || values.area.id === ""}
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
