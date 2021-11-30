import { Form, Modal, Container, Row, Col, Button } from "react-bootstrap";
import React, { useState } from "react";
import { Formik, FieldArray, Field } from "formik";
import * as Yup from "yup";
import Alert from "app/components/Alerts";
import {
	selectRequestBoxes,
	selectRequestBox,
} from "../../../../store/Selector/RequestBoxSelector";
import { useDispatch, useSelector } from "react-redux";
import {
	CreateRequestBox,
	UpdateRequestBox,
	RESET_REQUEST_BOX_FORM,
} from "actions/RequestBoxAction";
import { RequestBoxInterfaceState } from "store/Types/RequestBoxTypes";
import moment from "moment";

const ModalForm = props => {
	const [showAlert, setShowAlert] = useState(false);
	const [checked, setChecked] = useState(false);
	const [alertMessage, setalertMessage] = useState("");
	const requestBox: RequestBoxInterfaceState = useSelector(selectRequestBox);
	const dispatch = useDispatch();
	const validationSchema = Yup.object().shape({
		Quantity: Yup.string().required("*Wajib diisi"),
		DeliveredAt: Yup.date().required("*Wajib diisi"),
		Note: Yup.string().required("*Wajib diisi"),
	});

	function addDays(days) {
		const result = new Date();
		result.setDate(result.getDate() + days);
		return result;
	}
	const DeliveredDate = moment(addDays(2)).format("YYYY-MM-D");

	function handleOnChange() {
		setChecked(!checked);
	}

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
					initialValues={requestBox}
					enableReinitialize={true}
					onSubmit={async values => {
						try {
							let action = requestBox.Id
								? UpdateRequestBox(values)
								: CreateRequestBox(values);
							// dispatch(loadingbarTurnOn)
							const res = await action;
							await dispatch(res);
							action.then(() => {
								dispatch({ type: RESET_REQUEST_BOX_FORM });
								props.modalSet(props.valueModalSet);
							});
							dispatch({ type: RESET_REQUEST_BOX_FORM });
							props.modalSet(props.valueModalSet);
							requestBox.Id ? (
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
						setFieldValue,
						isSubmitting,
					}) => (
						<Form onSubmit={handleSubmit}>
							<Modal.Header closeButton className="bg-primary-5">
								<Modal.Title id="contained-modal-title-vcenter">
									{requestBox.Id ? <>Edit Data</> : <>Tambah Data</>}
								</Modal.Title>
							</Modal.Header>
							<Modal.Body className="show-grid">
								<Container>
									<Row>
										<Col xs={12}>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Quantity</Form.Label>
												<Form.Control
													type="number"
													name="Quantity"
													placeholder="Quantity"
													value={values.Quantity}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.Quantity && errors.Quantity ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.Quantity}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Tanggal Pengiriman</Form.Label>
												<Form.Control
													type="date"
													min={DeliveredDate}
													name="DeliveredAt"
													placeholder="DeliveredAt"
													value={values.DeliveredAt}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.DeliveredAt && errors.DeliveredAt ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.DeliveredAt}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Note</Form.Label>
												<Form.Control
													as="textarea"
													name="Note"
													placeholder="Note"
													value={values.Note}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.DeliveredAt && errors.DeliveredAt ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.DeliveredAt}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-3">
												<Form.Check
													type="checkbox"
													label="Required Code Box"
													onChange={handleOnChange}
													onClick={() => setFieldValue(`CodeBoxes.Id_Box`, "")}
												/>
											</Form.Group>
											<FieldArray name="CodeBoxes">
												{({ remove, push }) => (
													<div className={checked ? "d-block" : "d-none"}>
														{values.CodeBoxes.length > 0 &&
															values.CodeBoxes.map((codeBox, index) => (
																<Form.Group className="mb-4" key={index}>
																	<Form.Label>Code Box</Form.Label>
																	<Row>
																		<Col xs={10}>
																			<Form.Control
																				type="text"
																				name={`CodeBoxes.${index}`}
																				placeholder="Code Box"
																				value={values.CodeBoxes["Id_Box"]}
																				onChange={e => {
																					handleChange(e);
																				}}
																				onBlur={handleBlur}
																			/>
																			{touched.DeliveredAt &&
																			errors.DeliveredAt ? (
																				<p className="tc-danger-5 pos-a p-sm">
																					{errors.DeliveredAt}
																				</p>
																			) : null}
																		</Col>
																		<Col xs={2}>
																			<Button
																				variant="danger"
																				className="d-flex ai-center h-100% ml-a"
																				onClick={() => remove(index)}
																			>
																				<i className="far fa-times"></i>
																			</Button>
																		</Col>
																	</Row>
																</Form.Group>
															))}
														<Button
															variant="secondary"
															onClick={() => push("")}
														>
															Tambah
														</Button>
													</div>
												)}
											</FieldArray>
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
