import { Form, Modal, Button, Dropdown } from "react-bootstrap";
import React, { useState } from "react";
import Alert from "app/components/Alerts";

export function ModalDelete() {
	const [modalShow, setModalShow] = useState(false);
	// const [showAlert, setShowAlert] = useState(false);

	const _onHide = () => {
		setModalShow(false);
		// setShowAlert(false);
		console.log("hide modal");
	};

	const _onSubmit = () => {
		setModalShow(false);
		// setShowAlert(true);
		// setTimeout(function () {
		//     setShowAlert(false);
		// }, 4000);
		console.log("show alert hide modal");
	};
	return (
		<>
			<div className={"w-100% h-1px bg-medium op-25% "} />
			<Dropdown.Item>
				<div
					className={"d-flex ai-center pv-2 tc-danger-5"}
					onClick={() => setModalShow(true)}
				>
					<span className="icon">
						<i className={"far fa-trash-alt p-sm mr-3"}></i>
					</span>
					<span className="text">Hapus</span>
				</div>
			</Dropdown.Item>
			{/* <Alert
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
            />   */}
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
					<Button variant="danger" onClick={_onHide}>
						Kembali
					</Button>
					<Button
						type="submit"
						className="bg-success-6"
						variant="success"
						onClick={_onSubmit}
					>
						Ya
					</Button>{" "}
				</Modal.Footer>
			</Modal>
		</>
	);
}
