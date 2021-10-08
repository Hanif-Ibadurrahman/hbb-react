import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Breadcrumb from 'app/components/BreadCrumb';

export function DetailBox() {
  const [crumbs, setCrumbs] = useState(['Dashboard', 'BoxPage', 'DetailBox']);

  return (
    <>
      <Breadcrumb crumbs={crumbs} selected />
      <div className="pos-r p-8 row">
        <div className="col-6 pr-8">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Code</Form.Label>
            <Form.Control type="text" disabled defaultValue="A12O2O3" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" disabled defaultValue="04/09/21" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Time</Form.Label>
            <Form.Control type="time" disabled defaultValue="16:27" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Quantity</Form.Label>
            <Form.Control type="text" disabled defaultValue="10" />
          </Form.Group>
        </div>
        <div className="col-6 pr-8">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              className="notesdisable"
              disabled
              defaultValue="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Status</Form.Label>
            <Form.Control
              className="bg-success-6 w-100%"
              defaultValue="Approve"
              disabled
            ></Form.Control>
          </Form.Group>
        </div>
      </div>
    </>
  );
}
