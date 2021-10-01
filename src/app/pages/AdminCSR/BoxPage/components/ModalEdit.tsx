import { Form, Modal, Container, Row, Col, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';

export function ModalEdit(props) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton className="bg-primary-5">
        <Modal.Title id="contained-modal-title-vcenter">Edit Data</Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Row>
            <Col xs={12}>
              <Form>
                <Form.Group className="mb-3" controlId="validationFormik101">
                  <Form.Label>Code</Form.Label>
                  <Form.Control type="text" name="CodeBox" value="A1234212" />
                  <Form.Control.Feedback tooltip>
                    Looks good!
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="Date">
                  <Form.Label>Date</Form.Label>
                  <Form.Control type="date" name="CodeBox" value="2021-05-14" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="Time">
                  <Form.Label>Time</Form.Label>
                  <Form.Control type="time" name="time" value="20:11" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="Quantity">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control type="text" name="quantity" value="10" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="Notes">
                  <Form.Label>Notes</Form.Label>
                  <Form.Control
                    as="textarea"
                    className="notesdisable"
                    value="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="Notes">
                  <Form.Label>Status</Form.Label>
                  <Form.Select aria-label="unit">
                    <option value="1">Approve</option>
                    <option value="2">Pending</option>
                    <option value="3">Cancel</option>
                  </Form.Select>
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
        <Button className="bg-success-6" type="submit" variant="success">
          Edit
        </Button>{' '}
      </Modal.Footer>
    </Modal>
  );
}
