import { Form, Modal, Container, Row, Col, Button } from "react-bootstrap";
import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Alert from "app/components/Alerts";
import { useDispatch, useSelector } from "react-redux";
import {
	SelectApprovalAdmin,
	selectRequestBox,
	selectRequestBoxes,
} from "../../../../store/Selector/RequestBoxSelector";
import {
	CreateRequestBox,
	UpdateRequestBox,
	ApprovalAdmin,
	RESET_REQUEST_BOX_FORM,
} from "actions/RequestBoxAction";
import {
	RequestBoxInterfaceState,
	ApprovalInterfaceState,
} from "store/Types/RequestBoxTypes";
import moment from "moment";

const ModalForm = props => {
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [varianAlert, setVarianAlert] = useState("");
	const requestBox: RequestBoxInterfaceState = useSelector(selectRequestBox);
	const approvalAdmin: ApprovalInterfaceState =
		useSelector(SelectApprovalAdmin);

	const dispatch = useDispatch();
	const validationSchema = Yup.object().shape({
		Description: Yup.string().required("*Wajib diisi"),
	});

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
					initialValues={approvalAdmin}
					enableReinitialize={true}
					onSubmit={async values => {
						try {
							values.Id = requestBox.id;
							dispatch(await ApprovalAdmin(values));
							setShowAlert(true);
							setAlertMessage("Data Berhasil di Reject");
							setVarianAlert("success");
							setTimeout(function () {
								window.location.reload();
							}, 1000);
							dispatch({ type: RESET_REQUEST_BOX_FORM });
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
									Tambah Keterangan
								</Modal.Title>
							</Modal.Header>
							<Modal.Body className="show-grid">
								<Container>
									<Row>
										<Col xs={12}>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Deskripsi</Form.Label>
												<Form.Control
													type="text"
													name="Description"
													placeholder="Description"
													value={values.Description}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.Description && errors.Description ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.Description}
													</p>
												) : null}
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
									Kirim
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
