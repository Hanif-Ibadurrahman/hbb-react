import { Form, Modal, Container, Row, Col, Button } from "react-bootstrap";
import React, { useState } from "react";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import Alert from "app/components/Alerts";
import { useHistory } from "react-router";
import api from "../../../../api/dox";

export function ModalForm() {
	let history = useHistory();
	const [code_box, setcode_box] = useState("");

	const [modalShow, setModalShow] = useState(false);
	const [showAlert, setShowAlert] = useState(false);

	const _onHide = () => {
		setModalShow(false);
		setShowAlert(false);
		console.log("hide modal");
	};

	const _onSubmit = () => {
		api
			.post(`/boxes`, {
				code_box,
			})
			.then(() => {
				history.push("/Box");
			});
		setModalShow(false);
		setShowAlert(true);
		setTimeout(function () {
			setShowAlert(false);
		}, 4000);
		window.location.reload();
		console.log("show alert hide modal");
	};

	const validationSchema = Yup.object().shape({
		code_box: Yup.string().required("*Code box required"),
	});

	return (
		<>
			<Button
				className="d-flex ai-center bg-success-6"
				variant="success"
				onClick={() => setModalShow(true)}
			>
				Add Data<i className="far fa-plus ml-2"></i>
			</Button>{" "}
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
					code_box: "",
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
						show={modalShow}
						onHide={() => setModalShow(false)}
						aria-labelledby="contained-modal-title-vcenter"
					>
						<Modal.Header closeButton className="bg-primary-5">
							<Modal.Title id="contained-modal-title-vcenter">
								Form Input
							</Modal.Title>
						</Modal.Header>
						<Modal.Body className="show-grid">
							<Container>
								<Row>
									<Col xs={12}>
										<Form onSubmit={handleSubmit}>
											{console.log(values)}
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Code Box</Form.Label>
												<Form.Control
													type="text"
													name="code_box"
													placeholder="Code"
													value={values.code_box}
													onChange={e => {
														handleChange(e);
														setcode_box(e.target.value);
													}}
													onBlur={handleBlur}
												/>
												{touched.code_box && errors.code_box ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.code_box}
													</p>
												) : null}
											</Form.Group>
										</Form>
									</Col>
								</Row>
							</Container>
						</Modal.Body>
						<Modal.Footer>
							<Button variant="danger" onClick={_onHide}>
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
