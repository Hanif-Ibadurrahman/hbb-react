import { Form, Modal, Container, Row, Col, Button } from "react-bootstrap";
import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Alert from "app/components/Alerts";
import { useDispatch, useSelector } from "react-redux";
import { CreateCar, UpdateCar, RESET_CAR_FORM } from "actions/CarAction";
import { CarInterfaceState } from "store/Types/CarTypes";
import { selectCar } from "store/Selector/CarSelector";

const ModalForm = props => {
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [varianAlert, setVarianAlert] = useState("");
	const car: CarInterfaceState = useSelector(selectCar);
	const dispatch = useDispatch();
	const validationSchema = Yup.object().shape({
		brand: Yup.string().required("*Wajib diisi"),
		capacity: Yup.string().required("*Wajib diisi"),
		license_plate: Yup.string().required("*Wajib diisi"),
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
					transform: [{ translateX: "50%" }],
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
					initialValues={car}
					enableReinitialize={true}
					onSubmit={async values => {
						try {
							let action = car.id ? UpdateCar(values) : CreateCar(values);
							// dispatch(loadingbarTurnOn)
							const res = await action;
							await dispatch(res);
							action.then(() => {
								dispatch({ type: RESET_CAR_FORM });
								props.modalSet(props.valueModalSet);
								setShowAlert(true);
								setVarianAlert("success");
								car.id
									? setAlertMessage("Data Berhasil di Edit")
									: setAlertMessage("Data Berhasil di Tambah");
								setTimeout(function () {
									window.location.reload();
								}, 1000);
							});
							dispatch({ type: RESET_CAR_FORM });
						} catch (e) {
							props.modalSet(props.valueModalSet);
							setShowAlert(true);
							setVarianAlert("danger");
							car.id
								? setAlertMessage("Data Gagal di Edit")
								: setAlertMessage("Data Gagal di Tambah");
							setTimeout(function () {
								window.location.reload();
							}, 1000);
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
									{car.id ? <>Edit Data</> : <>Tambah Data</>}
								</Modal.Title>
							</Modal.Header>
							<Modal.Body className="show-grid">
								<Container>
									<Row>
										<Col xs={12}>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Merk Mobil</Form.Label>
												<Form.Control
													type="text"
													name="brand"
													placeholder="Merk"
													value={values.brand}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.brand && errors.brand ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.brand}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Kapasitas (KG)</Form.Label>
												<Form.Control
													type="number"
													name="capacity"
													placeholder="Kapasitas"
													value={values.capacity}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.capacity && errors.capacity ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.capacity}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Nomor Plat</Form.Label>
												<Form.Control
													type="text"
													name="license_plate"
													placeholder="Nomor Plat"
													value={values.license_plate}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.license_plate && errors.license_plate ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.license_plate}
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
