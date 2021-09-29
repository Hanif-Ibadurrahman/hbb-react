import { Form, Modal, Container, Row, Col, Button } from 'react-bootstrap';

import React, { useState } from 'react';

export function ModalForm(props) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
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
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Date</Form.Label>
                  <Form.Control type="date" placeholder="Enter Date" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Time</Form.Label>
                  <Form.Control type="time" placeholder="Enter Time" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control type="number" placeholder="Enter Quantity" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Notes</Form.Label>
                  <Form.Control as="textarea" placeholder="Enter Notes" />
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={props.onHide}>
          Close
        </Button>
        <Button className="bg-success-6" variant="success">
          Request
        </Button>{' '}
      </Modal.Footer>
    </Modal>
  );
}
