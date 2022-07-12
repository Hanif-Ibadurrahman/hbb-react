import { Form, Modal, Button } from "react-bootstrap";
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
import { detachDocumentFromFolder } from "api/indexing";
import { getDocumentDetail } from "actions/DocumentAction";
import { DocumentInterfaceState } from "store/Types/DocumentTypes";
import { selectDocument } from "store/Selector/DocumentSelector";

const ModalDettach = props => {
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [varianAlert, setVarianAlert] = useState("");
	const document: DocumentInterfaceState = useSelector(selectDocument);
	const assignDocumentToFolder: AssignDocumentToFolderInterfaceState =
		useSelector(selectAssignToFolder);
	const cart = useSelector(selectindexings);

	const dispatch = useDispatch();

	const validationSchema = Yup.object().shape({});

	useEffect(() => {
		dispatch(getDocumentDetail(props.folder_id));
	}, [props.folder_id]);

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
						try {
							values.id = document.folder.id;
							values.document_codes = props.folder_id;
							const res = await detachDocumentFromFolder(values);
							if (res.status === 200) {
								props.modalSet(props.valueModalSet);
								setShowAlert(true);
								setAlertMessage("Mengeluarkan Document Berhasil");
								setVarianAlert("success");
								setTimeout(function () {
									window.location.reload();
								}, 1000);
							} else {
								props.modalSet(props.valueModalSet);
								setShowAlert(true);
								setAlertMessage("Mengeluarkan Document Gagal");
								setVarianAlert("danger");
							}
						} catch (err) {
							props.modalSet(props.valueModalSet);
							setShowAlert(true);
							setAlertMessage("Mengeluarkan Document Gagal");
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
								<div className="p-lg">
									Apakah anda yakin mengeluarkan document dari folder?
								</div>
							</Modal.Header>
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

export default ModalDettach;
