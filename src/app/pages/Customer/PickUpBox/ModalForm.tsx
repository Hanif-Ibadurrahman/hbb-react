import { Form, Modal, Container, Row, Col, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import Alert from "app/components/Alerts";
import { useDispatch, useSelector } from "react-redux";
import { CreatePickUpItem, DeleteCart } from "actions/PickUpAction";
import { PickUpItemInterfaceState } from "store/Types/PickUpTypes";
import {
	selectPickUpItem,
	selectPickUpItems,
} from "store/Selector/PickUpSelector";
import moment from "moment";
import { selectTransporters } from "store/Selector/TransporterSelector";
import { getBoxesListNoAsign } from "actions/TransporterAction";

const ModalForm = props => {
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [varianAlert, setVarianAlert] = useState("");
	const borrowBox: PickUpItemInterfaceState = useSelector(selectPickUpItem);
	const cart = useSelector(selectPickUpItems);
	const cartStash = cart.Cart;
	const boxesNoAsign = useSelector(selectTransporters);
	const totalBoxNoAsign = boxesNoAsign.Meta.total;
	const BoxNoAsign = (page = 1) => {
		dispatch(getBoxesListNoAsign(page));
	};
	useEffect(() => {
		BoxNoAsign();
	}, []);

	const dispatch = useDispatch();

	const validationSchema = Yup.object().shape({
		quantity: Yup.number()
			.min(1, "Minimal 1 Box")
			.max(totalBoxNoAsign, `Box yang anda punya ${totalBoxNoAsign}`)
			.required("*Wajib diisi"),
		delivered_at: Yup.string().required("*Wajib diisi"),
	});

	function addDays(days) {
		const result = new Date();
		result.setDate(result.getDate() + days);
		return result;
	}
	const RegularDate = moment(addDays(2)).format("YYYY-MM-DD");

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
			<Formik
				validationSchema={validationSchema}
				initialValues={borrowBox}
				enableReinitialize={true}
				onSubmit={async values => {
					try {
						values.box_codes = cartStash;
						let action = CreatePickUpItem(values);
						const res = await action;
						await dispatch(res);
						action.then(() => {
							props.modalSet(props.valueModalSet);
							setShowAlert(true);
							setAlertMessage("Request Pick Up Berhasil");
							setVarianAlert("success");
							setTimeout(function () {
								window.location.reload();
							}, 1000);
						});
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
					setFieldValue,
					isSubmitting,
				}) => (
					<Form
						onSubmit={handleSubmit}
						className="d-flex ai-center fd-col jc-center mt-8"
					>
						<Modal.Body className="col-6 bg-white bd-rs-4 pb-6">
							<Container>
								<Row>
									<h5 className="ta-center mb-2 pv-2">Pick Up Form</h5>
									<div className="w-100% mb-8  h-2px bg-primary-contrast"></div>
									<Col xs={12}>
										<Row>
											<Col xs={10}>
												<Form.Group className="mb-4">
													<Form.Label>Quantity</Form.Label>
													<Form.Control
														type="number"
														min="1"
														name="quantity"
														placeholder="Quantity"
														value={values?.quantity}
														onChange={e => {
															handleChange(e);
														}}
														onBlur={handleBlur}
													/>
													{touched.quantity && errors.quantity ? (
														<p className="tc-danger-5 pos-a p-sm">
															{errors.quantity}
														</p>
													) : null}
												</Form.Group>
											</Col>
											<Col xs={2}>
												<Button
													className="bg-success-6 mt-6 w-100%"
													variant="success"
													onClick={() =>
														setFieldValue("quantity", totalBoxNoAsign)
													}
												>
													Maks
												</Button>{" "}
											</Col>
										</Row>
										<Form.Group className="mb-4" controlId="formBasicEmail">
											<Form.Label>Metode Pengiriman</Form.Label>
											<Form.Select
												className="cur-p"
												name="delivery_method"
												value={values?.delivery_method}
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
												value={values?.delivered_at}
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
									</Col>
								</Row>
								<Button
									type="submit"
									disabled={isSubmitting}
									className="bg-success-6 mt-6 w-100%"
									variant="success"
								>
									Request
								</Button>{" "}
							</Container>
						</Modal.Body>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default ModalForm;
