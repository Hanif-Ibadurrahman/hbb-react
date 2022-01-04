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

import { selectAreas } from "store/Selector/AreaSelector";
import { getAreasList } from "actions/AreaActions";
import { AreasInterfaceState } from "store/Types/AreaTypes";

export const ModalForm = props => {
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setalertMessage] = useState("");
	const cabinet: CabinetInterfaceState = useSelector(selectCabinet);
	const dispatch = useDispatch();

	const FetchData = (page = 1) => {
		dispatch(getAreasList(page));
	};

	useEffect(() => {
		FetchData();
	}, []);
	const arearoom = [
		{ id: 1, room: "voluptatem assumenda quis" },
		{ id: 2, room: "harum ex iure" },
		{ id: 3, room: "hic vel fugit" },
		{ id: 4, room: "aut dignissimos doloribus" },
		{ id: 5, room: "non ut dicta" },
		{ id: 6, room: "dolorem labore porro" },
		{ id: 7, room: "non et error" },
		{ id: 8, room: "nulla deleniti voluptas" },
		{ id: 9, room: "aliquam fuga quibusdam" },
		{ id: 10, room: "et iusto suscipit" },
	];

	const validationSchema = Yup.object().shape({
		CodeRoom: Yup.string().required("*Wajib diisi"),
		CodeCabinet: Yup.string().required("*Wajib diisi"),
		CodeTotalBays: Yup.string().required("*Wajib diisi"),
		CodeTotalRow: Yup.string().required("*Wajib diisi"),
		CodeTotalColumns: Yup.string().required("*Wajib diisi"),
		CodeDepth: Yup.string().required("*Wajib diisi"),
		// area_id: Yup.string().required("*Wajib diisi"),
	});
	return null;
	// return (
	// 	<>
	// 		<Alert
	// 			text="Data Berhasil Di Input"
	// 			variant="success"
	// 			show={showAlert}
	// 			style={{
	// 				top: 50,
	// 				position: "fixed",
	// 				left: "50%",
	// 				transform: [{ translateX: "50%" }],
	// 			}}
	// 			onHide={() => setShowAlert(false)}
	// 		/>
	// 		<Modal
	// 			show={props.modal}
	// 			onHide={props.hide}
	// 			arialabelledby="containedmodaltitlevcenter"
	// 		>
	// 			{" "}
	// 			<Formik
	// 				validationSchema={validationSchema}
	// 				initialValues={cabinet}
	// 				enableReinitialize={true}
	// 				onSubmit={async values => {
	// 					try {
	// 						let action = cabinet.Id
	// 							? UpdateCabinet(values)
	// 							: CreateCabinet(values);
	// 						// dispatch(loadingbarTurnOn)
	// 						const res = await action;
	// 						await dispatch(res);
	// 						action.then(() => {
	// 							dispatch({ type: RESET_CABINET_FORM });
	// 							props.modalSet(props.valueModalSet);
	// 						});
	// 						dispatch({ type: RESET_CABINET_FORM });
	// 						props.modalSet(props.valueModalSet);
	// 						cabinet.Id ? (
	// 							<>Data Berhasil di Edit</>
	// 						) : (
	// 							<>Data Berhasil di Tambah</>
	// 						);
	// 						console.log(action);
	// 					} catch (e) {
	// 						console.log("ini error di depan");
	// 					}
	// 				}}
	// 			>
	// 				{({
	// 					values,
	// 					errors,
	// 					touched,
	// 					handleChange,
	// 					handleBlur,
	// 					handleSubmit,
	// 					isSubmitting,
	// 				}) => (
	// 					<Form onSubmit={handleSubmit}>
	// 						<Modal.Header closeButton className="bg-primary-5">
	// 							<Modal.Title id="contained-modal-title-vcenter">
	// 								{cabinet.Id ? <>Edit Data</> : <>Tambah Data</>}
	// 							</Modal.Title>
	// 						</Modal.Header>
	// 						<Modal.Body className="show-grid">
	// 							<Container>
	// 								<Row>
	// 									<Col xs={12}>
	// 										<Form onSubmit={handleSubmit}>
	// 											{console.log(values)}
	// 											<Form.Group className="mb-4" controlId="formBasicEmail">
	// 												<Form.Label>Pilih Room</Form.Label>
	// 												<Autocomplete
	// 													id="Archiver"
	// 													options={arearoom}
	// 													// value={values.Transporter = Archiver["id"]}
	// 													getOptionLabel={option => option.room}
	// 													renderInput={params => (
	// 														<TextField {...params} label="..." />
	// 													)}
	// 													onChange={(event, newValue) => {
	// 														console.log(
	// 															JSON.stringify(newValue?.id, null, " "),
	// 														);
	// 													}}
	// 												/>
	// 											</Form.Group>
	// 											<Form.Group className="mb-4" controlId="formname">
	// 												<Form.Label>Code Cabinet</Form.Label>
	// 												<Form.Control
	// 													type="text"
	// 													name="Code Cabinet"
	// 													placeholder="Code"
	// 													value={values.CodeCabinet}
	// 													onChange={e => {
	// 														handleChange(e);
	// 													}}
	// 													onBlur={handleBlur}
	// 												/>
	// 												{touched.CodeCabinet && errors.CodeCabinet ? (
	// 													<p className="tcdanger5 posa psm">
	// 														{errors.CodeCabinet}
	// 													</p>
	// 												) : null}
	// 											</Form.Group>
	// 											<Form.Group className="mb-4" controlId="formname">
	// 												<Form.Label>Block Number</Form.Label>
	// 												<Form.Control
	// 													type="text"
	// 													name="CodeBlockNumb"
	// 													placeholder="Block"
	// 													value={values.CodeBlockNumb}
	// 													onChange={e => {
	// 														handleChange(e);
	// 													}}
	// 													onBlur={handleBlur}
	// 												/>
	// 												{touched.CodeBlockNumb && errors.CodeBlockNumb ? (
	// 													<p className="tcdanger5 posa psm">
	// 														{errors.CodeBlockNumb}
	// 													</p>
	// 												) : null}
	// 											</Form.Group>
	// 											<Form.Group className="mb-4" controlId="formname">
	// 												<Form.Label>Bays</Form.Label>
	// 												<Form.Control
	// 													type="text"
	// 													name="CodeTotalBays"
	// 													placeholder="Bays"
	// 													value={values.CodeTotalBays}
	// 													onChange={e => {
	// 														handleChange(e);
	// 													}}
	// 													onBlur={handleBlur}
	// 												/>
	// 												{touched.CodeTotalBays && errors.CodeTotalBays ? (
	// 													<p className="tcdanger5 posa psm">
	// 														{errors.CodeTotalBays}
	// 													</p>
	// 												) : null}
	// 											</Form.Group>
	// 											<Form.Group className="mb-4" controlId="formname">
	// 												<Form.Label>Row</Form.Label>
	// 												<Form.Control
	// 													type="text"
	// 													name="CodeTotalRow"
	// 													placeholder="Row"
	// 													value={values.CodeTotalRow}
	// 													onChange={e => {
	// 														handleChange(e);
	// 													}}
	// 													onBlur={handleBlur}
	// 												/>
	// 												{touched.CodeTotalRow && errors.CodeTotalRow ? (
	// 													<p className="tcdanger5 posa psm">
	// 														{errors.CodeTotalRow}
	// 													</p>
	// 												) : null}
	// 											</Form.Group>
	// 											<Form.Group className="mb-4" controlId="formname">
	// 												<Form.Label>Columns</Form.Label>
	// 												<Form.Control
	// 													type="text"
	// 													name="CodeTotalColumns"
	// 													placeholder="Columns"
	// 													value={values.CodeTotalColumns}
	// 													onChange={e => {
	// 														handleChange(e);
	// 													}}
	// 													onBlur={handleBlur}
	// 												/>
	// 												{touched.CodeTotalColumns &&
	// 													errors.CodeTotalColumns ? (
	// 													<p className="tcdanger5 posa psm">
	// 														{errors.CodeTotalColumns}
	// 													</p>
	// 												) : null}
	// 											</Form.Group>
	// 											<Form.Group className="mb-4" controlId="formname">
	// 												<Form.Label>Muatan</Form.Label>
	// 												<Form.Control
	// 													type="text"
	// 													name="CodeDepth"
	// 													placeholder="Depth"
	// 													value={values.CodeDepth}
	// 													onChange={e => {
	// 														handleChange(e);
	// 													}}
	// 													onBlur={handleBlur}
	// 												/>
	// 												{touched.CodeDepth && errors.CodeDepth ? (
	// 													<p className="tcdanger5 posa psm">
	// 														{errors.CodeDepth}
	// 													</p>
	// 												) : null}
	// 											</Form.Group>
	// 										</Form>
	// 									</Col>
	// 								</Row>
	// 							</Container>
	// 						</Modal.Body>
	// 						<Modal.Footer>
	// 							<Button variant="danger" onClick={props.hide}>
	// 								Close
	// 							</Button>
	// 							<Button
	// 								type="submit"
	// 								disabled={isSubmitting}
	// 								className="bgsuccess6"
	// 								variant="success"
	// 							>
	// 								Request
	// 							</Button>{" "}
	// 						</Modal.Footer>
	// 					</Form>
	// 				)}
	// 			</Formik>
	// 		</Modal>
	// 	</>
	// );
};
export default ModalForm;
