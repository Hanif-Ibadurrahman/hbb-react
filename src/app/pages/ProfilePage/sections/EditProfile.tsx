import React, { useState } from 'react';
import { Profile, ProfileHero } from '../../../components/Image';
import { Form, Button } from 'react-bootstrap';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const profileSize = 130;

const validationSchema = Yup.object().shape({
  Username: Yup.string().required('*Username is required'),
  Name: Yup.string().required('*Name is required'),
  KodePelaksana: Yup.string().required('*Kode Pelaksana is required'),
  Divisi: Yup.string().required('*Divisi required'),
  RecordCenter: Yup.string().required('*Record Center required'),
  Role: Yup.string().required('*Role required'),
  Company: Yup.string().required('*Company Center required'),
});

export default function UserProfile() {
  return (
    <>
      <ProfileHero className="d-flex ai-end ph-8">
        <Profile
          style={{
            height: profileSize,
            width: profileSize,
            borderRadius: profileSize / 2,
            marginBottom: profileSize / -2,
            boxShadow: '0 8px 16px rgba(0, 0, 0, .05)',
          }}
          className="d-flex ai-center jc-center bd-rs-20 of-h"
        />
      </ProfileHero>
      <div className="pl-8" style={{ marginTop: profileSize / 2 }}>
        <h6 className="ff-1-bd pt-10 pb-12 tc-medium">Edit Profile</h6>
        <div className="pos-r w-80%">
          <Formik
            validationSchema={validationSchema}
            initialValues={{
              Username: 'muarif.gustiar',
              Name: 'Muarif Gustiar',
              KodePelaksana: 'MG',
              Divisi: 'Divisi Hukum',
              RecordCenter: 'RC Bogor',
              Role: 'Admin RC',
              Company: 'PGNMAS',
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
              <Form onSubmit={handleSubmit} className="mb-10">
                {console.log(values)}
                <Form.Group className="mb-4" controlId="formBasicEmail">
                  <Form.Label className="tc-medium">Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="Username"
                    value={values.Username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.Username && errors.Username ? (
                    <p className="tc-danger-5 pos-a p-sm">{errors.Username}</p>
                  ) : null}
                </Form.Group>
                <div className="row">
                  <div className="col-6">
                    <Form.Group className="mb-4" controlId="formBasicEmail">
                      <Form.Label className="tc-medium">Nama</Form.Label>
                      <Form.Control
                        type="text"
                        name="Name"
                        value={values.Name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.Name && errors.Name ? (
                        <p className="tc-danger-5 pos-a p-sm">{errors.Name}</p>
                      ) : null}
                    </Form.Group>
                  </div>
                  <div className="col-6">
                    <Form.Group className="mb-4" controlId="formBasicEmail">
                      <Form.Label className="tc-medium">
                        Kode Pelaksana
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="KodePelaksana"
                        value={values.KodePelaksana}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.KodePelaksana && errors.KodePelaksana ? (
                        <p className="tc-danger-5 pos-a p-sm">
                          {errors.KodePelaksana}
                        </p>
                      ) : null}
                    </Form.Group>
                  </div>
                </div>
                <Form.Group className="mb-4" controlId="formBasicEmail">
                  <Form.Label className="tc-medium">Divisi</Form.Label>
                  <Form.Select
                    className="cur-p"
                    name="Divisi"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="1">{values.Divisi}</option>
                    <option value="2">Divisi Layanan Umum dan Logistik</option>
                    <option value="3">Divisi Perbendaharaan</option>
                    <option value="4">Divisi Akuntasi</option>
                  </Form.Select>
                  {touched.Divisi && errors.Divisi ? (
                    <p className="tc-danger-5 pos-a p-sm">{errors.Divisi}</p>
                  ) : null}
                </Form.Group>
                <Form.Group className="mb-4" controlId="formBasicEmail">
                  <Form.Label className="tc-medium">Record Center</Form.Label>
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
                  <Form.Label className="tc-medium">Role</Form.Label>
                  <Form.Control
                    type="text"
                    name="Role"
                    value={values.Role}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled
                  />
                  {touched.Role && errors.Role ? (
                    <p className="tc-danger-5 pos-a p-sm">{errors.Role}</p>
                  ) : null}
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label className="tc-medium">Company</Form.Label>
                  <Form.Control
                    type="text"
                    name="Company"
                    value={values.Company}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.Company && errors.Company ? (
                    <p className="tc-danger-5 pos-a p-sm">{errors.Company}</p>
                  ) : null}
                </Form.Group>
                <div className="d-flex jc-end">
                  <Button
                    className="mv-4 bg-success-6"
                    variant="success"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    Edit Data
                  </Button>{' '}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}
