import { Form, Modal, Container, Row, Col, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { Autocomplete, TextField } from "@mui/material";
import * as Yup from "yup";
import Alert from "app/components/Alerts";
import { useHistory } from "react-router";
import { FolderInterfaceState } from "store/Types/FolderTypes";
import { selectFolder } from "store/Selector/FolderSelector";
import { useDispatch, useSelector } from "react-redux";
import {
	CreateFolder,
	RESET_FOLDER_FORM,
	UpdateFolder,
} from "actions/FolderAction";
import { getCompanyList } from "actions/CompanyAction";
import { selectCompanys } from "store/Selector/CompanySelector";
import { selectDivisions } from "store/Selector/DivisionSelector";
import { getDivisionsList } from "actions/DivisionAction";

const ModalForm = props => {
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [varianAlert, setVarianAlert] = useState("");
	const company = useSelector(selectCompanys);
	const folder: FolderInterfaceState = useSelector(selectFolder);
	const division = useSelector(selectDivisions);

	const DivisionData = (page = 1) => {
		dispatch(getDivisionsList(page));
	};

	const FetchData = (page = 1) => {
		dispatch(getCompanyList(page));
	};

	useEffect(() => {
		FetchData();
	}, []);
	useEffect(() => {
		DivisionData();
	}, []);
	const dispatch = useDispatch();
	const validationSchema = Yup.object().shape({
		no: Yup.string().required("*Wajib diisi"),
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
					initialValues={folder}
					enableReinitialize={true}
					onSubmit={async values => {
						try {
							let action = folder?.id
								? UpdateFolder(values)
								: CreateFolder(values);
							const res = await action;
							await dispatch(res);
							action.then(() => {
								dispatch({ type: RESET_FOLDER_FORM });
								props.modalSet(props.valueModalSet);
								props.modalSet(props.valueModalSet);
								setShowAlert(true);
								setVarianAlert("success");
								folder?.id
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
							<Modal.Header closeButton className="bg-primary-5">
								<Modal.Title id="contained-modal-title-vcenter">
									{folder?.id ? <>Edit Data</> : <>Tambah Data</>}
								</Modal.Title>
							</Modal.Header>
							<Modal.Body className="show-grid">
								<Container>
									<Row>
										<Col xs={12}>
											<Form.Group className="mb-4">
												<Form.Label>Nomor Dokumen</Form.Label>
												<Form.Control
													type="text"
													name="no"
													placeholder="No Dokument"
													value={values?.no}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.no && errors.no ? (
													<p className="tc-danger-5 pos-a p-sm">{errors.no}</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Pilih Perusahaan</Form.Label>
												<Autocomplete
													id="company"
													options={company.Companys}
													value={values.company}
													getOptionLabel={option => option.name}
													onChange={(e, value) => {
														console.log(value);
														setFieldValue(
															"company",
															value !== null ? value : values.company,
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
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Pilih Divisi</Form.Label>
												<Autocomplete
													id="division_id"
													options={division.Divisions}
													value={values.division}
													getOptionLabel={option => option.name}
													onChange={(e, value) => {
														console.log(value);
														setFieldValue(
															"division",
															value !== null ? value : values.division,
														);
													}}
													renderInput={params => (
														<TextField
															margin="normal"
															placeholder="Transporter"
															name="division_id"
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
									disabled={
										isSubmitting ||
										values?.company?.id === "" ||
										values?.division?.id === ""
									}
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
