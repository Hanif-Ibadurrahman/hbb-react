import {
	Form,
	Modal,
	Container,
	Row,
	Col,
	Button,
	InputGroup,
} from "react-bootstrap";
import React, { useState } from "react";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import Alert from "app/components/Alerts";
import { useHistory } from "react-router";
import api from "../../../../api/dox";

export function ModalForm() {
	let history = useHistory();
	const [index, setindex] = useState("");
	const [tanggal_pemindahan, settanggal_pemindahan] = useState("");
	const [tipe_berkas, settipe_berkas] = useState("");
	const [klasifikasi, setklasifikasi] = useState("");
	const [record_center, setrecord_center] = useState("");
	const [ruangan, setruangan] = useState("");
	const [lemari, setlemari] = useState("");
	const [no_box, setno_box] = useState("");
	const [no_folder, setno_folder] = useState("");
	const [masa_retensi, setmasa_retensi] = useState("");

	const [modalShow, setModalShow] = useState(false);
	const [showAlert, setShowAlert] = useState(false);

	const _onHide = () => {
		setModalShow(false);
		setShowAlert(false);
		console.log("hide modal");
	};

	const _onSubmit = () => {
		// api
		// 	.post(`/areas`, {
		// 		name,
		// 	})
		// 	.then(() => {
		// 		history.push("/Area");
		// 	});
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
		index: Yup.string().required("*Wajib diisi"),
		tanggal_pemindahan: Yup.date().required("*Wajib diisi"),
		tipe_berkas: Yup.string().required("*Wajib diisi"),
		klasifikasi: Yup.string().required("*Wajib diisi"),
		record_center: Yup.string().required("*Wajib diisi"),
		ruangan: Yup.string().required("*Wajib diisi"),
		lemari: Yup.string().required("*Wajib diisi"),
		no_box: Yup.string().required("*Wajib diisi"),
		no_folder: Yup.string().required("*Wajib diisi"),
		masa_retensi: Yup.string().required("*Wajib diisi"),
	});

	const berkas = [
		{ value: "subtantif", label: "Subtantif" },
		{ value: "fasilitatif", label: "Fasilitatif" },
	];

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
					index: "",
					tanggal_pemindahan: "",
					tipe_berkas: "",
					klasifikasi: "",
					record_center: "",
					ruangan: "",
					lemari: "",
					no_box: "",
					no_folder: "",
					masa_retensi: "",
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
											<Form.Group className="mb-4" controlId="formIndex">
												<Form.Label>Index</Form.Label>
												<Form.Control
													type="text"
													name="index"
													placeholder="Index"
													value={values.index}
													onChange={e => {
														handleChange(e);
														setindex(e.target.value);
													}}
													onBlur={handleBlur}
												/>
												{touched.index && errors.index ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.index}
													</p>
												) : null}
											</Form.Group>
											<Form.Group
												className="mb-4"
												controlId="formTglPemindahan"
											>
												<Form.Label>Tanggal Pemindahan</Form.Label>
												<Form.Control
													type="date"
													name="tanggal_pemindahan"
													placeholder="Tanggal Pemindahan"
													value={values.tanggal_pemindahan}
													onChange={e => {
														handleChange(e);
														settanggal_pemindahan(e.target.value);
													}}
													onBlur={handleBlur}
												/>
												{touched.tanggal_pemindahan &&
												errors.tanggal_pemindahan ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.tanggal_pemindahan}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formTipeBerkas">
												<Form.Label>Tipe Berkas</Form.Label>
												<InputGroup>
													<Form.Control
														as="select"
														className="cur-p"
														name="tipe_berkas"
														value={values.tipe_berkas}
														onChange={e => {
															handleChange(e);
															settipe_berkas(e.target.value);
														}}
														onBlur={handleBlur}
													>
														<option value="none">Pilih Tipe</option>
														<option value="subtantif">Subtantif</option>
														<option value="fasilitatif">Fasilitatif</option>
													</Form.Control>
													<InputGroup.Text>
														<i className="far fa-chevron-down"></i>
													</InputGroup.Text>
												</InputGroup>
												{touched.tipe_berkas && errors.tipe_berkas ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.tipe_berkas}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formKlasifikasi">
												<Form.Label>Klasifikasi</Form.Label>
												<Form.Control
													type="text"
													name="klasifikasi"
													placeholder="klasifikasi"
													value={values.klasifikasi}
													onChange={e => {
														handleChange(e);
														setklasifikasi(e.target.value);
													}}
													onBlur={handleBlur}
												/>
												{touched.klasifikasi && errors.klasifikasi ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.klasifikasi}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formRecordCenter">
												<Form.Label>Tipe Berkas</Form.Label>
												<InputGroup>
													<Form.Control
														as="select"
														className="cur-p"
														name="record_center"
														value={values.record_center}
														onChange={e => {
															handleChange(e);
															setrecord_center(e.target.value);
														}}
														onBlur={handleBlur}
													>
														<option value="none">Pilih Record Center</option>
														<option value="rc_bandung">RC Bandung</option>
														<option value="rc_medan">RC Medan</option>
														<option value="rc_cirebon">RC Cirebon</option>
														<option value="rc_surabaya">RC Surabaya</option>
														<option value="rc_bogor">RC Bogor</option>
														<option value="rc_klender">RC Klender</option>
														<option value="rc_ketapang">RC Ketapang</option>
													</Form.Control>
													<InputGroup.Text>
														<i className="far fa-chevron-down"></i>
													</InputGroup.Text>
												</InputGroup>
												{touched.record_center && errors.record_center ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.record_center}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formRuangan">
												<Form.Label>Ruangan</Form.Label>
												<InputGroup>
													<Form.Control
														as="select"
														className="cur-p"
														name="ruangan"
														value={values.ruangan}
														onChange={e => {
															handleChange(e);
															setruangan(e.target.value);
														}}
														onBlur={handleBlur}
													>
														<option value="none">Pilih Ruangan</option>
														<option value="rc_bandung">PMO 1</option>
														<option value="rc_medan">PMO 2</option>
														<option value="rc_cirebon">Pusat 1</option>
														<option value="rc_surabaya">Pusat 2</option>
														<option value="rc_bogor">TSJ</option>
													</Form.Control>
													<InputGroup.Text>
														<i className="far fa-chevron-down"></i>
													</InputGroup.Text>
												</InputGroup>
												{touched.ruangan && errors.ruangan ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.ruangan}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formLemari">
												<Form.Label>Lemari</Form.Label>
												<Form.Control
													type="text"
													name="lemari"
													placeholder="Lemari"
													value={values.lemari}
													onChange={e => {
														handleChange(e);
														setlemari(e.target.value);
													}}
													onBlur={handleBlur}
												/>
												{touched.lemari && errors.lemari ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.lemari}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formNoBox">
												<Form.Label>No Box</Form.Label>
												<Form.Control
													type="text"
													name="no_box"
													placeholder="No Box"
													value={values.no_box}
													onChange={e => {
														handleChange(e);
														setno_box(e.target.value);
													}}
													onBlur={handleBlur}
												/>
												{touched.no_box && errors.no_box ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.no_box}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formNoFolder">
												<Form.Label>No Folder</Form.Label>
												<Form.Control
													type="text"
													name="no_folder"
													placeholder="No Folder"
													value={values.no_folder}
													onChange={e => {
														handleChange(e);
														setno_folder(e.target.value);
													}}
													onBlur={handleBlur}
												/>
												{touched.no_folder && errors.no_folder ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.no_folder}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formMasaRetensi">
												<Form.Label>Masa Retensi</Form.Label>
												<Form.Control
													type="number"
													name="masa_retensi"
													placeholder="Masa Retensi"
													value={values.masa_retensi}
													onChange={e => {
														handleChange(e);
														setmasa_retensi(e.target.value);
													}}
													onBlur={handleBlur}
												/>
												{touched.masa_retensi && errors.masa_retensi ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.masa_retensi}
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
