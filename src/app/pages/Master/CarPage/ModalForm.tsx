import { Form, Modal, Container, Row, Col, Button } from "react-bootstrap";
import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Alert from "app/components/Alerts";
import { selectBoxes, selectBox } from "../../../../store/Selector/BoxSelector";
import { useDispatch, useSelector } from "react-redux";
import { CreateBox, UpdateBox, RESET_BOX_FORM } from "actions/BoxActions";
import { CreateCar, UpdateCar, RESET_CAR_FORM } from "actions/CarAction";
import { BoxInterfaceState } from "store/Types/BoxTypes";
import { CarInterfaceState } from "store/Types/CarTypes";
import { selectCar } from "store/Selector/CarSelector";

const ModalForm = props => {
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setalertMessage] = useState("");
	// const box: BoxInterfaceState = useSelector(selectBox);
	const car: CarInterfaceState = useSelector(selectCar);
	const dispatch = useDispatch();
	const validationSchema = Yup.object().shape({
		Brand: Yup.string().required("*Wajib diisi"),
		Capacity: Yup.string().required("*Wajib diisi"),
		LicensePlate: Yup.string().required("*Wajib diisi"),
	});

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
					initialValues={car}
					enableReinitialize={true}
					onSubmit={async values => {
						try {
							let action = car.Id ? UpdateCar(values) : CreateCar(values);
							// dispatch(loadingbarTurnOn)
							const res = await action;
							await dispatch(res);
							action.then(() => {
								dispatch({ type: RESET_CAR_FORM });
								props.modalSet(props.valueModalSet);
							});
							dispatch({ type: RESET_CAR_FORM });
							props.modalSet(props.valueModalSet);
							car.Id ? (
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
									{car.Id ? <>Edit Data</> : <>Tambah Data</>}
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
													name="Brand"
													placeholder="Merk"
													value={values.Brand}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.Brand && errors.Brand ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.Brand}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Kapasitas (KG)</Form.Label>
												<Form.Control
													type="number"
													name="Capacity"
													placeholder="Kapasitas"
													value={values.Capacity}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.Capacity && errors.Capacity ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.Capacity}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Nomor Plat</Form.Label>
												<Form.Control
													type="text"
													name="LicensePlate"
													placeholder="Kapasitas"
													value={values.LicensePlate}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.LicensePlate && errors.LicensePlate ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.LicensePlate}
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
