import { Form, Modal, Container, Row, Col, Button } from "react-bootstrap";
import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Alert from "app/components/Alerts";
import { useDispatch, useSelector } from "react-redux";
import { CreatePickUpItem, DeleteCart } from "actions/PickUpAction";
import { PickUpItemInterfaceState } from "store/Types/PickUpTypes";
import {
	selectPickUpItem,
	selectPickUpItems,
} from "store/Selector/PickUpSelector";
import moment from "moment";

const ModalForm = props => {
	const [showAlert, setShowAlert] = useState(false);
	const borrowBox: PickUpItemInterfaceState = useSelector(selectPickUpItem);
	const cart = useSelector(selectPickUpItems);
	const cartStash = cart.Cart;

	const dispatch = useDispatch();

	const validationSchema = Yup.object().shape({
		delivered_at: Yup.string().required("*Wajib diisi"),
	});

	const deleteCart = async id => {
		dispatch(await DeleteCart(id));
	};

	function addDays(days) {
		const result = new Date();
		result.setDate(result.getDate() + days);
		return result;
	}
	const RegularDate = moment(addDays(2)).format("YYYY-MM-DD");
	const Express = moment(addDays(0)).add(2, "hours").format("YYYY-MM-DDTHH:MM");
	const Emergency = moment(addDays(0)).format("YYYY-MM-DD");

	return (
		<>
			<Alert
				text="Pick Up Berhasil"
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
					initialValues={borrowBox}
					enableReinitialize={true}
					onSubmit={async values => {
						try {
							values.box_codes = cartStash;
							let action = CreatePickUpItem(values);
							const res = await action;
							await dispatch(res);
							action.then(() => {
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
								<Modal.Title id="contained-modal-title-vcenter">
									Peminjaman
								</Modal.Title>
							</Modal.Header>
							<Modal.Body className="show-grid">
								<Container>
									<Row>
										<Col xs={12}>
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
											<Form.Group>
												<Form.Label>List Box</Form.Label>
												{cartStash.map((cart, index) => (
													<>
														<div className="d-flex jc-between mb-2">
															<div className="col-10">
																<Form.Control
																	type="text"
																	value={cart}
																	readOnly
																/>
															</div>
															<Button
																variant="danger"
																onClick={() => deleteCart(cart)}
																className="d-flex jc-center ai-center"
															>
																<i className="far fa-times"></i>
															</Button>
														</div>
													</>
												))}
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
