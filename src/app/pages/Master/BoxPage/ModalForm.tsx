import { Form, Modal, Container, Row, Col, Button } from "react-bootstrap";
import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Alert from "app/components/Alerts";
import { selectBox } from "../../../../store/Selector/BoxSelector";
import { useDispatch, useSelector } from "react-redux";
import { CreateBox, UpdateBox, RESET_BOX_FORM } from "actions/BoxActions";
import { BoxInterfaceState } from "store/Types/BoxTypes";

const ModalForm = props => {
	// const [CodeBox, setCodeBox] = useState("");
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setalertMessage] = useState("");
	const box: BoxInterfaceState = useSelector(selectBox);
	const dispatch = useDispatch();
	const validationSchema = Yup.object().shape({
		code_box: Yup.string().required("*Wajib diisi"),
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
					initialValues={box}
					enableReinitialize={true}
					onSubmit={async values => {
						try {
							let action = box.id ? UpdateBox(values) : CreateBox(values);
							// dispatch(loadingbarTurnOn)
							const res = await action;
							await dispatch(res);
							action.then(() => {
								dispatch({ type: RESET_BOX_FORM });
								props.modalSet(props.valueModalSet);
							});
							dispatch({ type: RESET_BOX_FORM });
							props.modalSet(props.valueModalSet);
							box.id ? (
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
									{box.id ? <>Edit Data</> : <>Tambah Data</>}
								</Modal.Title>
							</Modal.Header>
							<Modal.Body className="show-grid">
								<Container>
									<Row>
										<Col xs={12}>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Code Box</Form.Label>
												<Form.Control
													type="text"
													name="CodeBox"
													placeholder="Code"
													value={values.code_box}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.code_box && errors.code_box ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.code_box}
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
