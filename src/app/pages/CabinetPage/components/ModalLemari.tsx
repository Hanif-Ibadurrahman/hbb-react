import { Form, Modal, Container, Row, Col, Button } from "react-bootstrap";
import React, { useState } from "react";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import Alert from "app/components/Alerts";

export function ModalLemari(props) {
	const [modalShow, setModalShow] = useState(false);
	const [showAlert, setShowAlert] = useState(false);

	const _onHide = () => {
		setModalShow(false);
		setShowAlert(false);
		console.log("hide modal");
	};

	const _onSubmit = () => {
		setModalShow(false);
		setShowAlert(true);
		setTimeout(function () {
			setShowAlert(false);
		}, 4000);
		console.log("show alert hide modal");
	};

	const validationSchema = Yup.object().shape({
		RecordCenter: Yup.string().required("*Record Center is required"),
		NamaRuang: Yup.string().required("*Nama Ruang required"),
		KodeLemari: Yup.string().required("*Kode Lemari required"),
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
					RecordCenter: "",
					NamaRuang: "",
					KodeLemari: "",
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
												<Form.Label>Record Center</Form.Label>
												<Form.Select
													className="cur-p"
													name="RecordCenter"
													onChange={handleChange}
													onBlur={handleBlur}
												>
													<option value="1">RC Bogor</option>
													<option value="2">RC Medan</option>
													<option value="3">RC Cirebon</option>
													<option value="4">RC Surabaya</option>
												</Form.Select>
												{touched.RecordCenter && errors.RecordCenter ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.RecordCenter}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Nama Ruang</Form.Label>
												<Form.Select
													className="cur-p"
													name="NamaRuang"
													onChange={handleChange}
													onBlur={handleBlur}
												>
													<option value="1">PMO 1</option>
													<option value="2">PMO 2</option>
													<option value="3">Pusat 1</option>
													<option value="4">Pusat 2</option>
												</Form.Select>
												{touched.NamaRuang && errors.NamaRuang ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.NamaRuang}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Kode Lemari</Form.Label>
												<Form.Control
													type="text"
													name="KodeLemari"
													placeholder="Kode Lemari"
													value={values.KodeLemari}
													onChange={handleChange}
													onBlur={handleBlur}
												/>
												{touched.KodeLemari && errors.KodeLemari ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.KodeLemari}
													</p>
												) : null}
											</Form.Group>
										</Form>
									</Col>
								</Row>
							</Container>
						</Modal.Body>
						<Modal.Footer>
							<Button variant="danger" onClick={props.onHide}>
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
