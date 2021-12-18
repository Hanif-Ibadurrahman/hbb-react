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
	// const [CodeCompany, setCodeCompany] = useState("");
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setalertMessage] = useState("");
	const Companys: CompanyInterfaceState = useSelector(selectCompany);
	const dispatch = useDispatch();

	const validationSchema = Yup.object().shape({
		// CodeCompany: Yup.string().required("*Wajib diisi"),
		CodeName: Yup.string().required("*Wajib diisi"),
		CodeLocation: Yup.string().required("*Wajib diisi"),
		CodeLatitude: Yup.string().required("*Wajib diisi"),
		CodeLongitude: Yup.string().required("*Wajib diisi"),
		CodeAgree: Yup.string().required("*Wajib diisi"),
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
					initialValues={Companys}
					enableReinitialize={true}
					onSubmit={async values => {
						try {
							let action = Companys.Id
								? UpdateCompany(values)
								: CreateCompany(values);
							// dispatch(loadingbarTurnOn)
							const res = await action;
							await dispatch(res);
							action.then(() => {
								dispatch({ type: RESET_COMPANY_FORM });
								props.modalSet(props.valueModalSet);
							});
							dispatch({ type: RESET_COMPANY_FORM });
							props.modalSet(props.valueModalSet);
							Companys.Id ? (
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
									{Companys.Id ? <>Edit Data</> : <>Tambah Data</>}
								</Modal.Title>
							</Modal.Header>
							<Modal.Body className="show-grid">
								<Container>
									<Row>
										<Col xs={12}>
											{/* <Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Code Company</Form.Label>
												<Form.Control
													type="text"
													name="CodeCompany"
													placeholder="Code"
													value={values.CodeCompany}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.CodeCompany && errors.CodeCompany ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.CodeCompany}
													</p>
												) : null}
											</Form.Group> */}
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Name Company</Form.Label>
												<Form.Control
													type="text"
													name="CodeName"
													placeholder="Name Company"
													value={values.CodeName}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.CodeName && errors.CodeName ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.CodeName}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Location</Form.Label>
												<Form.Control
													type="text"
													name="CodeLocation"
													placeholder="Location"
													value={values.CodeLocation}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.CodeLocation && errors.CodeLocation ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.CodeLocation}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Latitude</Form.Label>
												<Form.Control
													type="number"
													name="CodeLatitude"
													placeholder="Latitude"
													value={values.CodeLatitude}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.CodeLatitude && errors.CodeLatitude ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.CodeLatitude}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Longitude</Form.Label>
												<Form.Control
													type="number"
													name="CodeLongitude"
													placeholder="Longitude"
													value={values.CodeLongitude}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.CodeLongitude && errors.CodeLongitude ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.CodeLongitude}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Persetujuan</Form.Label>
												<FormControlLabel
													control={<Checkbox defaultChecked />}
													label="Hide"
												/>
											</Form.Group>
											{/* <Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Create</Form.Label>
												<Form.Control
													type="date"
													name="CodeCreatedate"
													placeholder="Code"
													value={values.CodeCreatedate}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.CodeCreatedate && errors.CodeCreatedate ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.CodeCreatedate}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Update</Form.Label>
												<Form.Control
													type="date"
													name="CodeUpdatedate"
													placeholder="Code"
													value={values.CodeUpdatedate}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.CodeUpdatedate && errors.CodeUpdatedate ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.CodeUpdatedate}
													</p>
												) : null}
											</Form.Group> */}
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
