import React, { useState } from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { ModalForm } from './components/ModalForm';

export function Header() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="d-flex jc-between ai-center mb-4">
      <div>
        <Breadcrumb>
          <Breadcrumb.Item
            className="p-lg"
            linkAs={Link}
            linkProps={{ to: '/' }}
          >
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item
            className="p-lg"
            active
            linkAs={Link}
            linkProps={{ to: '/BoxPage' }}
          >
            Request Box
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="d-flex">
        <Button
          className="d-flex ai-center mr-2 bg-warning-5"
          variant="warning"
        >
          Template Upload<i className="fas fa-file ml-2"></i>
        </Button>{' '}
        <Button
          className="d-flex ai-center mr-2 bg-warning-5"
          variant="warning"
        >
          Import<i className="fas fa-upload ml-2"></i>
        </Button>{' '}
        <Button
          className="d-flex ai-center mr-2 bg-warning-5"
          variant="warning"
        >
          Export<i className="fas fa-download ml-2"></i>
        </Button>{' '}
        <Button
          className="d-flex ai-center bg-success-6"
          variant="success"
          onClick={() => setModalShow(true)}
        >
          Add Data<i className="far fa-plus ml-2"></i>
        </Button>{' '}
        <ModalForm show={modalShow} onHide={() => setModalShow(false)} />
      </div>
    </div>
  );
}
