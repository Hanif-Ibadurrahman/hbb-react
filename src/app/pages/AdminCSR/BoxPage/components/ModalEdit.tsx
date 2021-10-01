import { Form, Modal, Container, Row, Col, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';

const schema = yup.object().shape({
  codeBox: yup.string().required(),
  date: yup.string().required(),
  time: yup.string().required(),
  quantity: yup.string().required(),
  notes: yup.string().required(),
  status: yup.string().required(),
  terms: yup.bool().required().oneOf([true], 'Terms must be accepted'),
});

export function ModalEdit(props) {
  return (
    <Formik
      validationSchema={schema}
      onSubmit={console.log}
      initialValues={{
        codeBox: 'A12O2O3',
        date: '2021-05-14',
        time: '16:27',
        quantity: '10',
        notes:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        status: 'Approve',
        terms: false,
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton className="bg-primary-5">
              <Modal.Title id="contained-modal-title-vcenter">
                Edit Data
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
              <Container>
                <Row>
                  <Col xs={12}>
                    <Form>
                      <Form.Group
                        className="mb-3"
                        controlId="validationFormik101"
                      >
                        <Form.Label>Code</Form.Label>
                        <Form.Control
                          type="text"
                          name="CodeBox"
                          value={values.codeBox}
                          onChange={handleChange}
                          isValid={touched.codeBox && !errors.codeBox}
                        />
                        <Form.Control.Feedback tooltip>
                          Looks good!
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="Date">
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                          type="date"
                          name="CodeBox"
                          value={values.date}
                          onChange={handleChange}
                          isValid={touched.date && !errors.date}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="Time">
                        <Form.Label>Time</Form.Label>
                        <Form.Control
                          type="time"
                          name="time"
                          value={values.time}
                          onChange={handleChange}
                          isValid={touched.time && !errors.time}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="Quantity">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control type="text" defaultValue="" />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="Notes">
                        <Form.Label>Notes</Form.Label>
                        <Form.Control
                          as="textarea"
                          className="notesdisable"
                          defaultValue=""
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
        </Form>
      )}
    </Formik>
  );
}
