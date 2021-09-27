import { Form, Row, Col, Button } from 'react-bootstrap';

export function form() {
    return (
        <div className="pos-r p-8 d-flex fd-col-r">
            <Form>

                <p className="p-xl mb-1 ff-1-bd">Default Form</p>
                <div className="p-4 bd-tl-rs-2 bd-tr-rs-2 bg-light" style={{ border: '1px solid rgba(0,0,0,.1)' }}>
                    <div className="max-w-50% pos-r ml-a mr-a">
                        <Form.Group as={Row} controlId="formHorizontalEmail">
                            <Form.Label column sm={2}>
                                Email
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="email" placeholder="Email" />
                            </Col>
                        </Form.Group>
                    </div>
                </div>
                <code className="code ff-menlo bg-dark bd-bl-rs-2 bd-br-rs-2 p-2 p-sm  mb-2">
                    <span className="tc-danger">
                        &lt;div&gt;
                    </span>
                    <span className="tc-danger">
                        &lt;div&gt;
                    </span>
                </code>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
                        Password
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="password" placeholder="Password" />
                    </Col>
                </Form.Group>

                <fieldset>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label as="legend" column sm={2}>
                            Radios
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Check
                                type="radio"
                                label="first radio"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios1"
                            />
                            <Form.Check
                                type="radio"
                                label="second radio"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios2"
                            />
                            <Form.Check
                                type="radio"
                                label="third radio"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios3"
                            />
                        </Col>
                    </Form.Group>
                </fieldset>

                <fieldset>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label as="legend" column sm={2}>
                            Checkbox
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Check
                                type="checkbox"
                                label="first checkbox"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios1"
                            />
                            <Form.Check
                                type="checkbox"
                                label="second checkbox"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios2"
                            />
                            <Form.Check
                                type="checkbox"
                                label="third checkbox"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios3"
                            />
                        </Col>
                    </Form.Group>
                </fieldset>

                <Form.Group as={Col} controlId="formGridState" className="mb-3">
                    <Form.Label>Option Value</Form.Label>
                    <Form.Select defaultValue="Option 1">
                        <option>Option 1</option>
                        <option>Option 2</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Single File Input</Form.Label>
                    <Form.Control type="file" />
                </Form.Group>

                <Form.Group controlId="formFileMultiple" className="mb-3">
                    <Form.Label>Multiple files input</Form.Label>
                    <Form.Control type="file" multiple />
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Col sm>
                        <Button type="submit">Sign in</Button>
                    </Col>
                </Form.Group>
            </Form>
        </div>
    )
}