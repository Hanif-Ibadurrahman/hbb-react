import {
	Form,
	Modal,
	Container,
	Row,
	Col,
	Button,
	Spinner,
} from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Alert from "app/components/Alerts";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete, TextField } from "@mui/material";
import { selectRooms } from "store/Selector/RoomSelector";
import { StaffInterfaceState } from "store/Types/StaffTypes";
import { getRoomsList } from "actions/RoomAction";
import {
	CreateStaff,
	RESET_STAFF_FORM,
	getRoleList,
	UpdateStaff,
} from "actions/StaffAction";
import {
	selectStaff,
	selectRoles,
	selectStaffs,
} from "store/Selector/StaffSelector";

export const ModalForm = props => {
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [varianAlert, setVarianAlert] = useState("");
	const staff: StaffInterfaceState = useSelector(selectStaff);
	const dispatch = useDispatch();
	const rooms = useSelector(selectRooms);
	const roles = useSelector(selectStaffs);
	const FetchData = () => {
		dispatch(getRoleList());
	};

	const DivisionData = (page = 1) => {
		dispatch(getRoomsList(page));
	};

	useEffect(() => {
		FetchData();
		DivisionData();
	}, []);

	const addStaffSchema = Yup.object().shape({
		username: Yup.string().required("*Wajib diisi"),
		password: Yup.string().required("*Wajib diisi").min(8, "Min 8 Karakter"),
		name: Yup.string().required("*Wajib diisi"),
		nip: Yup.string().required("*Wajib diisi").max(18, "Maksimal 18 Karakter"),
	});

	const editStaffSchema = Yup.object().shape({
		name: Yup.string().required("*Wajib diisi"),
		nip: Yup.string().required("*Wajib diisi").max(18, "Maksimal 18 Karakter"),
		email: Yup.string().required("*Wajib diisi"),
	});

	const validationSchema = staff?.id ? editStaffSchema : addStaffSchema;

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
				<Formik
					validationSchema={validationSchema}
					initialValues={staff}
					enableReinitialize={true}
					onSubmit={async values => {
						try {
							let action = !staff?.id
								? CreateStaff(values)
								: UpdateStaff(values);
							const res = await action;
							await dispatch(res);
							action.then(() => {
								dispatch({ type: RESET_STAFF_FORM });
								props.modalSet(props.valueModalSet);
								setShowAlert(true);
								setVarianAlert("success");
								staff.id
									? setAlertMessage("Data Berhasil di Edit")
									: setAlertMessage("Data Berhasil di Tambah");
								setTimeout(function () {
									window.location.reload();
								}, 1000);
							});
						} catch (e: any) {
							setShowAlert(true);
							if (e?.response?.status === 422) {
								setAlertMessage("Gagal. Data Duplikat");
							} else {
								setAlertMessage("Gagal Update Data");
							}
							setVarianAlert("danger");
							setTimeout(function () {
								setShowAlert(false);
							}, 4000);
							dispatch({ type: RESET_STAFF_FORM });
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
									{staff?.id ? <>Edit Staff</> : <>Tambah Staff</>}
								</Modal.Title>
							</Modal.Header>
							<Modal.Body className="show-grid">
								<Container>
									<Row>
										<Col xs={12}>
											<Form.Group
												className="mb-4"
												controlId="formBasicEmail"
												style={{
													display: staff?.id ? "none" : "block",
													flexDirection: "column",
												}}
											>
												<Form.Label>Username</Form.Label>
												<Form.Control
													type="text"
													name="username"
													placeholder="Username"
													value={values?.username}
													onChange={e => {
														handleChange(e);
													}}
													disabled={staff?.id ? true : false}
													onBlur={handleBlur}
												/>
												{touched.username && errors.username ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.username}
													</p>
												) : null}
											</Form.Group>
											<Form.Group
												className="mb-4"
												controlId="formBasicEmail"
												style={{
													display: staff?.id ? "none" : "block",
													flexDirection: "column",
												}}
											>
												<Form.Label>Password</Form.Label>
												<Form.Control
													type="text"
													name="password"
													placeholder="password"
													value={values?.password}
													onChange={e => {
														handleChange(e);
													}}
													disabled={staff?.id ? true : false}
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
												<Form.Label>NIP</Form.Label>
												<Form.Control
													type="text"
													name="nip"
													placeholder="NIP"
													value={values?.nip}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.nip && errors.nip ? (
													<p className="tc-danger-5 pos-a p-sm">{errors.nip}</p>
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
												<Form.Label>Pilih Ruangan</Form.Label>
												<Autocomplete
													id="room"
													options={rooms.Rooms}
													value={values?.room}
													getOptionLabel={option => option.name}
													onChange={(e, value) => {
														setFieldValue(
															"room",
															value !== null ? value : values?.room,
														);
													}}
													renderInput={params => (
														<TextField
															margin="normal"
															placeholder="Ruangan"
															name="room"
															{...params}
														/>
													)}
												/>
											</Form.Group>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Jenis Pekerjaan</Form.Label>
												<Autocomplete
													id="roles"
													options={roles.Roles}
													value={values?.roles ?? values?.user?.roles[0]}
													getOptionLabel={option => option.name}
													onChange={(e, value) => {
														setFieldValue(
															"roles",
															value !== null ? value : values?.roles,
														);
													}}
													renderInput={params => (
														<TextField
															margin="normal"
															placeholder="Jenis Pekerjaan"
															name="roles"
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
									{isSubmitting && (
										<Spinner
											as="span"
											animation="border"
											size="sm"
											role="status"
											aria-hidden="true"
											className="ml-2"
										/>
									)}
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
