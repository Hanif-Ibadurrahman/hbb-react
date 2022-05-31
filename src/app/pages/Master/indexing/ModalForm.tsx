import { Form, Modal, Container, Row, Col, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import Alert from "app/components/Alerts";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete, TextField } from "@mui/material";
import { IndexingInterfaceState } from "store/Types/IndexingTypes";
import {
	selectindexing,
	selectindexings,
} from "store/Selector/IndexingSelector";
import { selectAreas } from "store/Selector/AreaSelector";
import { selectRooms } from "store/Selector/RoomSelector";
import { selectBoxes } from "store/Selector/BoxSelector";
import { selectClassifications } from "store/Selector/ClassificationSelector";
import { getAreasList } from "actions/AreaActions";
import { getRoomsList } from "actions/RoomAction";
import { getBoxesList } from "actions/BoxActions";
import { getClassificationList } from "actions/ClassificationAction";
import {
	CreateIndexing,
	RESET_INDEX_FORM,
	UpdateIndexing,
} from "actions/IndexingAction";
import moment from "moment";
import { result, values } from "lodash";

const ModalForm = props => {
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [varianAlert, setVarianAlert] = useState("");
	const indexing: IndexingInterfaceState = useSelector(selectindexing);
	const dispatch = useDispatch();
	const area = useSelector(selectAreas);
	const room = useSelector(selectRooms);
	const box = useSelector(selectBoxes);
	const classification = useSelector(selectClassifications);
	const FetchData = (page = 1) => {
		dispatch(getAreasList(page));
	};
	const RoomData = (page = 1) => {
		dispatch(getRoomsList(page));
	};
	const BoxData = (page = 1) => {
		dispatch(getBoxesList(page));
	};
	const ClassificationData = (page = 1) => {
		dispatch(getClassificationList(page));
	};
	useEffect(() => {
		FetchData();
	}, []);
	useEffect(() => {
		RoomData();
	}, []);
	useEffect(() => {
		BoxData();
	}, []);
	useEffect(() => {
		ClassificationData();
	}, []);
	const validationSchema = Yup.object().shape({
		index: Yup.string().required("*Wajib diisi"),
		date: Yup.string().required("*Wajib diisi"),
		// classification_code: Yup.string().required("*Wajib diisi"),
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
								props.modalSet(props.valueModalSet);
								setShowAlert(true);
								setVarianAlert("success");
								indexing?.id
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
							{console.log("values >>>", values)}
							<Modal.Header closeButton className="bg-primary-5">
								<Modal.Title id="contained-modal-title-vcenter">
									{indexing?.id ? <>Edit Data</> : <>Tambah Data</>}
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
													value={values?.index}
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
												<Form.Label>Tanggal Pemindahan</Form.Label>
												<Form.Control
													type="date"
													name="date"
													placeholder="Pilih Tanggal"
													value={moment(values?.date).format("YYYY-MM-DD")}
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
												<Form.Label>Tipe Berkas</Form.Label>
												<Form.Select
													className="cur-p"
													name="type"
													value={values?.type}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												>
													<option value="">Pilih Tipe</option>
													<option value="fasilitatif">Fasilitatif</option>
													<option value="subtantif">Subtantif</option>
												</Form.Select>
											</Form.Group>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Klasifikasi</Form.Label>
												<Autocomplete
													id="classification"
													options={classification.Classifications}
													getOptionLabel={option =>
														`${option.code}${option.name}`
													}
													value={values?.classification}
													onChange={(e, value) => {
														setFieldValue(
															"classification",
															value !== null ? value : values.classification,
														);
													}}
													renderInput={params => (
														<TextField
															margin="normal"
															placeholder="Classification"
															name="classification"
															{...params}
														/>
													)}
												/>
												{/* <Autocomplete
													id="classification"
													options={classification.Classifications}
													getOptionLabel={option => option.name}
													value={values.classification_code}
													onChange={(e, value) => {
														setFieldValue(
															"classification_code",
															value !== null ? value : values.classification_code
														);
													}}
													renderInput={params => (
														<TextField
															margin="normal"
															placeholder="Pilih Klasifikasi"
															name="classification_code"
															{...params}
														/>
													)}
												/> */}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Pilih Area</Form.Label>
												<Autocomplete
													id="company"
													options={area.Areas}
													getOptionLabel={option => option.name}
													value={values?.area}
													onChange={(e, value) => {
														setFieldValue(
															"area",
															value !== null ? value : values.area,
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
												{touched.area && errors.area ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.area}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Pilih Ruangan</Form.Label>
												<Autocomplete
													id="company"
													options={room.Rooms}
													getOptionLabel={option => option.name}
													value={values?.room}
													onChange={(e, value) => {
														setFieldValue(
															"room",
															value !== null ? value : values.room,
														);
													}}
													renderInput={params => (
														<TextField
															margin="normal"
															placeholder="Ruangan"
															name="room"
															{...params}
														/>
													)}
												/>
												{touched.room && errors.room ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.room}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Pilih Box</Form.Label>
												<Autocomplete
													id="company"
													options={box.Boxes}
													getOptionLabel={option => option.code_box}
													value={values?.box}
													onChange={(e, value) => {
														setFieldValue(
															"box",
															value !== null ? value : values.box,
														);
													}}
													renderInput={params => (
														<TextField
															margin="normal"
															placeholder="Box"
															name="box"
															{...params}
														/>
													)}
												/>
												{touched.box && errors.box ? (
													<p className="tc-danger-5 pos-a p-sm">{errors.box}</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Periode Retensi</Form.Label>
												<Form.Control
													type="number"
													min="0"
													disabled={values?.is_permanent}
													name="retention_period"
													placeholder="Periode Retensi"
													value={values?.retention_period}
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
													placeholder="Tanggal Retensi"
													value={
														// values?.date_retention =
														moment(values?.date)
															.add(values?.retention_period, "year")
															.format("YYYY-MM-DD")
														// values.date_retention === ""
														// ? moment(values.date)
														// .add(values.retention_period, "year")
														// .format("YYYY-MM-DD")
														// : values.date_retention
													}
													disabled
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
													checked={values?.is_permanent}
													onChange={e => {
														handleChange(e);
													}}
												/>
												Data Permanen
											</label>
											{touched.is_permanent && errors.is_permanent ? (
												<p className="tc-danger-5 pos-a p-sm">
													{errors.is_permanent}
												</p>
											) : null}
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
