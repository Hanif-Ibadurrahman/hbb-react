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

// const mapStateToProps = (state) => {
// 	return {
// 		initialValues: {
// 			code_box: state.boxes.BoxDetail.code_box,
// 		}
// 	};
// };

export function ModalForm(props) {
	const [code_box, setcode_box] = useState("");
	const [showAlert, setShowAlert] = useState(false);

	const dispatch = useDispatch();

	function _onSubmit() {
		const postData = {
			code_box,
		};
		dispatch(CreateBox(postData));
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
		code_box: Yup.string().required("*Wajib diisi"),
	});

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

// export default connect(mapStateToProps, null)(ModalForm);
