import {
  Form,
  Modal,
  Container,
  Row,
  Col,
  Button,
  InputGroup,
} from 'react-bootstrap';
import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Alert from 'app/components/Alerts';

export function ModalForm(props) {
  // const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const validationSchema = Yup.object().shape({
    NoPolisi: Yup.string().required('*Nomor Polisi is required'),
    JenisKendaraan: Yup.string().required('*Jenis is required'),
    MerkKendaraan: Yup.string().required('*Merk Kendaraan required'),
    WarnaKendaraan: Yup.string().required('*Warna Kendaraan required'),
    MaksMuatan: Yup.string().required('*Maksimal required'),
  });

  // const _showAlert = () => {
  //   setShowAlert(showAlert => showAlert = true);
  //   console.log(showAlert)
  // }

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
      {/* <Button variant="primary" onClick={() => setShow(true)}>
        Custom Width Modal
      </Button> */}
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
        onHide={() => setShowAlert(false)}
      />
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          NoPolisi: '',
          JenisKendaraan: '',
          MerkKendaraan: '',
          WarnaKendaraan: '',
          MaksMuatan: '',
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
          <Modal
            show={modalShow}
            onHide={() => setModalShow(false)}
            aria-labelledby="contained-modal-title-vcenter"
          >
            <Modal.Header closeButton className="bg-primary-5">
              <Modal.Title id="contained-modal-title-vcenter">
                Tambah Data Kendaraan
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
              <Container>
                <Row>
                  <Col xs={12}>
                    <Form onSubmit={handleSubmit}>
                      {console.log(values)}
                      <Form.Group className="mb-4" controlId="data1">
                        <Form.Label>Nomor Polisi</Form.Label>
                        <Form.Control
                          type="text"
                          name="NoPolisi"
                          placeholder="Nomor Polisi"
                          value={values.NoPolisi}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {touched.NoPolisi && errors.NoPolisi ? (
                          <p className="tc-danger-5 pos-a p-sm">
                            {errors.NoPolisi}
                          </p>
                        ) : null}
                      </Form.Group>
                      <Form.Group className="mb-4" controlId="data2">
                        <Form.Label>Jenis Kendaraan</Form.Label>
                        <Form.Control
                          type="text"
                          name="JenisKendaraan"
                          placeholder="Jenis Kendaraan"
                          value={values.JenisKendaraan}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {touched.JenisKendaraan && errors.JenisKendaraan ? (
                          <p className="tc-danger-5 pos-a p-sm">
                            {errors.JenisKendaraan}
                          </p>
                        ) : null}
                      </Form.Group>
                      <Form.Group className="mb-4" controlId="data3">
                        <Form.Label>Merk Kendaraan</Form.Label>
                        <Form.Control
                          type="text"
                          name="MerkKendaraan"
                          placeholder="Merk Kendaraan"
                          value={values.MerkKendaraan}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {touched.MerkKendaraan && errors.MerkKendaraan ? (
                          <p className="tc-danger-5 pos-a p-sm">
                            {errors.MerkKendaraan}
                          </p>
                        ) : null}
                      </Form.Group>
                      <Form.Group className="mb-4" controlId="formBasicEmail">
                        <Form.Label>Warna Kendaraan</Form.Label>
                        <Form.Control
                          type="text"
                          name="WarnaKendaraan"
                          placeholder="Warna Kendaraan"
                          value={values.WarnaKendaraan}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {touched.WarnaKendaraan && errors.WarnaKendaraan ? (
                          <p className="tc-danger-5 pos-a p-sm">
                            {errors.WarnaKendaraan}
                          </p>
                        ) : null}
                      </Form.Group>
                      <Form.Group className="mb-4" controlId="formBasicEmail">
                        <Form.Label>Maksimal Muatan</Form.Label>
                        <InputGroup className="mb-2">
                          <Form.Control
                            type="number"
                            name="MaksMuatan"
                            placeholder="Maksimal Muatan"
                            value={values.MaksMuatan}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <InputGroup.Text>KG</InputGroup.Text>
                        </InputGroup>

                        {touched.MaksMuatan && errors.MaksMuatan ? (
                          <p className="tc-danger-5 pos-a p-sm">
                            {errors.MaksMuatan}
                          </p>
                        ) : null}
                      </Form.Group>
                    </Form>
                  </Col>
                </Row>
              </Container>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={_onHide}>
                Close
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-success-6"
                variant="success"
                onClick={_onSubmit}
              >
                Request
              </Button>{' '}
            </Modal.Footer>
          </Modal>
        )}
      </Formik>
    </>
  );
}

//   render(<Example />);
