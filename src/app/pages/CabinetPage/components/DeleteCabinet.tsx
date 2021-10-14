import {
  Form,
  Modal,
  Container,
  Row,
  Col,
  Button,
  Dropdown,
} from 'react-bootstrap';
export function DeleteCabinet(props) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Menghapus</Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Apakah anda yakin akan menghapus ini?</Form.Label>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={props.onHide}>
          Ya
        </Button>
        <Button variant="danger" onClick={props.onHide}>
          Kembali
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
