import {
	Form,
	Modal,
	Container,
	Row,
	Col,
	Button,
	Dropdown,
	DropdownButton,
} from "react-bootstrap";
import React, { useEffect, useState } from "react";
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
	const requestBox: RequestBoxInterfaceState = useSelector(selectRequestBox);
	const dispatch = useDispatch();
	const validationSchema = Yup.object().shape({
		quantity: Yup.string().required("*Wajib diisi"),
		delivered_at: Yup.date().required("*Wajib diisi"),
		note: Yup.string().required("*Wajib diisi"),
	});

	function addDays(days) {
		const result = new Date();
		result.setDate(result.getDate() + days);
		return result;
	}
	const RegularDate = moment(addDays(2)).format("YYYY-MM-DD");
	const Express = moment(addDays(0)).add(2, "hours").format("YYYY-MM-DDTHH:MM");
	const Emergency = moment(addDays(0)).format("YYYY-MM-DD");

	function handleOnChange() {
		setChecked(!checked);
	}

	return (
		<>
			<Alert
				text="Request Berhasil Di Input"
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
							let action = requestBox.id
								? UpdateRequestBox(values)
								: CreateRequestBox(values);
							const res = await action;
							await dispatch(res);
							action.then(() => {
								dispatch({ type: RESET_REQUEST_BOX_FORM });
								props.modalSet(props.valueModalSet);
								setShowAlert(true);
								setTimeout(function () {
									window.location.reload();
								}, 1000);
							});
						} catch (e) {
							console.log("Error Redux");
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
								<Modal.Title>Request Box</Modal.Title>
							</Modal.Header>
							<Modal.Body className="show-grid">
								<Container>
									<Row>
										<Col xs={12}>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Quantity</Form.Label>
												<Form.Control
													type="number"
													min="1"
													name="quantity"
													placeholder="Quantity"
													value={values.quantity}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.quantity && errors.quantity ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.quantity}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Metode Pengiriman</Form.Label>
												<Form.Select
													className="cur-p"
													name="delivery_method"
													value={values.delivery_method}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												>
													<option value="regular">Regular</option>
													<option value="express">Express</option>
													<option value="emergency">Emergency</option>
												</Form.Select>
											</Form.Group>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Waktu Pengiriman</Form.Label>
												{values.delivery_method == "regular" ? (
													<Form.Control
														type="date"
														min={RegularDate}
														name="delivered_at"
														placeholder="Delivered"
														value={values.delivered_at}
														onChange={e => {
															handleChange(e);
														}}
														onBlur={handleBlur}
													/>
												) : values.delivery_method == "express" ? (
													<Form.Control
														type="text"
														name="delivered_at"
														placeholder="Delivered"
														value={(values.delivered_at = Express)}
														onChange={e => {
															handleChange(e);
														}}
														onBlur={handleBlur}
														disabled
													/>
												) : values.delivery_method == "emergency" ? (
													<>
														<Form.Control
															type="text"
															name="delivered_at"
															placeholder="Delivered"
															value={(values.delivered_at = Emergency)}
															onChange={e => {
																handleChange(e);
															}}
															onBlur={handleBlur}
															disabled
														/>
														<p className="tc-danger-5 pos-a p-sm">
															*Hanya Untuk Hari Libur
														</p>
													</>
												) : null}
												{touched.delivered_at && errors.delivered_at ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.delivered_at}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Note</Form.Label>
												<Form.Control
													as="textarea"
													name="note"
													placeholder="Note"
													value={values.note}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.delivered_at && errors.delivered_at ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.delivered_at}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-3">
												<Form.Label>Custome Code Box</Form.Label>
												<FieldArray name="code_boxes">
													{({ remove, push }) => (
														<div>
															{values?.code_boxes?.map((codeBox, index) => (
																<Form.Group className="mb-4" key={index}>
																	<Form.Label>Code Box</Form.Label>
																	<Row>
																		<Col xs={10}>
																			<Form.Control
																				type="text"
																				name={`code_boxes.${index}`}
																				placeholder="Code Box"
																				value={values.code_boxes[index]}
																				onChange={e => {
																					handleChange(e);
																				}}
																				onBlur={handleBlur}
																			/>
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
