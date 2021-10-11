import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Breadcrumb from 'app/components/BreadCrumb';

export function EditLemari() {
  const [crumbs, setCrumbs] = useState(['Dashboard', 'LemariPage', 'Edit']);

  const validationSchema = Yup.object().shape({
    RecordCenter: Yup.string().required('*Time is required'),
    NamaRuang: Yup.string().required('*Quantity required'),
    KodeLemari: Yup.string().required('*Notes required'),
  });

  return (
    <>
      <Breadcrumb crumbs={crumbs} selected />
      <div className="pos-r p-8 w-80%">
        <Formik
          validationSchema={validationSchema}
          initialValues={{
            RecordCenter: 'RC Bogor',
            NamaRuang: 'PMO 1',
            KodeLemari: 'AS223W',
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
                <Form.Label>Record Center</Form.Label>
                <Form.Select
                  className="cur-p"
                  name="RecordCenter"
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="1">{values.RecordCenter}</option>
                  <option value="2">RC Medan</option>
                  <option value="3">RC Cirebon</option>
                  <option value="4">RC Surabaya</option>
                </Form.Select>
                {touched.RecordCenter && errors.RecordCenter ? (
                  <p className="tc-danger-5 pos-a p-sm">
                    {errors.RecordCenter}
                  </p>
                ) : null}
              </Form.Group>
              <Form.Group className="mb-4" controlId="formBasicEmail">
                <Form.Label>Nama Ruang</Form.Label>
                <Form.Select
                  className="cur-p"
                  name="NamaRuang"
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="1">{values.NamaRuang}</option>
                  <option value="2">PMO 2</option>
                  <option value="3">Pusat 1</option>
                  <option value="4">Pusat 2</option>
                </Form.Select>
                {touched.NamaRuang && errors.NamaRuang ? (
                  <p className="tc-danger-5 pos-a p-sm">{errors.NamaRuang}</p>
                ) : null}
              </Form.Group>
              <Form.Group className="mb-4" controlId="formBasicEmail">
                <Form.Label>Kode Lemari</Form.Label>
                <Form.Control
                  type="text"
                  name="KodeLemari"
                  value={values.KodeLemari}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.KodeLemari && errors.KodeLemari ? (
                  <p className="tc-danger-5 pos-a p-sm">{errors.KodeLemari}</p>
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
