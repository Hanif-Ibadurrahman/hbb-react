import { Form, Modal, Container, Row, Col, Button } from 'react-bootstrap';
export function ModalDivisi(props) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Tambah</Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nama Divisi</Form.Label>
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
