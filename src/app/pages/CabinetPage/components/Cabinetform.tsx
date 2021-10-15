import {
	Form,
	Modal,
	Container,
	Row,
	Col,
	Button,
	Dropdown,
} from "react-bootstrap";
export function CabinetForm(props) {
	return (
		<Modal {...props} aria-labelledby="contained-modal-title-vcenter">
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Tambah Data
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className="show-grid">
				<Modal.Body>Record Center</Modal.Body>
				<Dropdown>
					<Dropdown.Toggle
						variant="light"
						id="dropdown-basic"
						className="col-12"
					>
						Nama Record Center
					</Dropdown.Toggle>

					<Dropdown.Menu>
						<Dropdown.Item href="#/action-1">RC Bogor</Dropdown.Item>
						<Dropdown.Item href="#/action-2">RC Bandung</Dropdown.Item>
						<Dropdown.Item href="#/action-3">RC Surabaya</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</Modal.Body>
			<Modal.Body className="show-grid">
				<Modal.Body>Room</Modal.Body>
				<Dropdown>
					<Dropdown.Toggle
						variant="light"
						id="dropdown-basic"
						className="col-12"
					>
						Room Name
					</Dropdown.Toggle>

					<Dropdown.Menu>
						<Dropdown.Item href="#/action-1">Bogor 1</Dropdown.Item>
						<Dropdown.Item href="#/action-2">Bandung 1</Dropdown.Item>
						<Dropdown.Item href="#/action-3">Surabaya 1</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</Modal.Body>
			<Modal.Body className="show-grid">
				<Form>
					<Form.Group className="mb-3">
						<Form.Label>Cabinet Code</Form.Label>
						<Form.Control type="text" />
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="info" onClick={props.onHide}>
					Tambah
				</Button>
				<Button variant="danger" onClick={props.onHide}>
					Kembali
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
