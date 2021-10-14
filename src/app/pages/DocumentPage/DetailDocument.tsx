import { Breadcrumb, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function DetailDocument() {
  return (
    <div className="pos-r p-8">
      <div className=" mt-14">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Code</Form.Label>
          <Form.Control type="text" disabled defaultValue="A12O2O3" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>No</Form.Label>
          <Form.Control type="number" disabled defaultValue="1" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Serial No</Form.Label>
          <Form.Control type="number" disabled defaultValue="1" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" disabled defaultValue="2021-09-09" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Time</Form.Label>
          <Form.Control type="time" disabled defaultValue="16:27" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nominal</Form.Label>
          <Form.Control type="number" disabled defaultValue="2" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Quantity</Form.Label>
          <Form.Control type="text" disabled defaultValue="10" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>No Box</Form.Label>
          <Form.Control type="number" disabled defaultValue="13" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>No Folder</Form.Label>
          <Form.Control type="number" disabled defaultValue="14" />
        </Form.Group>
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
          <Form.Label>List</Form.Label>
          <Form.Control
            type="text"
            className="listdisable"
            disabled
            defaultValue="Lorem ipsum dolor sit amet"
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
  );
}
