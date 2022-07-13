import { Form, Modal, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Alert from "app/components/Alerts";
import { useDispatch, useSelector } from "react-redux";
import { AssignFolderToBoxInterfaceState } from "store/Types/IndexingTypes";
import { selectAssignToBox } from "store/Selector/IndexingSelector";
import { detachFolderFromBox } from "api/indexing";
import { FolderInterfaceState } from "store/Types/FolderTypes";
import { selectFolder } from "store/Selector/FolderSelector";
import { getFolderDetail } from "actions/FolderAction";

const ModalDettach = props => {
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [varianAlert, setVarianAlert] = useState("");
	const folder: FolderInterfaceState = useSelector(selectFolder);
	const assignDocumentToBox: AssignFolderToBoxInterfaceState =
		useSelector(selectAssignToBox);

	const dispatch = useDispatch();

	const validationSchema = Yup.object().shape({});

	useEffect(() => {
		dispatch(getFolderDetail(props.box_id));
	}, [props.box_id]);

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
							values.id = folder?.box?.id;
							values.folder_codes = props?.box_id;
							const res = await detachFolderFromBox(values);
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
					{({ handleSubmit, isSubmitting }) => (
						<Form onSubmit={handleSubmit}>
							<Modal.Header closeButton className="bg-primary-5">
								<div className="p-lg">
									Apakah anda yakin mengeluarkan Folder dari Box?
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
