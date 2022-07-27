import { Form, Modal, Container, Row, Col, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Alert from "app/components/Alerts";
import { Autocomplete, TextField } from "@mui/material";
import { selectBoxes } from "../../../../store/Selector/BoxSelector";
import { selectArea } from "store/Selector/AreaSelector";
import { selectCompany, selectCompanys } from "store/Selector/CompanySelector";
import { getCompanyList } from "actions/CompanyAction";
import { useDispatch, useSelector } from "react-redux";
import { CreateArea, UpdateArea, RESET_AREA_FORM } from "actions/AreaActions";
import { AreaInterfaceState } from "store/Types/AreaTypes";
import { selectClassification } from "store/Selector/ClassificationSelector";
import {
	CreateClassification,
	UpdateClassification,
	RESET_CLASSIFICATION_FORM,
} from "actions/ClassificationAction";
import { ClassificationInterfaceState } from "store/Types/ClassificationTypes";

const ModalForm = props => {
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [varianAlert, setVarianAlert] = useState("");
	const classification: ClassificationInterfaceState =
		useSelector(selectClassification);
	const dispatch = useDispatch();
	const company = useSelector(selectCompanys);
	const CompanyData = (page = 1) => {
		dispatch(getCompanyList(page));
	};
	useEffect(() => {
		CompanyData();
	}, []);

	const validationSchema = Yup.object().shape({
		name: Yup.string().required("*Wajib diisi"),
		code_classification: Yup.string().required("*Wajib diisi"),
		type: Yup.string().required("*Wajib diisi"),
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
					initialValues={classification}
					enableReinitialize={true}
					onSubmit={async values => {
						try {
							let action = classification.id
								? UpdateClassification(values)
								: CreateClassification(values);
							// dispatch(loadingbarTurnOn)
							const res = await action;
							await dispatch(res);
							action.then(() => {
								dispatch({ type: RESET_CLASSIFICATION_FORM });
								props.modalSet(props.valueModalSet);
								setShowAlert(true);
								setVarianAlert("success");
								classification?.id
									? setAlertMessage("Data Berhasil di Edit")
									: setAlertMessage("Data Berhasil di Tambah");
								setTimeout(function () {
									window.location.reload();
								}, 1000);
							});
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
						setFieldValue,
						isSubmitting,
					}) => (
						<Form onSubmit={handleSubmit}>
							{console.log("values >>>>", values)}
							<Modal.Header closeButton className="bg-primary-5">
								<Modal.Title id="contained-modal-title-vcenter">
									{classification.id ? <>Edit Data</> : <>Tambah Data</>}
								</Modal.Title>
							</Modal.Header>
							<Modal.Body className="show-grid">
								<Container>
									<Row>
										<Col xs={12}>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Nama Klasifikasi</Form.Label>
												<Form.Control
													type="text"
													name="name"
													placeholder="Nama Klasifikasi"
													value={values.name}
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
												<Form.Label>Kode Klasifikasi</Form.Label>
												<Form.Control
													type="text"
													name="code_classification"
													placeholder="Kode Klasifikasi"
													value={values.code_classification}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.code_classification &&
												errors.code_classification ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.code_classification}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Tipe Klasifikasi</Form.Label>
												<Form.Control
													type="text"
													name="type"
													placeholder="Tipe Klasifikasi"
													value={values.type}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.type && errors.type ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.type}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Pilih Company</Form.Label>
												<Autocomplete
													id="company"
													options={company.Companys}
													getOptionLabel={option => option.name}
													value={values?.company}
													onChange={(e, value) => {
														setFieldValue(
															"company",
															value !== null ? value : values.company,
														);
													}}
													renderInput={params => (
														<TextField
															margin="normal"
															placeholder="Company"
															name="company"
															{...params}
														/>
													)}
												/>
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
									disabled={isSubmitting || values?.company?.id === ""}
									className="bg-success-6"
									variant="success"
								>
									Tambah
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
