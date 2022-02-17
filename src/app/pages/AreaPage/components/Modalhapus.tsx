import { Form, Modal, Button } from "react-bootstrap";
import Alert from "app/components/Alerts";
import React, { useState } from "react";

export function ModalHapus(props) {
	const [modalShow, setModalShow] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const handleClose = () => setModalShow(false);

	const _onHide = () => {
		setModalShow(false);
		setShowAlert(false);
		console.log("hide modal");
	};

	const _onSubmit = () => {
		setModalShow(false);
		setShowAlert(true);
		setTimeout(function () {
			setShowAlert(false);
		}, 4000);
		console.log("show alert hide modal");
	};
	return (
		<>
			<Button
				className="d-flex ai-center bg-danger-6"
				variant="danger"
				onClick={() => setModalShow(true)}
			>
				Delete <i className="fas fa-trash ml-2"></i>
			</Button>{" "}
			<Alert
				text="Data Berhasil Di Hapus"
				variant="danger"
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
				show={modalShow}
				onHide={() => setModalShow(false)}
				aria-labelledby="contained-modal-title-vcenter"
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">Delete</Modal.Title>
				</Modal.Header>
				<Modal.Body className="show-grid">
					<Form>
						<Form.Group className="mb-3">
							<Form.Label>Apakah anda yakin akan menghapus ini?</Form.Label>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="danger" onClick={handleClose}>
						Cancel
					</Button>
					<Button
						type="submit"
						className="bg-success-6"
						variant="success"
						onClick={_onSubmit}
					>
						Yes
					</Button>{" "}
				</Modal.Footer>
			</Modal>
		</>
	);
}
