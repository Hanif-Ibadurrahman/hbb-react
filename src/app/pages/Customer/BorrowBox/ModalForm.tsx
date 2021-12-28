import { Form, Modal, Container, Row, Col, Button } from "react-bootstrap";
import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Alert from "app/components/Alerts";
import { useDispatch, useSelector } from "react-redux";
import { CreateBorrowItem, DeleteCart } from "actions/BorrowItemAction";
import { BorrowItemInterfaceState } from "store/Types/BorrowItemTypes";
import {
	selectBorrowItem,
	selectBorrowItems,
} from "store/Selector/BorrowItemSelector";

const ModalForm = props => {
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setalertMessage] = useState("");
	const borrowBox: BorrowItemInterfaceState = useSelector(selectBorrowItem);
	const cart = useSelector(selectBorrowItems);
	const cartStash = cart.Cart;
	console.log("Modal Cart>>>", cartStash);

	const dispatch = useDispatch();

	const validationSchema = Yup.object().shape({
		note: Yup.string().required("*Wajib diisi"),
	});

	const deleteCart = async id => {
		dispatch(await DeleteCart(id));
	};

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
					initialValues={borrowBox}
					enableReinitialize={true}
					onSubmit={async values => {
						try {
							values.box_codes = cartStash;
							let action = CreateBorrowItem(values);
							const res = await action;
							await dispatch(res);
							action.then(() => {
								props.modalSet(props.valueModalSet);
							});
							props.modalSet(props.valueModalSet);
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
									Peminjaman
								</Modal.Title>
							</Modal.Header>
							<Modal.Body className="show-grid">
								<Container>
									<Row>
										<Col xs={12}>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Note</Form.Label>
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
