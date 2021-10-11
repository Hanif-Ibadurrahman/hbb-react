import { Form, Modal, Container, Row, Col, Button } from 'react-bootstrap';
import Alert from 'app/components/Alerts';

import React, { useState } from 'react';

export function ModalForm(props) {
  const [modalShow, setModalShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showReject, setShowReject] = useState(false);

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

  const _onReject = () => {
    setModalShow(false);
    setShowReject(true);
    setTimeout(function () {
      setShowReject(false);
    }, 4000);
    console.log('show alert hide modal');
  };
  return (
    <>
      <Button
        variant="warning"
        className="bg-warning-5 w-24"
        onClick={() => setModalShow(true)}
      >
        Pending
      </Button>
      <Alert
        text="Data Berhasil Di Approve"
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
      <Alert
        text="Data di Reject"
        variant="danger"
        show={showReject}
        style={{
          top: 50,
          position: 'fixed',
          left: '50%',
          transform: [{ translateX: '-50%' }],
        }}
        onHide={() => setShowReject(false)}
      />
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton className="bg-primary-5">
          <Modal.Title id="contained-modal-title-vcenter">
            Code Box : A091321
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <Container>
            <Row>
              <Col xs={12}>
                <Form>
                  <Form.Group className="mb-3" controlId="Code">
                    <Form.Label>Code</Form.Label>
                    <Form.Control type="text" disabled placeholder="A12O2O3" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="Date">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="text" disabled placeholder="04/09/21" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="Time">
                    <Form.Label>Time</Form.Label>
                    <Form.Control type="text" disabled placeholder="16:27" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="Quantity">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control type="text" disabled placeholder="10" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="Notes">
                    <Form.Label>Notes</Form.Label>
                    <Form.Control
                      as="textarea"
                      className="notesdisable"
                      disabled
                      placeholder="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
                    />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={_onReject}>
            Reject
          </Button>
          <Button
            type="submit"
            className="bg-success-6"
            variant="success"
            onClick={_onSubmit}
          >
            Approve
          </Button>{' '}
        </Modal.Footer>
      </Modal>
    </>
  );
}
function setShowReject(arg0: boolean) {
  throw new Error('Function not implemented.');
}
