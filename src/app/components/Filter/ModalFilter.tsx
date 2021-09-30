import React, { useState } from 'react';
import { Button, Col, Row, Container, Form, Modal } from 'react-bootstrap';

export function ModalFilter(props) {
  const FilterItems = props => {
    const [lists, setList] = useState([] as any);
    const [newList, setNewList] = useState('');

    const add = item => setList([...lists, item as any]);

    const remove = index => {
      setList([...lists.slice(0, index), ...lists.slice(index + 1)]);
    };

    const handleAddClick = () => {
      if (newList === '') {
        return;
      }
      add({ name: newList });
      setNewList('');
    };

    return (
      <>
        <div className="mb-6">
          <Form.Group className="pos-r zi-2" id={props.id}>
            <Form.Label>{props.label}</Form.Label>
            <div className="d-flex ai-center">
              {props.inputType === 'select' ? (
                <div className="select-wrapper" style={{ flex: 1 }}>
                  <Form.Control
                    as="select"
                    aria-label="unit"
                    onChange={event => setNewList(event.target.value)}
                    style={{ height: 42 }}
                  >
                    <option disabled value="">
                      Pilih Opsi
                    </option>
                    {props.inputOption.map((title, index) => {
                      return <option value={title}>{title}</option>;
                    })}
                  </Form.Control>
                </div>
              ) : (
                <Form.Control
                  type={props.inputType}
                  value={newList}
                  onChange={event => setNewList(event.target.value)}
                  style={{ flex: 1, height: 42 }}
                />
              )}
              {/* <InputElement /> */}
              <Button
                className="d-flex ai-center bg-success-6 p-sm ml-2"
                variant="success"
                onClick={handleAddClick}
                style={{ height: 42 }}
              >
                Add Tag <i className="far fa-plus ml-2"></i>
              </Button>{' '}
            </div>
          </Form.Group>
          <div className="d-flex fw-w mt-2">
            {lists.map((title, index) => {
              return (
                <FilterItem title={title} onRemove={() => remove(index)} />
              );
            })}
          </div>
        </div>
      </>
    );
  };

  function FilterItem({ title, onRemove }) {
    return (
      <span
        id={title.name}
        className="filter-result-item d-flex ai-center p-2 bd-rs-1 bg-success-5 tc-success-contrast mb-2 mr-2"
      >
        <span className="text mr-2">{title.name}</span>
        <span
          className="icon h-6 w-6 bd-rs-6 d-flex ai-center jc-center bg-success-6 cur-p"
          onClick={onRemove}
        >
          <i className="far fa-times" style={{ marginTop: -1 }}></i>
        </span>
      </span>
    );
  }

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      className="right"
    >
      <Modal.Header closeButton className="pv-4 ph-6">
        <Modal.Title id="contained-modal-title-vcenter">Filter</Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid pt-8 ph-6 pb-6">
        <Container className="ph-0">
          <Row>
            <Col xs={12}>
              {/* - - - - - - - - - - - - - */}
              <FilterItems
                label="Nomor Box"
                inputType="number"
                id="nomor-box"
              />
              <FilterItems
                label="Tanngal Dokumen"
                inputType="date"
                id="tanggal-dokumen"
              />
              <FilterItems label="Uraian" inputType="text" id="uraian" />
              <FilterItems label="Tahun" inputType="number" id="tahun" />
              <FilterItems label="Nama User" inputType="text" id="nama-user" />
              <FilterItems
                label="Unit Pengolah"
                inputType="select"
                inputOption={[
                  'Divisi Layanan Umum dan Logistik',
                  'Divisi LUPP',
                  'Divisi Pembendaharaan',
                ]}
                id="unit-pengolah"
              />
              <FilterItems
                label="Record Center"
                inputType="select"
                inputOption={['RC Bandung', 'RC Medan', 'RC Cirebon']}
                id="record-center"
              />
              {/* - - - - - - - - - - - - - */}
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button className="bg-success-6" variant="success">
          Filter
        </Button>{' '}
        <Button variant="danger">Reset</Button>
      </Modal.Footer>
    </Modal>
  );
}
