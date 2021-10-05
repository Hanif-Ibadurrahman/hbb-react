import { Form, Modal, Container, Row, Col, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export function ModalForm(props) {
  const validationSchema = Yup.object().shape({
    date: Yup.date().required('*Date is required'),
    time: Yup.string().required('*Time is required'),
    quantity: Yup.string().required('*Quantity required'),
    notes: Yup.string().required('*Notes required'),
  });

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        codeBox: 'A091321',
        date: '',
        time: '',
        quantity: '',
        notes: '',
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        // When button submits form and form is in the process of submitting, submit button is disabled
        setSubmitting(true);

        // Simulate submitting to database, shows us values submitted, resets form
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          resetForm();
          setSubmitting(false);
        }, 500);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
          <Modal.Header closeButton className="bg-primary-5">
            <Modal.Title id="contained-modal-title-vcenter">
              Code Box : {values.codeBox}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="show-grid">
            <Container>
              <Row>
                <Col xs={12}>
                  <Form onSubmit={handleSubmit}>
                    {console.log(values)}
                    <Form.Group className="mb-4" controlId="formBasicEmail">
                      <Form.Label>Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="date"
                        placeholder="Date"
                        value={values.date}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.date && errors.date ? (
                        <p className="tc-danger-5 pos-a p-sm">{errors.date}</p>
                      ) : null}
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="formBasicEmail">
                      <Form.Label>Time</Form.Label>
                      <Form.Control
                        type="time"
                        name="time"
                        placeholder="time"
                        value={values.time}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.time && errors.time ? (
                        <p className="tc-danger-5 pos-a p-sm">{errors.time}</p>
                      ) : null}
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="formBasicEmail">
                      <Form.Label>Quantity</Form.Label>
                      <Form.Control
                        type="number"
                        name="quantity"
                        placeholder="Quantity"
                        value={values.quantity}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.quantity && errors.quantity ? (
                        <p className="tc-danger-5 pos-a p-sm">
                          {errors.quantity}
                        </p>
                      ) : null}
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="formBasicEmail">
                      <Form.Label>Notes</Form.Label>
                      <Form.Control
                        as="textarea"
                        name="notes"
                        placeholder="Notes"
                        value={values.notes}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.notes && errors.notes ? (
                        <p className="tc-danger-5 pos-a p-sm">{errors.notes}</p>
                      ) : null}
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
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-success-6"
              variant="success"
            >
              Request
            </Button>{' '}
          </Modal.Footer>
        </Modal>
      )}
    </Formik>
  );
}
