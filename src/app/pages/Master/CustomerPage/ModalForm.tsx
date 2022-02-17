import { Form, Modal, Container, Row, Col, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Alert from "app/components/Alerts";
import {
	selectRoom,
	selectRooms,
} from "../../../../store/Selector/RoomSelector";
import { useDispatch, useSelector } from "react-redux";
import { CreateRoom, UpdateRoom, RESET_ROOM_FORM } from "actions/RoomAction";
import { RoomInterfaceState } from "store/Types/RoomTypes";
import { Autocomplete, TextField } from "@mui/material";
import { AreasInterfaceState } from "store/Types/AreaTypes";
import { selectAreas, selectArea } from "store/Selector/AreaSelector";
import { getAreasList } from "actions/AreaActions";
import { CompanyInterfaceState } from "store/Types/CompanyTypes";
import { selectCompanys } from "store/Selector/CompanySelector";
import { CustomerInterfaceState } from "store/Types/CustomerTypes";
import { selectDivisions } from "store/Selector/DivisionSelector";
import { getCompanyList } from "actions/CompanyAction";
import { getDivisionsList } from "actions/DivisionAction";
import { CreateCustomer, RESET_CUSTOMER_FORM } from "actions/CustomerAction";
import { selectCustomer } from "store/Selector/CustomerSelector";

export const ModalForm = props => {
	const [showAlert, setShowAlert] = useState(false);
	const [showAlertDanger, setShowAlertDanger] = useState(false);
	// const requestBox: RequestBoxInterfaceState = useSelector(selectRequestBox);
	const customer: CustomerInterfaceState = useSelector(selectCustomer);
	// const approvalOperation: ApprovalOperationInterfaceState = useSelector(
	// 	SelectApprovalOperation,
	// );
	const dispatch = useDispatch();

	// const transporter = useSelector(selectTransporters);
	// const archiver = useSelector(selectArchivers);

	const company = useSelector(selectCompanys);
	const division = useSelector(selectDivisions);

	const FetchData = (page = 1) => {
		dispatch(getCompanyList(page));
	};

	const DivisionData = (page = 1) => {
		dispatch(getDivisionsList(page));
	};

	useEffect(() => {
		DivisionData();
	}, []);

	useEffect(() => {
		FetchData();
	}, []);

	const validationSchema = Yup.object().shape({
		// CodeCompany: Yup.string().required("*Wajib diisi"),
		username: Yup.string().required("*Wajib diisi"),
		password: Yup.string().required("*Wajib diisi").min(8, "Min 8 Karakter"),
		name: Yup.string().required("*Wajib diisi"),
		email: Yup.string().required("*Wajib diisi"),
		phone: Yup.string().required("*Wajib diisi"),
		location: Yup.string().required("*Wajib diisi"),
	});

	return (
		<>
			<Alert
				text="Data Berhasil Approve"
				variant="success"
				show={showAlert}
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
					initialValues={customer}
					enableReinitialize={true}
					onSubmit={async values => {
						try {
							let action = CreateCustomer(values);
							const res = await action;
							await dispatch(res);
							action.then(() => {
								dispatch({ type: RESET_CUSTOMER_FORM });
								props.modalSet(props.valueModalSet);
								setShowAlert(true);
								setTimeout(function () {
									window.location.reload();
								}, 1000);
							});
						} catch (e) {
							setShowAlertDanger(true);
							setTimeout(function () {
								setShowAlertDanger(false);
							}, 4000);
							dispatch({ type: RESET_CUSTOMER_FORM });
							props.modalSet(props.valueModalSet);
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
						setFieldValue,
					}) => (
						<Form onSubmit={handleSubmit}>
							<Modal.Header closeButton className="bg-primary-5">
								<Modal.Title id="contained-modal-title-vcenter">
									Tambah Customer
								</Modal.Title>
							</Modal.Header>
							<Modal.Body className="show-grid">
								<Container>
									<Row>
										<Col xs={12}>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Username</Form.Label>
												<Form.Control
													type="text"
													name="username"
													placeholder="Username"
													value={values?.username}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.username && errors.username ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.username}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Password</Form.Label>
												<Form.Control
													type="text"
													name="password"
													placeholder="password"
													value={values?.password}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.password && errors.password ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.password}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Nama</Form.Label>
												<Form.Control
													type="text"
													name="name"
													placeholder="Nama"
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
												<Form.Label>Email</Form.Label>
												<Form.Control
													type="text"
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
													placeholder="Nomer Telepon"
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
												<Form.Label>Pilih Perusahaan</Form.Label>
												<Autocomplete
													id="company"
													options={company.Companys}
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
													getOptionLabel={option => option.name}
													onChange={(e, value) => {
														console.log(value);
														setFieldValue(
															"division_id",
															value !== null ? value : values.division_id,
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
