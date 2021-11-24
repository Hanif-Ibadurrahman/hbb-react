import { Form, Modal, Container, Row, Col, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Alert from "app/components/Alerts";
import { useHistory } from "react-router";
import api from "../../../../api/dox";
import { getBoxDetail } from "actions/BoxActions";
import { CreateBox } from "actions/BoxActions";
import { connect, useDispatch } from "react-redux";

export function ModalForm(props) {
	const [quantity, setquantity] = useState("");
	const [delivered_at, setdelivered_at] = useState("");
	const [note, setnote] = useState("");
	const [showAlert, setShowAlert] = useState(false);

	const dispatch = useDispatch();

	function _onSubmit() {
		const postData = {
			quantity,
			delivered_at,
			note,
		};
		// dispatch(CreateBox(postData));
		setShowAlert(true);
		setTimeout(function () {
			props.modalSet(props.valueModalSet);
		}, 100);
		setTimeout(function () {
			setShowAlert(false);
		}, 4000);
		setTimeout(function () {
			window.location.reload();
		}, 1000);
	}

	const validationSchema = Yup.object().shape({
		quantity: Yup.string().required("*Wajib diisi"),
		delivered_at: Yup.string().required("*Wajib diisi"),
	});

	const newDate = new Date();
	const dateDeliver =
		newDate.getFullYear() +
		"-" +
		(newDate.getMonth() + 1) +
		"-" +
		(newDate.getDate() + 2);

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
			<Formik
				validationSchema={validationSchema}
				initialValues={{
					quantity: "",
					delivered_at: "",
					note: "",
				}}
				onSubmit={(values, { setSubmitting, resetForm }) => {
					// When button submits form and form is in the process of submitting, submit button is disabled
					setSubmitting(true);

					// Simulate submitting to database, shows us values submitted, resets form
					setTimeout(() => {
						alert(JSON.stringify(values, null, 2));
						resetForm();
						setSubmitting(false);
					}, 500);
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
					<Modal
						show={props.modal}
						onHide={props.hide}
						aria-labelledby="contained-modal-title-vcenter"
					>
						<Modal.Header closeButton className="bg-primary-5">
							<Modal.Title id="contained-modal-title-vcenter">
								Tambah Data
							</Modal.Title>
						</Modal.Header>
						<Modal.Body className="show-grid">
							<Container>
								<Row>
									<Col xs={12}>
										<Form onSubmit={handleSubmit}>
											{console.log(values)}
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Quantity</Form.Label>
												<Form.Control
													type="number"
													name="quantity"
													placeholder="Quantity"
													value={values.quantity}
													onChange={e => {
														handleChange(e);
														setquantity(e.target.value);
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
												<Form.Label>Date</Form.Label>
												<Form.Control
													type="date"
													// min="2021-11-25"
													min={dateDeliver}
													name="delivered_at"
													placeholder="Date"
													value={values.delivered_at}
													onChange={e => {
														handleChange(e);
														setdelivered_at(e.target.value);
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
												<Form.Label>Note</Form.Label>
												<Form.Control
													as="textarea"
													name="note"
													placeholder="Note"
													value={values.note}
													onChange={e => {
														handleChange(e);
														setnote(e.target.value);
													}}
													onBlur={handleBlur}
												/>
											</Form.Group>
										</Form>
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
								onClick={_onSubmit}
							>
								Request
							</Button>{" "}
						</Modal.Footer>
					</Modal>
				)}
			</Formik>
		</>
	);
}
