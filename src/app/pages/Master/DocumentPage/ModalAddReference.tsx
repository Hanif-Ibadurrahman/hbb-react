import { Form, Modal, Container, Row, Col, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Alert from "app/components/Alerts";
import { useDispatch, useSelector } from "react-redux";
import { AssignDocumentToFolderInterfaceState } from "store/Types/IndexingTypes";
import {
	selectAssignToFolder,
	selectindexings,
} from "store/Selector/IndexingSelector";
import { getDocumentDetail } from "actions/DocumentAction";
import { DocumentInterfaceState } from "store/Types/DocumentTypes";
import { selectDocument } from "store/Selector/DocumentSelector";

const ModalAddReference = props => {
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [varianAlert, setVarianAlert] = useState("");
	const [fileUpload, setFileUpload] = useState();
	const document: DocumentInterfaceState = useSelector(selectDocument);
	const assignDocumentToFolder: AssignDocumentToFolderInterfaceState =
		useSelector(selectAssignToFolder);

	const dispatch = useDispatch();

	const validationSchema = Yup.object().shape({});

	useEffect(() => {
		dispatch(getDocumentDetail(props.folder_id));
	}, [props.folder_id]);

	function onChangeFile(event: any) {
		setFileUpload(event.currentTarget.files[0]);
	}

	console.log("id >>>", document.id);

	const uploadDocumentFile = async data => {
		var formdata = new FormData();
		formdata.append("document_file", data, "[PROXY]");
		const token = localStorage.getItem("Token");

		const response = await fetch(
			`http://103.93.57.36:8008/documents/${document.id}`,
			{
				method: "PUT",
				body: formdata,
				redirect: "follow",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
		return response;
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
					onSubmit={async (values: any) => {
						try {
							const res = await uploadDocumentFile(fileUpload);
							if (res.status === 200) {
								props.modalSet(props.valueModalSet);
								setShowAlert(true);
								setAlertMessage("Request Berhasil");
								setVarianAlert("success");
								setTimeout(() => {
									setShowAlert(false);
								}, 1500);
								setTimeout(() => {
									window.location.reload();
								}, 2000);
								// setValueUpload("");
							} else {
								props.modalSet(props.valueModalSet);
								setShowAlert(true);
								setAlertMessage("Request Gagal");
								setVarianAlert("danger");
								setTimeout(() => {
									setShowAlert(false);
								}, 2000);
								console.log(res.body);
							}
						} catch (err) {
							props.modalSet(props.valueModalSet);
							setShowAlert(true);
							setAlertMessage("Request Gagal");
							setVarianAlert("danger");
							setTimeout(() => {
								setShowAlert(false);
							}, 2000);
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
								<div className="p-lg">Pilih File</div>
							</Modal.Header>
							<Modal.Body>
								<Form.Group>
									<input
										id="file"
										name="file"
										type="file"
										// value={valueUpload}
										onChange={e => {
											console.log("onchange", e);
											// setValueUpload(e.target.value);
											onChangeFile(e);
										}}
										accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
										className="form-control"
									/>
								</Form.Group>
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
									Ya
								</Button>{" "}
							</Modal.Footer>
						</Form>
					)}
				</Formik>
			</Modal>
		</>
	);
};

export default ModalAddReference;
