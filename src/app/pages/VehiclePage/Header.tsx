import React, { useState } from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { ModalForm } from './components/ModalForm';
import { Filter } from 'app/components/Filter';

export function Header() {
  return (
    <>
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
          {/* <Breadcrumb page={[ {'Home', '/'}, {'Request Box', '/BoxPage', 1} ]} /> */}
        </div>
        <div className="d-flex">
          <Filter />
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
          <ModalForm />
        </div>
      </div>
    </>
  );
}
