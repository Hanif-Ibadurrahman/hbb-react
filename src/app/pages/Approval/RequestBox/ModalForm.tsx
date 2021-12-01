import { Form, Modal, Container, Row, Col, Button } from "react-bootstrap";
import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Alert from "app/components/Alerts";
import { useDispatch, useSelector } from "react-redux";
import {
	selectRequestBox,
	selectRequestBoxes,
} from "../../../../store/Selector/RequestBoxSelector";
import {
	CreateRequestBox,
	UpdateRequestBox,
	RESET_REQUEST_BOX_FORM,
} from "actions/RequestBoxAction";
import { RequestBoxInterfaceState } from "store/Types/RequestBoxTypes";
import moment from "moment";

const ModalForm = props => {
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setalertMessage] = useState("");
	const requestBox: RequestBoxInterfaceState = useSelector(selectRequestBox);
	// const requestBoxes: useSelector(selectRequestBoxes);
	const dispatch = useDispatch();
	const validationSchema = Yup.object().shape({
		Quantity: Yup.string().required("*Wajib diisi"),
		DeliverdAt: Yup.string().required("*Wajib diisi"),
		Note: Yup.string().required("*Wajib diisi"),
	});

	const NewDate = moment(requestBox.DeliveredAt).format("d MMMM YYYY");

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
					initialValues={requestBox}
					enableReinitialize={true}
					onSubmit={async values => {
						try {
							let action = requestBox.Id
								? UpdateRequestBox(values)
								: CreateRequestBox(values);
							// dispatch(loadingbarTurnOn)
							const res = await action;
							await dispatch(res);
							action.then(() => {
								dispatch({ type: RESET_REQUEST_BOX_FORM });
								props.modalSet(props.valueModalSet);
							});
							dispatch({ type: RESET_REQUEST_BOX_FORM });
							props.modalSet(props.valueModalSet);
							requestBox.Id ? (
								<>Data Berhasil di Edit</>
							) : (
								<>Data Berhasil di Tambah</>
							);
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
									{requestBox.Id ? <>Detail Data</> : <>Tambah Data</>}
								</Modal.Title>
							</Modal.Header>
							<Modal.Body className="show-grid">
								<Container>
									<Row>
										<Col xs={12}>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Quantity</Form.Label>
												<Form.Control
													type="text"
													name="Quantity"
													placeholder="Quantity"
													value={values.Quantity}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
													disabled
												/>
												{touched.Quantity && errors.Quantity ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.Quantity}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Tanggal Kirim</Form.Label>
												<Form.Control
													type="text"
													name="DeliveredAt"
													placeholder="DeliveredAt"
													value={NewDate}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
													disabled
												/>
												{touched.DeliveredAt && errors.DeliveredAt ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.DeliveredAt}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Note</Form.Label>
												<Form.Control
													as="textarea"
													name="Note"
													placeholder="Note"
													value={values.Note}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
													disabled
												/>
												{touched.Note && errors.Note ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.Note}
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
							</Modal.Footer>
						</Form>
					)}
				</Formik>
			</Modal>
		</>
	);
};

export default ModalForm;
