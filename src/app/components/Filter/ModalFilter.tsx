import {
  Dropdown,
  DropdownButton,
  Button,
  Col,
  Row,
  Container,
  Form,
  Modal,
} from 'react-bootstrap';

export function ModalFilter(props) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Filter</Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Row>
            <Col xs={12}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>No</Form.Label>
                <Form.Control type="no" />
                <Button
                  className="d-flex ai-center bg-success-6 mt-2 p-xs"
                  variant="success"
                >
                  Add Data<i className="far fa-plus ml-2"></i>
                </Button>{' '}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Tanggal Dokumen</Form.Label>
                <Form.Control type="date" />
                <Button
                  className="d-flex ai-center bg-success-6 mt-2 p-xs"
                  variant="success"
                >
                  Add Data<i className="far fa-plus ml-2"></i>
                </Button>{' '}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Uraian</Form.Label>
                <Form.Control type="text" />
                <Button
                  className="d-flex ai-center bg-success-6 mt-2 p-xs"
                  variant="success"
                >
                  Add Data<i className="far fa-plus ml-2"></i>
                </Button>{' '}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Tahun</Form.Label>
                <Form.Control type="year" />
                <Button
                  className="d-flex ai-center bg-success-6 mt-2 p-xs"
                  variant="success"
                >
                  Add Data<i className="far fa-plus ml-2"></i>
                </Button>{' '}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Nama User</Form.Label>
                <Form.Control type="text" />
                <Button
                  className="d-flex ai-center bg-success-6 mt-2 p-xs"
                  variant="success"
                >
                  Add Data<i className="far fa-plus ml-2"></i>
                </Button>{' '}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Unit Pengolahan</Form.Label>
                <Form.Select aria-label="unit">
                  <option>Pilih Unit</option>
                  <option value="1">Divisi Layanan Umum dan Logistik</option>
                  <option value="2">Divisi LUPP</option>
                  <option value="3">Divisi Pembendaharaan</option>
                </Form.Select>
                <Button
                  className="d-flex ai-center bg-success-6 mt-2 p-xs"
                  variant="success"
                >
                  Add Data<i className="far fa-plus ml-2"></i>
                </Button>{' '}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Record Center</Form.Label>
                <Form.Select aria-label="unit">
                  <option>Pilih Record Center</option>
                  <option value="1">RC Bandung</option>
                  <option value="2">RC Medan</option>
                  <option value="3">RC Cirebon</option>
                </Form.Select>
                <Button
                  className="d-flex ai-center bg-success-6 mt-2 p-xs"
                  variant="success"
                >
                  Add Data<i className="far fa-plus ml-2"></i>
                </Button>{' '}
              </Form.Group>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button className="bg-success-6" variant="success">
          Filter
        </Button>{' '}
        <Button variant="danger">Reset</Button>
      </Modal.Footer>
    </Modal>
  );
}
