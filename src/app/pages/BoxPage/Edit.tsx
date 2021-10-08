import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Breadcrumb from 'app/components/BreadCrumb';

export function EditBox() {
  const [crumbs, setCrumbs] = useState(['Dashboard', 'BoxPage', 'EditBox']);

  const validationSchema = Yup.object().shape({
    date: Yup.date().required('*Date is required'),
    time: Yup.string().required('*Time is required'),
    quantity: Yup.string().required('*Quantity required'),
    notes: Yup.string().required('*Notes required'),
  });

  return (
    <>
      <Breadcrumb crumbs={crumbs} selected />
      <div className="pos-r p-8 w-80%">
        <Formik
          validationSchema={validationSchema}
          initialValues={{
            codeBox: 'A091321',
            date: '2021-09-09',
            time: '16:27',
            quantity: '10',
            notes:
              'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
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
            <Form onSubmit={handleSubmit}>
              {console.log(values)}
              <Form.Group className="mb-4" controlId="formBasicEmail">
                <Form.Label>Code</Form.Label>
                <Form.Control
                  type="text"
                  name="codeBox"
                  value={values.codeBox}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled
                />
                {touched.codeBox && errors.codeBox ? (
                  <p className="tc-danger-5 pos-a p-sm">{errors.codeBox}</p>
                ) : null}
              </Form.Group>
              <Form.Group className="mb-4" controlId="formBasicEmail">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
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
                  value={values.quantity}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.quantity && errors.quantity ? (
                  <p className="tc-danger-5 pos-a p-sm">{errors.quantity}</p>
                ) : null}
              </Form.Group>
              <Form.Group className="mb-4" controlId="formBasicEmail">
                <Form.Label>Notes</Form.Label>
                <Form.Control
                  as="textarea"
                  className="notesdisable"
                  name="notes"
                  value={values.notes}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.notes && errors.notes ? (
                  <p className="tc-danger-5 pos-a p-sm">{errors.notes}</p>
                ) : null}
              </Form.Group>
              <Button
                className="mt-4 bg-success-6"
                variant="success"
                disabled={isSubmitting}
              >
                Edit Data
              </Button>{' '}
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
