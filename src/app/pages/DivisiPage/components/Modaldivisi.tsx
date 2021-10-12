import { Form, Modal, Button } from 'react-bootstrap';
import Alert from 'app/components/Alerts';
import React, { useState } from 'react';

export function ModalDivisi(props) {
  const [modalShow, setModalShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const _onHide = () => {
    setModalShow(false);
    setShowAlert(false);
    console.log('hide modal');
  };

  const _onSubmit = () => {
    setModalShow(false);
    setShowAlert(true);
    setTimeout(function () {
      setShowAlert(false);
    }, 4000);
    console.log('show alert hide modal');
  };

  return (
    <>
      <Button
        className="d-flex ai-center bg-success-6"
        variant="success"
        onClick={() => setModalShow(true)}
      >
        Add Data<i className="far fa-plus ml-2"></i>
      </Button>{' '}
      <Alert
        text="Data Berhasil Di Input"
        variant="success"
        show={showAlert}
        style={{
          top: 50,
          position: 'fixed',
          left: '50%',
          transform: [{ translateX: '-50%' }],
        }}
        onHide={() => setShowAlert(false)}
      />
      <Modal
        aria-labe
        show={modalShow}
        onHide={() => setModalShow(false)}
        aria-labelledby="contained-modal-title-vcenter"
      >
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
          <Button variant="danger" onClick={props.onHide}>
            Kembali
          </Button>
          <Button
            type="submit"
            className="bg-success-6"
            variant="success"
            onClick={_onSubmit}
          >
            Tambah Data
          </Button>{' '}
        </Modal.Footer>
      </Modal>
    </>
  );
}
