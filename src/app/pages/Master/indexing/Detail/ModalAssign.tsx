import { Form, Modal, Container, Row, Col, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Alert from "app/components/Alerts";
import { useDispatch, useSelector } from "react-redux";
import { AssignToFolder, DeleteCartAssign } from "actions/IndexingAction";
import { AssignDocumentToFolderInterfaceState } from "store/Types/IndexingTypes";
import {
	selectAssignToFolder,
	selectindexings,
} from "store/Selector/IndexingSelector";
import { assignToFolder } from "api/indexing";
import { Autocomplete, TextField } from "@mui/material";
import { selectFolders } from "store/Selector/FolderSelector";
import { getFoldersList } from "actions/FolderAction";

const ModalAssign = props => {
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [varianAlert, setVarianAlert] = useState("");
	const folder = useSelector(selectFolders);
	const FetchData = (page = 1) => {
		dispatch(getFoldersList(page));
	};
	useEffect(() => {
		FetchData();
	}, []);
	const assignDocumentToFolder: AssignDocumentToFolderInterfaceState =
		useSelector(selectAssignToFolder);
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
					initialValues={assignDocumentToFolder}
					enableReinitialize={true}
					onSubmit={async values => {
						values.id = values.id_folder.id;
						values.document_codes = cartStash;
						assignToFolder(values);
						props.modalSet(props.valueModalSet);
						setShowAlert(true);
						setAlertMessage("Pemindahan Folder Berhasil");
						setVarianAlert("success");
						setTimeout(function () {
							window.location.reload();
						}, 1000);
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
									Assign Document To Folder
								</Modal.Title>
							</Modal.Header>
							<Modal.Body className="show-grid">
								<Container>
									<Row>
										<Col xs={12}>
											<Form.Group>
												<Form.Label>List Document</Form.Label>
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
												<Form.Label>Pilih Folder</Form.Label>
												<Autocomplete
													id="folder"
													options={folder.Folders}
													getOptionLabel={option => option.no}
													value={values?.id_folder}
													onChange={(e, value) => {
														setFieldValue(
															"id_folder",
															value !== null ? value : values.id_folder,
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
