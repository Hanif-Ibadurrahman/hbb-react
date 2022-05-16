import { Form, Modal, Container, Row, Col, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import Alert from "app/components/Alerts";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete, TextField } from "@mui/material";
import { IndexingInterfaceState } from "store/Types/IndexingTypes";
import { selectindexing } from "store/Selector/IndexingSelector";
import { selectAreas } from "store/Selector/AreaSelector";
import { selectRooms } from "store/Selector/RoomSelector";
import { getAreasList } from "actions/AreaActions";
import { getRoomsList } from "actions/RoomAction";
import {
	CreateIndexing,
	RESET_INDEX_FORM,
	UpdateIndexing,
} from "actions/IndexingAction";

const ModalForm = props => {
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [varianAlert, setVarianAlert] = useState("");
	const indexing: IndexingInterfaceState = useSelector(selectindexing);
	const dispatch = useDispatch();
	const area = useSelector(selectAreas);
	const room = useSelector(selectRooms);
	const FetchData = (page = 1) => {
		dispatch(getAreasList(page));
	};
	const RoomData = (page = 1) => {
		dispatch(getRoomsList(page));
	};
	useEffect(() => {
		FetchData();
	}, []);
	useEffect(() => {
		RoomData();
	}, []);
	const validationSchema = Yup.object().shape({
		index: Yup.string().required("*Wajib diisi"),
		date: Yup.string().required("*Wajib diisi"),
		type: Yup.string().required("*Wajib diisi"),
		classification: Yup.string().required("*Wajib diisi"),
		date_retention: Yup.string().required("*Wajib diisi"),
		retention_period: Yup.string().required("*Wajib diisi"),
	});

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
					initialValues={indexing}
					enableReinitialize={true}
					onSubmit={async values => {
						try {
							let action = indexing?.id
								? UpdateIndexing(values)
								: CreateIndexing(values);
							const res = await action;
							await dispatch(res);
							action.then(() => {
								dispatch({ type: RESET_INDEX_FORM });
								props.modalSet(props.valueModalSet);
								setShowAlert(true);
								setVarianAlert("success");
								indexing.id
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
						setFieldValue,
						isSubmitting,
					}) => (
						<Form onSubmit={handleSubmit}>
							{console.log("values >>>>", values)}
							<Modal.Header closeButton className="bg-primary-5">
								<Modal.Title id="contained-modal-title-vcenter">
									{indexing.id ? <>Edit Data</> : <>Tambah Data</>}
								</Modal.Title>
							</Modal.Header>
							<Modal.Body className="show-grid">
								<Container>
									<Row>
										<Col xs={12}>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Index</Form.Label>
												<Form.Control
													type="text"
													name="index"
													placeholder="Title Index"
													value={values.index}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.index && errors.index ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.index}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Tanggal</Form.Label>
												<Form.Control
													type="date"
													name="date"
													placeholder="Pilih Tanggal"
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
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Tipe</Form.Label>
												<Form.Control
													type="text"
													name="type"
													placeholder="Tipe"
													value={values.type}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.type && errors.type ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.type}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Klasifikasi</Form.Label>
												<Form.Control
													type="text"
													name="classification"
													placeholder="Pilih Tanggal"
													value={values.classification}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.classification && errors.classification ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.classification}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Pilih Area</Form.Label>
												<Autocomplete
													id="company"
													options={area.Areas}
													getOptionLabel={option => option.name}
													value={values.area_id}
													onChange={(e, value) => {
														setFieldValue(
															"area_id",
															value !== null ? value : values.area_id,
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
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Pilih Ruangan</Form.Label>
												<Autocomplete
													id="company"
													options={room.Rooms}
													getOptionLabel={option => option.name}
													value={values.room_id}
													onChange={(e, value) => {
														setFieldValue(
															"room_id",
															value !== null ? value : values.room_id,
														);
													}}
													renderInput={params => (
														<TextField
															margin="normal"
															placeholder="Ruangan"
															name="room_id"
															{...params}
														/>
													)}
												/>
											</Form.Group>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Periode Retensi</Form.Label>
												<Form.Control
													type="number"
													min="0"
													name="retention_period"
													placeholder="Periode Retensi"
													value={values.retention_period}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.retention_period && errors.retention_period ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.retention_period}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Tanggal Retensi</Form.Label>
												<Form.Control
													type="date"
													name="date_retention"
													placeholder="Pilih Tanggal"
													value={values.date_retention}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.date_retention && errors.date_retention ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.date_retention}
													</p>
												) : null}
											</Form.Group>
											<label>
												<Field
													type="checkbox"
													name="is_permanent"
													value={values.is_permanent}
												/>
												Data Permanen
											</label>
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
