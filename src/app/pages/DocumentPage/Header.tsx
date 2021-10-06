import React, { useState } from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { DocumentForm } from './components/Documentform';
import { Filter } from 'app/components/Filter';

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
            linkProps={{ to: '/DocumentPage' }}
          >
            Request Document
          </Breadcrumb.Item>
        </Breadcrumb>
        {/* <Breadcrumb page={[ {'Home', '/'}, {'Request Document', '/DocumentPage', 1} ]} /> */}
      </div>
      <Button
        className="d-flex ai-center bg-success-6"
        variant="success"
        onClick={() => setModalShow(true)}
      >
        Add Data<i className="far fa-plus ml-2"></i>
      </Button>{' '}
      <DocumentForm show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
}
