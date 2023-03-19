import React, { useState } from "react";
import {
	Dropdown,
	DropdownButton,
	Button,
	Col,
	Row,
	Container,
	Form,
	Modal,
} from "react-bootstrap";

export function ModalFilter(props) {
	const handleSubmit = e => {
		e.preventDefault();
		console.log("Form was submitted, now the modal can be closed");
	};

	function handleChange(event) {
		var textChange = event.target.value,
			eventId = event.target.id;

		console.log(eventId + " : " + textChange);
	}

	return (
		<Modal
			{...props}
			aria-labelledby="contained-modal-title-vcenter"
			className="right"
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">Filter</Modal.Title>
			</Modal.Header>
			<Form onSubmit={handleSubmit} id="filterForm">
				<Modal.Body className="show-grid">
					<Container>
						<Row>
							<Col xs={12}>
								<Form.Group className="mb-6" controlId="formNo">
									<Form.Label>No</Form.Label>
									<Form.Control type="no" onChange={handleChange} />
								</Form.Group>
								<Form.Group className="mb-6" controlId="formTanggalDokumen">
									<Form.Label>Tanggal Dokumen</Form.Label>
									<Form.Control type="date" onChange={handleChange} />
								</Form.Group>
								<Form.Group className="mb-6" controlId="formUraian">
									<Form.Label>Uraian</Form.Label>
									<Form.Control type="text" onChange={handleChange} />
								</Form.Group>
								<Form.Group className="mb-6" controlId="formTahun">
									<Form.Label>Tahun</Form.Label>
									<Form.Control type="year" onChange={handleChange} />
								</Form.Group>
								<Form.Group className="mb-6" controlId="formNamaUser">
									<Form.Label>Nama User</Form.Label>
									<Form.Control type="text" onChange={handleChange} />
								</Form.Group>
								<Form.Group className="mb-6" controlId="formUnitPengolah">
									<Form.Label>Unit Pengolahan</Form.Label>
									<Form.Select aria-label="unit" onChange={handleChange}>
										<option>Pilih Unit</option>
										<option value="1">Divisi Layanan Umum dan Logistik</option>
										<option value="2">Divisi LUPP</option>
										<option value="3">Divisi Pembendaharaan</option>
									</Form.Select>
								</Form.Group>
								<Form.Group className="mb-0" controlId="formRecordCenter">
									<Form.Label>Record Center</Form.Label>
									<Form.Select aria-label="unit" onChange={handleChange}>
										<option>Pilih Record Center</option>
										<option value="1">RC Bandung</option>
										<option value="2">RC Medan</option>
										<option value="3">RC Cirebon</option>
									</Form.Select>
								</Form.Group>
							</Col>
						</Row>
					</Container>
				</Modal.Body>
				<Modal.Footer>
					<Button
						className="bg-success-6"
						variant="success"
						type="submit"
						form="filterForm"
					>
						Filter
					</Button>{" "}
					<Button variant="danger">Reset</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
}
