import { Form, Modal, Container, Row, Col, Button } from "react-bootstrap";
import React, { useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import { Formik } from "formik";
import * as Yup from "yup";
import Alert from "app/components/Alerts";
import { selectCompany } from "../../../../store/Selector/CompanySelector";
import { useDispatch, useSelector } from "react-redux";
import {
	CreateCompany,
	UpdateCompany,
	RESET_COMPANY_FORM,
} from "actions/CompanyAction";
import { CompanyInterfaceState } from "store/Types/CompanyTypes";

const ModalForm = props => {
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [varianAlert, setVarianAlert] = useState("");
	const Companys: CompanyInterfaceState = useSelector(selectCompany);
	const dispatch = useDispatch();

	const validationSchema = Yup.object().shape({
		name: Yup.string().required("*Wajib diisi"),
		location: Yup.string().required("*Wajib diisi"),
		person_responsible: Yup.string().required("*Wajib diisi"),
		npwp: Yup.string().required("*Wajib diisi"),
		email: Yup.string().email().required("*Wajib diisi"),
		phone: Yup.string().required("*Wajib diisi"),
		address: Yup.string().required("*Wajib diisi"),
		amount_access: Yup.string().required("*Wajib diisi"),
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
					initialValues={Companys}
					enableReinitialize={true}
					onSubmit={async values => {
						try {
							let action = Companys?.id
								? UpdateCompany(values)
								: CreateCompany(values);
							const res = await action;
							await dispatch(res);
							action.then(() => {
								dispatch({ type: RESET_COMPANY_FORM });
								props.modalSet(props.valueModalSet);
								setShowAlert(true);
								setVarianAlert("success");
								Companys.id
									? setAlertMessage("Data Berhasil di Edit")
									: setAlertMessage("Data Berhasil di Tambah");
								setTimeout(function () {
									window.location.reload();
								}, 1000);
							});
							dispatch({ type: RESET_COMPANY_FORM });
						} catch (e) {
							setShowAlert(true);
							setAlertMessage("Gagal Update Data");
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
									{Companys?.id ? <>Edit Data</> : <>Tambah Data</>}
								</Modal.Title>
							</Modal.Header>
							<Modal.Body className="show-grid">
								<Container>
									<Row>
										<Col xs={12}>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Name Company</Form.Label>
												<Form.Control
													type="text"
													name="name"
													placeholder="Name Company"
													value={values?.name}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.name && errors.name ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.name}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Location</Form.Label>
												<Form.Control
													type="text"
													name="location"
													placeholder="Location"
													value={values?.location}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.location && errors.location ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.location}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Penanggung Jawab</Form.Label>
												<Form.Control
													type="text"
													name="person_responsible"
													placeholder="Penanggung Jawab"
													value={values?.person_responsible}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.person_responsible &&
												errors.person_responsible ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.person_responsible}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>NPWP</Form.Label>
												<Form.Control
													type="text"
													name="npwp"
													placeholder="NPWP"
													value={values?.npwp}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.npwp && errors.npwp ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.npwp}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Email</Form.Label>
												<Form.Control
													type="email"
													name="email"
													placeholder="Email"
													value={values?.email}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.email && errors.email ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.email}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Phone</Form.Label>
												<Form.Control
													type="text"
													name="phone"
													placeholder="Telephone"
													value={values?.phone}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.phone && errors.phone ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.phone}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Alamat</Form.Label>
												<Form.Control
													type="string"
													name="address"
													placeholder="Alamat"
													value={values?.address}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.address && errors.address ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.address}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Jumlah Pengguna</Form.Label>
												<Form.Control
													type="number"
													min="1"
													name="amount_access"
													placeholder="Jumlah Pengguna"
													value={values?.amount_access}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.amount_access && errors.amount_access ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.amount_access}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Persetujuan</Form.Label>
												<div className="d-flex">
													<Form.Check
														type="checkbox"
														label="box"
														name="service_type"
														value={values?.service_type[0]?.value as any}
													/>
													<Form.Check type="checkbox" label="folder" />
													<Form.Check type="checkbox" label="document" />
												</div>
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
