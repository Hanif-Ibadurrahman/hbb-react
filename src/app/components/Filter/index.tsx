import Button from 'react-bootstrap/Button';
import { ModalFilter } from './ModalFilter';
import React, { useState } from 'react';

export function Filter() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button
        className="d-flex ai-center mr-2"
        variant="secondary"
        onClick={() => setModalShow(true)}
      >
        Filter<i className="fas fa-sort-alt ml-2"></i>
      </Button>{' '}
      <ModalFilter show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}
