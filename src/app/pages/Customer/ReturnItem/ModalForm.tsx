import { Form, Modal, Container, Row, Col, Button } from "react-bootstrap";
import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Alert from "app/components/Alerts";
import { useDispatch, useSelector } from "react-redux";
import { DeleteCart } from "actions/BorrowItemAction";
import { selectBorrowItems } from "store/Selector/BorrowItemSelector";
import moment from "moment";
import { CreateReturnItem } from "actions/ReturnAction";
import { ReturnItemInterfaceState } from "store/Types/ReturnItemTypes";
import { selectReturnItem } from "store/Selector/ReturnItemSelector";

const ModalForm = props => {
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [varianAlert, setVarianAlert] = useState("");
	const returnItem: ReturnItemInterfaceState = useSelector(selectReturnItem);
	const cart = useSelector(selectBorrowItems);
	const cartStash = cart.Cart;
	function addDays(days) {
		const result = new Date();
		result.setDate(result.getDate() + days);
		return result;
	}

	const RegularDate = moment(addDays(2)).format("YYYY-MM-DD");

	const dispatch = useDispatch();

	const validationSchema = Yup.object().shape({
		note: Yup.string().required("*Wajib diisi"),
		delivered_at: Yup.string().required("*Wajib diisi"),
	});

	const deleteCart = async id => {
		dispatch(await DeleteCart(id));
	};

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
					initialValues={returnItem}
					enableReinitialize={true}
					onSubmit={async values => {
						try {
							values.box_codes = cartStash;
							let action = CreateReturnItem(values);
							const res = await action;
							await dispatch(res);
							action.then(() => {
								props.modalSet(props.valueModalSet);
								setShowAlert(true);
								setAlertMessage("Request Pengembalian Berhasil");
								setVarianAlert("success");
								setTimeout(function () {
									window.location.reload();
								}, 1000);
							});
							props.modalSet(props.valueModalSet);
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
								<Modal.Title id="contained-modal-title-vcenter">
									Pengembalian
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
													disabled
												>
													<option value="regular">Regular</option>
												</Form.Select>
											</Form.Group>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Waktu Pengiriman</Form.Label>
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
											</Form.Group>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Catatan</Form.Label>
												<Form.Control
													as="textarea"
													name="note"
													placeholder="note"
													value={values.note}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
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
