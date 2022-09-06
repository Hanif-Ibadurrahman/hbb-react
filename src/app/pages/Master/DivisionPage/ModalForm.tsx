import { Form, Modal, Container, Row, Col, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Alert from "app/components/Alerts";
import { selectDivision } from "../../../../store/Selector/DivisionSelector";
import { useDispatch, useSelector } from "react-redux";
import {
	CreateDivision,
	UpdateDivision,
	RESET_DIVISION_FORM,
} from "actions/DivisionAction";
import { DivisionInterfaceState } from "store/Types/DivisionTypes";
import { selectCompanys } from "store/Selector/CompanySelector";
import { getCompanyList } from "actions/CompanyAction";
import { Autocomplete, TextField } from "@mui/material";

const ModalForm = props => {
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [varianAlert, setVarianAlert] = useState("");
	const divisions: DivisionInterfaceState = useSelector(selectDivision);
	const company = useSelector(selectCompanys);

	const FetchData = (page = 1) => {
		dispatch(getCompanyList(page));
	};

	useEffect(() => {
		FetchData();
	}, []);

	const dispatch = useDispatch();

	const validationSchema = Yup.object().shape({
		name: Yup.string().required("*Wajib diisi"),
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
					initialValues={divisions}
					enableReinitialize={true}
					onSubmit={async values => {
						try {
							let action = divisions.id
								? UpdateDivision(values)
								: CreateDivision(values);
							// dispatch(loadingbarTurnOn)
							const res = await action;
							await dispatch(res);
							action.then(() => {
								setShowAlert(true);
								setVarianAlert("success");
								divisions.id
									? setAlertMessage("Data Berhasil di Edit")
									: setAlertMessage("Data Berhasil di Tambah");
								setTimeout(function () {
									window.location.reload();
								}, 1000);
								dispatch({ type: RESET_DIVISION_FORM });
								props.modalSet(props.valueModalSet);
							});
						} catch (e) {
							setShowAlert(true);
							setAlertMessage("Gagal Update Data");
							setVarianAlert("danger");
							setTimeout(function () {
								setShowAlert(false);
							}, 4000);
							dispatch({ type: RESET_DIVISION_FORM });
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
							<Modal.Header closeButton className="bg-primary-5">
								<Modal.Title id="contained-modal-title-vcenter">
									{divisions.id ? <>Edit Data</> : <>Tambah Data</>}
								</Modal.Title>
							</Modal.Header>
							<Modal.Body className="show-grid">
								<Container>
									<Row>
										<Col xs={12}>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Nama Satuan Kerja</Form.Label>
												<Form.Control
													type="text"
													name="name"
													placeholder="Nama Satuan Kerja"
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
												<Form.Label>Pilih Perusahaan</Form.Label>
												<Autocomplete
													id="company"
													options={company?.Companys}
													getOptionLabel={option => option.name}
													value={values?.company}
													onChange={(e, value) => {
														setFieldValue(
															"company",
															value !== null ? value : values?.company,
														);
													}}
													renderInput={params => (
														<TextField
															margin="normal"
															placeholder="Company"
															name="comapany_id"
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
