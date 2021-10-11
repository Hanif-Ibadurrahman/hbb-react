import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Breadcrumb from 'app/components/BreadCrumb';

export function EditDevisi() {
  const [crumbs, setCrumbs] = useState(['Dashboard', 'DivisiPage', 'Edit']);
  const validationSchema = Yup.object().shape({
    DivisionName: Yup.string().required('*Division Name is required'),
  });

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        DivisionName: 'SDM',
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
        <>
          <Breadcrumb crumbs={crumbs} selected />
          <div className="pos-r p-8 w-80%">
            <Form onSubmit={handleSubmit}>
              {console.log(values)}
              <Form.Group className="mb-4" controlId="formBasicEmail">
                <Form.Label>Division Name</Form.Label>
                <Form.Control
                  type="text"
                  name="DivisionName"
                  value={values.DivisionName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.DivisionName && errors.DivisionName ? (
                  <p className="tc-danger-5 pos-a p-sm">
                    {errors.DivisionName}
                  </p>
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
          </div>
        </>
      )}
    </Formik>
  );
}
