import {
	Form,
	Modal,
	Container,
	Row,
	Col,
	Button,
	Spinner,
} from "react-bootstrap";
import React, { useState } from "react";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";
import Alert from "app/components/Alerts";
import { selectRequestBox } from "../../../../store/Selector/RequestBoxSelector";
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
	const [alertMessage, setAlertMessage] = useState("");
	const [varianAlert, setVarianAlert] = useState("");
	const requestBox: RequestBoxInterfaceState = useSelector(selectRequestBox);
	const [isLoading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const validationSchema = Yup.object().shape({
		quantity: Yup.number().min(10, "Minimal 10 Box").required("*Wajib diisi"),
		delivered_at: Yup.date().required("*Wajib diisi"),
		note: Yup.string().required("*Wajib diisi"),
	});

	function addDays(days) {
		const result = new Date();
		result.setDate(result.getDate() + days);
		return result;
	}
	const RegularDate = moment(addDays(0)).format("YYYY-MM-DD");

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
							setLoading(true);
							action.then(() => {
								dispatch({ type: RESET_REQUEST_BOX_FORM });
								props.modalSet(props.valueModalSet);
								setLoading(false);
								setShowAlert(true);
								setAlertMessage("Request Berhasil Di Input");
								setVarianAlert("success");
								setTimeout(function () {
									window.location.reload();
								}, 1000);
							});
						} catch (e) {
							setShowAlert(true);
							setAlertMessage("Request Gagal");
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
					}) => (
						<Form onSubmit={handleSubmit}>
							<Modal.Header closeButton className="bg-primary-5">
								<Modal.Title>Request Box</Modal.Title>
							</Modal.Header>
							<Modal.Body className="show-grid">
								<Container>
									<Row>
										<Col xs={12}>
											<Form.Group className="mb-4">
												<Form.Label>Quantity</Form.Label>
												<Form.Control
													type="number"
													min="10"
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
											<Form.Group className="mb-4">
												<Form.Label>Metode Pengiriman</Form.Label>
												<Form.Select
													className="cur-p"
													name="delivery_method"
													value={values.delivery_method}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
													disabled
												>
													<option value="regular">Regular</option>
												</Form.Select>
											</Form.Group>
											<Form.Group className="mb-4">
												<Form.Label>Tanggal Permintaan</Form.Label>
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
												{touched.delivered_at && errors.delivered_at ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.delivered_at}
													</p>
												) : null}
												<p
													className="tc-danger-5 pos-a p-sm"
													style={{
														display:
															values.delivered_at.length > 0 ? "block" : "none",
													}}
												>
													Untuk pengiriman dilakukan H+2 dihari kerja
												</p>
											</Form.Group>
											<Form.Group className="mb-4">
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
											{/* <Form.Group className="mb-3">
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
											</Form.Group> */}
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
									disabled={isSubmitting || isLoading}
									className="bg-success-6"
									variant="success"
								>
									Request
									{isSubmitting && (
										<Spinner
											as="span"
											animation="border"
											size="sm"
											role="status"
											aria-hidden="true"
											className="ml-2"
										/>
									)}
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
