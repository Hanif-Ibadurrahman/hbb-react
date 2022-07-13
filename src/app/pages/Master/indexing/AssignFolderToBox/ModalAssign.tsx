import { Form, Modal, Container, Row, Col, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Alert from "app/components/Alerts";
import { useDispatch, useSelector } from "react-redux";
import { DeleteCartAssign } from "actions/IndexingAction";
import { AssignFolderToBoxInterfaceState } from "store/Types/IndexingTypes";
import {
	selectAssignToBox,
	selectindexings,
} from "store/Selector/IndexingSelector";
import { assignToBox } from "api/indexing";
import { Autocomplete, TextField } from "@mui/material";
import { selectBoxes } from "store/Selector/BoxSelector";
import { getBoxesNotPage } from "actions/BoxActions";

const ModalAssign = props => {
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [varianAlert, setVarianAlert] = useState("");
	const boxes = useSelector(selectBoxes);
	const FetchData = (page = 1) => {
		dispatch(getBoxesNotPage(page));
	};
	useEffect(() => {
		FetchData();
	}, []);

	const assignDocumentToBox: AssignFolderToBoxInterfaceState =
		useSelector(selectAssignToBox);
	const cart = useSelector(selectindexings);
	const cartStash = cart.CartAssign;

	const dispatch = useDispatch();

	const validationSchema = Yup.object().shape({});

	const deleteCart = async id => {
		dispatch(await DeleteCartAssign(id));
	};

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
					initialValues={assignDocumentToBox}
					enableReinitialize={true}
					onSubmit={async values => {
						try {
							values.id = values.id_box.id;
							values.folder_codes = cartStash;
							const res = await assignToBox(values);
							if (res.status === 200) {
								props.modalSet(props.valueModalSet);
								setShowAlert(true);
								setAlertMessage("Pemindahan Folder Berhasil");
								setVarianAlert("success");
								setTimeout(function () {
									window.location.reload();
								}, 1000);
							} else {
								props.modalSet(props.valueModalSet);
								setShowAlert(true);
								setAlertMessage("Pemindahan Folder Gagal");
								setVarianAlert("danger");
							}
						} catch (err) {
							props.modalSet(props.valueModalSet);
							setShowAlert(true);
							setAlertMessage("Pemindahan Folder Gagal");
							setVarianAlert("danger");
							console.log(err);
						}
					}}
				>
					{({
						values,
						errors,
						touched,
						handleChange,
						handleBlur,
						setFieldValue,
						handleSubmit,
						isSubmitting,
					}) => (
						<Form onSubmit={handleSubmit}>
							<Modal.Header closeButton className="bg-primary-5">
								<Modal.Title id="contained-modal-title-vcenter">
									Assign Folder To Box
								</Modal.Title>
							</Modal.Header>
							<Modal.Body className="show-grid">
								<Container>
									<Row>
										<Col xs={12}>
											<Form.Group>
												<Form.Label>List Folder</Form.Label>
												{cartStash.map((cart, index) => (
													<>
														<div className="d-flex jc-between mb-2">
															<div className="col-10">
																<Form.Control
																	type="text"
																	value={cart}
																	readOnly
																/>
															</div>
															<Button
																variant="danger"
																onClick={() => deleteCart(cart)}
																className="d-flex jc-center ai-center"
															>
																<i className="far fa-times"></i>
															</Button>
														</div>
													</>
												))}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Pilih Box</Form.Label>
												<Autocomplete
													id="folder"
													options={boxes.Boxes}
													getOptionLabel={option => option.code_box}
													value={values?.id_box}
													onChange={(e, value) => {
														setFieldValue(
															"id_folder",
															value !== null ? value : values.id_box,
														);
													}}
													renderInput={params => (
														<TextField
															margin="normal"
															placeholder="Folder"
															name="id_folder"
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

export default ModalAssign;
