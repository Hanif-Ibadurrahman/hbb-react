import React, { useState } from "react";
import { Modal, Container, Button } from "react-bootstrap";
import Alert from "app/components/Alerts";

export function ConfirmationModal(props) {
	const [modalShow, setModalShow] = useState(false);
	const [showAlert, setShowAlert] = useState(false);

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
			{/* <Button
        className="d-flex ai-center bg-success-6"
        variant="success"
        onClick={() => setModalShow(true)}
      >
        Add Data<i className="far fa-plus ml-2"></i>
      </Button>{' '} */}
			<span
				className="ph-2 h-12 bd-rs-6 d-flex ai-center jc-center bg-success-1 ml-a cur-p"
				onClick={() => setModalShow(true)}
			>
				<span className="text p-lg mh-2 tc-success-5">Proses</span>
				<span
					className="icon h-9 w-9 bd-rs-6 d-flex ai-center jc-center bg-success-5"
					style={{ marginTop: -3 }}
				>
					<i className="fas fa-chevron-double-right tc-dark-contrast"></i>
				</span>
			</span>
			<Alert
				text="Data Berhasil Di Input"
				variant="success"
				show={showAlert}
				onHide={() => setShowAlert(false)}
				style={{
					top: 50,
					position: "fixed",
					left: "50%",
					transform: [{ translateX: "-50%" }],
				}}
			/>
			<Modal
				show={modalShow}
				onHide={() => setModalShow(false)}
				aria-labelledby="contained-modal-title-vcenter"
			>
				<Modal.Header closeButton className="bg-primary-5">
					<Modal.Title id="contained-modal-title-vcenter">
						Code Request : A091321
					</Modal.Title>
				</Modal.Header>
				<Modal.Body className="show-grid">
					<Container>
						<p className="p-lg">Apakah anda sudah yakin?</p>
					</Container>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="danger" onClick={props.onHide}>
						Batal
					</Button>
					<Button
						className="bg-success-6"
						variant="success"
						onClick={_onSubmit}
					>
						Lanjutkan
					</Button>{" "}
				</Modal.Footer>
			</Modal>
		</>
	);
}
