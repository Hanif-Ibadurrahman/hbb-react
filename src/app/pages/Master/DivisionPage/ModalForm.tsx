import { Form, Modal, Container, Row, Col, Button } from "react-bootstrap";
import React, { useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import { Formik } from "formik";
import * as Yup from "yup";
import Alert from "app/components/Alerts";
import { selectDivision } from "../../../../store/Selector/DivisionSelector";
import { useDispatch, useSelector } from "react-redux";
import {
	CreateDivision,
	UpdateDivision,
	RESET_DIVISION_FORM,
} from "actions/DivisionAction";
import { DivisionInterfaceState } from "store/Types/DivisionTypes";

const ModalForm = props => {
	// const [CodeCompany, setCodeCompany] = useState("");
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setalertMessage] = useState("");
	const divisions: DivisionInterfaceState = useSelector(selectDivision);
	const dispatch = useDispatch();

	const validationSchema = Yup.object().shape({
		// CodeCompany: Yup.string().required("*Wajib diisi"),
		code_name: Yup.string().required("*Wajib diisi"),
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
					initialValues={divisions}
					enableReinitialize={true}
					onSubmit={async values => {
						try {
							let action = divisions.id
								? UpdateDivision(values)
								: CreateDivision(values);
							// dispatch(loadingbarTurnOn)
							const res = await action;
							await dispatch(res);
							action.then(() => {
								dispatch({ type: RESET_DIVISION_FORM });
								props.modalSet(props.valueModalSet);
							});
							dispatch({ type: RESET_DIVISION_FORM });
							props.modalSet(props.valueModalSet);
							divisions.id ? (
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
									{divisions.id ? <>Edit Data</> : <>Tambah Data</>}
								</Modal.Title>
							</Modal.Header>
							<Modal.Body className="show-grid">
								<Container>
									<Row>
										<Col xs={12}>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Name Divisi</Form.Label>
												<Form.Control
													type="text"
													name="code_name"
													placeholder="Name Divisi"
													value={values.code_name}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.code_name && errors.code_name ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.code_name}
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
