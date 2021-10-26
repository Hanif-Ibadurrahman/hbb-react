import { Form, Modal, Container, Row, Col, Button } from "react-bootstrap";
import React, { useState } from "react";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import Alert from "app/components/Alerts";
import { useHistory } from "react-router";
import api from "../../../../api/dox";

export function ModalForm() {
	let history = useHistory();
	const [no, setno] = useState("");
	const [date, setdate] = useState("");
	const [detail, setdetail] = useState("");
	const [nominal, setnominal] = useState("");
	const [active_year_for, setactive_year_for] = useState("");
	const [level_progress, setlevel_progress] = useState("");
	const [media_storage, setmedia_storage] = useState("");
	const [condition, setcondition] = useState("");
	const [amount, setamount] = useState("");
	const [cross_point, setcross_point] = useState("");
	const [description, setdescription] = useState("");
	const [no_digital, setno_digital] = useState("");

	const [modalShow, setModalShow] = useState(false);
	const [showAlert, setShowAlert] = useState(false);

	const _onHide = () => {
		setModalShow(false);
		setShowAlert(false);
		console.log("hide modal");
	};

	const _onSubmit = () => {
		api
			.post(`/documents`, {
				no,
				date,
				detail,
				nominal,
				active_year_for,
				level_progress,
				media_storage,
				condition,
				amount,
				cross_point,
				description,
				no_digital,
			})
			.then(() => {
				history.push("/Document");
			});
		setModalShow(false);
		setShowAlert(true);
		setTimeout(function () {
			setShowAlert(false);
		}, 4000);
		setTimeout(function () {
			window.location.reload();
		}, 1000);
		console.log("show alert hide modal");
	};

	const validationSchema = Yup.object().shape({
		no: Yup.string().required("*Wajib diisi"),
		date: Yup.date().required("*Wajib diisi"),
		detail: Yup.string().required("*Wajib diisi"),
		nominal: Yup.number().required("*Wajib diisi"),
		active_year_for: Yup.string()
			.min(2021, "Minimal Tahun 2021.")
			.max(2030, "Maximal Tahun 2030.")
			.required("*Wajib diisi"),
		level_progress: Yup.string().required("*Wajib diisi"),
		media_storage: Yup.string().required("*Wajib diisi"),
		condition: Yup.string().required("*Wajib diisi"),
		amount: Yup.string().required("*Wajib diisi"),
		cross_point: Yup.string().required("*Wajib diisi"),
		description: Yup.string().required("*Wajib diisi"),
		no_digital: Yup.string().required("*Wajib diisi"),
	});

	return (
		<>
			<Button
				className="d-flex ai-center bg-success-6"
				variant="success"
				onClick={() => setModalShow(true)}
			>
				Add Data<i className="far fa-plus ml-2"></i>
			</Button>{" "}
			<Alert
				text="Data Berhasil Di Input"
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
			<Formik
				validationSchema={validationSchema}
				initialValues={{
					no: "",
					date: "",
					detail: "",
					nominal: "",
					active_year_for: "",
					level_progress: "",
					media_storage: "",
					condition: "",
					amount: "",
					cross_point: "",
					description: "",
					no_digital: "",
				}}
				onSubmit={(values, { setSubmitting, resetForm }) => {
					// When button submits form and form is in the process of submitting, submit button is disabled
					setSubmitting(true);

					// Simulate submitting to database, shows us values submitted, resets form
					setTimeout(() => {
						alert(JSON.stringify(values, null, 2));
						resetForm();
						setSubmitting(false);
					}, 500);
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
					<Modal
						show={modalShow}
						onHide={() => setModalShow(false)}
						aria-labelledby="contained-modal-title-vcenter"
					>
						<Modal.Header closeButton className="bg-primary-5">
							<Modal.Title id="contained-modal-title-vcenter">
								Tambah Data
							</Modal.Title>
						</Modal.Header>
						<Modal.Body className="show-grid">
							<Container>
								<Row>
									<Col xs={12}>
										<Form onSubmit={handleSubmit}>
											{console.log(values)}
											<Form.Group className="mb-4" controlId="formNoDocument">
												<Form.Label>No Document</Form.Label>
												<Form.Control
													type="text"
													name="no"
													placeholder="No Dokumen"
													value={values.no}
													onChange={e => {
														handleChange(e);
														setno(e.target.value);
													}}
													onBlur={handleBlur}
												/>
												{touched.no && errors.no ? (
													<p className="tc-danger-5 pos-a p-sm">{errors.no}</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formTanggal">
												<Form.Label>Tanggal</Form.Label>
												<Form.Control
													type="date"
													name="date"
													placeholder="Tanggal"
													value={values.date}
													onChange={e => {
														handleChange(e);
														setdate(e.target.value);
													}}
													onBlur={handleBlur}
												/>
												{touched.date && errors.date ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.date}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formDetail">
												<Form.Label>Detail Dokumen</Form.Label>
												<Form.Control
													as="textarea"
													name="detail"
													placeholder="Detail Dokumen"
													value={values.detail}
													onChange={e => {
														handleChange(e);
														setdetail(e.target.value);
													}}
													onBlur={handleBlur}
												/>
												{touched.detail && errors.detail ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.detail}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formNominal">
												<Form.Label>Nominal</Form.Label>
												<Form.Control
													type="number"
													name="nominal"
													placeholder="Nominal"
													value={values.nominal}
													onChange={e => {
														handleChange(e);
														setnominal(e.target.value);
													}}
													onBlur={handleBlur}
												/>
												{touched.nominal && errors.nominal ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.nominal}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formDokumenAktif">
												<Form.Label>Dokumen Aktif</Form.Label>
												<Form.Control
													type="number"
													name="active_year_for"
													placeholder="Dokumen Aktif"
													value={values.active_year_for}
													min="2021"
													max="2030"
													onChange={e => {
														handleChange(e);
														setactive_year_for(e.target.value);
													}}
													onBlur={handleBlur}
												/>
												{touched.active_year_for && errors.active_year_for ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.active_year_for}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formDokumenAktif">
												<Form.Label>Level Progress</Form.Label>
												<Form.Control
													type="text"
													name="level_progress"
													placeholder="Level Progress"
													value={values.level_progress}
													onChange={e => {
														handleChange(e);
														setlevel_progress(e.target.value);
													}}
													onBlur={handleBlur}
												/>
												{touched.level_progress && errors.level_progress ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.level_progress}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formMediaStorage">
												<Form.Label>Tempat Penyimpanan</Form.Label>
												<Form.Control
													type="text"
													name="media_storage"
													placeholder="Tempat Penyimpanan"
													value={values.media_storage}
													onChange={e => {
														handleChange(e);
														setmedia_storage(e.target.value);
													}}
													onBlur={handleBlur}
												/>
												{touched.media_storage && errors.media_storage ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.media_storage}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formKondisi">
												<Form.Label>Kondisi Dokument</Form.Label>
												<Form.Control
													type="text"
													name="condition"
													placeholder="Kondisi Dokumen"
													value={values.condition}
													onChange={e => {
														handleChange(e);
														setcondition(e.target.value);
													}}
													onBlur={handleBlur}
												/>
												{touched.condition && errors.condition ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.condition}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formAmount">
												<Form.Label>Jumlah</Form.Label>
												<Form.Control
													type="number"
													name="amount"
													placeholder="Jumlah"
													value={values.amount}
													onChange={e => {
														handleChange(e);
														setamount(e.target.value);
													}}
													onBlur={handleBlur}
												/>
												{touched.amount && errors.amount ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.amount}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formCrossPoint">
												<Form.Label>Cross Point</Form.Label>
												<Form.Control
													type="text"
													name="cross_point"
													placeholder="Cross Point"
													value={values.cross_point}
													onChange={e => {
														handleChange(e);
														setcross_point(e.target.value);
													}}
													onBlur={handleBlur}
												/>
												{touched.cross_point && errors.cross_point ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.cross_point}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formDeskripsi">
												<Form.Label>Deskripsi</Form.Label>
												<Form.Control
													as="textarea"
													name="description"
													placeholder="Deskripsi"
													value={values.description}
													onChange={e => {
														handleChange(e);
														setdescription(e.target.value);
													}}
													onBlur={handleBlur}
												/>
												{touched.description && errors.description ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.description}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formNoDigital">
												<Form.Label>No Digital</Form.Label>
												<Form.Control
													type="text"
													name="no_digital"
													placeholder="No Digital"
													value={values.no_digital}
													onChange={e => {
														handleChange(e);
														setno_digital(e.target.value);
													}}
													onBlur={handleBlur}
												/>
												{touched.no_digital && errors.no_digital ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.no_digital}
													</p>
												) : null}
											</Form.Group>
										</Form>
									</Col>
								</Row>
							</Container>
						</Modal.Body>
						<Modal.Footer>
							<Button variant="danger" onClick={_onHide}>
								Close
							</Button>
							<Button
								type="submit"
								disabled={isSubmitting}
								className="bg-success-6"
								variant="success"
								onClick={_onSubmit}
							>
								Request
							</Button>{" "}
						</Modal.Footer>
					</Modal>
				)}
			</Formik>
		</>
	);
}
