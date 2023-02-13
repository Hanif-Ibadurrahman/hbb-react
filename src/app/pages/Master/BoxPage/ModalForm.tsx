import {
	Form,
	Modal,
	Container,
	Row,
	Col,
	Button,
	Spinner,
} from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Alert from "app/components/Alerts";
import { selectBox } from "../../../../store/Selector/BoxSelector";
import { useDispatch, useSelector } from "react-redux";
import { CreateBox, UpdateBox, RESET_BOX_FORM } from "actions/BoxActions";
import { BoxInterfaceState } from "store/Types/BoxTypes";
import { Autocomplete, TextField } from "@mui/material";
import { selectCompanys } from "store/Selector/CompanySelector";
import { getCompanyList } from "actions/CompanyAction";
import { getDivisionsList } from "actions/DivisionAction";
import { selectDivisions } from "store/Selector/DivisionSelector";
import { selectRooms } from "store/Selector/RoomSelector";
import { getRoomsList } from "actions/RoomAction";
import { selectStaffs } from "store/Selector/StaffSelector";
import { getstaffsList } from "actions/StaffAction";

const ModalForm = props => {
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [varianAlert, setVarianAlert] = useState("");
	const box: BoxInterfaceState = useSelector(selectBox);
	const dispatch = useDispatch();
	const company = useSelector(selectCompanys);
	const division = useSelector(selectDivisions);
	const rooms = useSelector(selectRooms);
	const staffs = useSelector(selectStaffs);
	const DivisionData = (page = 1) => {
		dispatch(getDivisionsList(page));
	};
	const FetchData = (page = 1) => {
		dispatch(getCompanyList(page));
	};
	const RoomsData = (page = 1) => {
		dispatch(getRoomsList(page));
	};
	const StaffData = (page = 1) => {
		dispatch(getstaffsList(page));
	};
	useEffect(() => {
		FetchData();
		DivisionData();
		RoomsData();
		StaffData();
	}, []);
	const validationSchema = Yup.object().shape({
		code_box: Yup.string().required("*Wajib diisi"),
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
					initialValues={box}
					enableReinitialize={true}
					onSubmit={async values => {
						try {
							let action = box?.id ? UpdateBox(values) : CreateBox(values);
							const res = await action;
							await dispatch(res);
							action.then(() => {
								dispatch({ type: RESET_BOX_FORM });
								props.modalSet(props.valueModalSet);
								setShowAlert(true);
								setVarianAlert("success");
								box.id
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
									{box?.id ? <>Edit Data</> : <>Tambah Data</>}
								</Modal.Title>
							</Modal.Header>
							<Modal.Body className="show-grid">
								<Container>
									<Row>
										<Col xs={12}>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Kode Box</Form.Label>
												<Form.Control
													type="text"
													name="code_box"
													placeholder="Code"
													value={values?.code_box}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.code_box && errors.code_box ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.code_box}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Alternative Code</Form.Label>
												<Form.Control
													type="text"
													name="custom_code_box"
													placeholder="Code"
													value={values?.custom_code_box}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.custom_code_box && errors?.custom_code_box ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors?.custom_code_box}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Pilih Perusahaan</Form.Label>
												<Autocomplete
													id="company"
													options={company.Companys}
													getOptionLabel={option => option?.name}
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
													options={division?.Divisions}
													value={values?.division}
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
												<Form.Label>Kode Pelaksana</Form.Label>
												<Autocomplete
													id="staff"
													options={staffs.Staffs}
													value={values?.staff}
													getOptionLabel={option =>
														option?.staff?.implementer_code as any
													}
													onChange={(e, value) => {
														setFieldValue(
															"staff",
															value !== null ? value : values?.staff,
														);
													}}
													renderInput={params => (
														<TextField
															margin="normal"
															placeholder="Kode Pelaksana"
															name="staff"
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
