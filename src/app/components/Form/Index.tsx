/**
 * @constructor
 * @this handleChange
 */
import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

export function form() {
  function handleChange(event) {
    var textChange = event.target.value,
      eventId = event.target.id;

    console.log(eventId + ' : ' + textChange);
  }

  return (
    <div className="pos-r p-8 d-flex fd-col-r">
      <Form>
        <p className="p-xl mb-1 ff-1-bd">Default Form</p>
        <div className="mb-4">
          <div
            className="p-4 bd-tl-rs-2 bd-tr-rs-2 bg-light"
            style={{ border: '1px solid rgba(0,0,0,.1)' }}
          >
            <div className="max-w-70% pos-r ml-a mr-a">
              <Form.Group as={Row} controlId="formHorizontalEmail">
                <Form.Label column sm={2}>
                  Email
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group>
            </div>
          </div>
          <div className="code ff-menlo bg-dark bd-bl-rs-2 bd-br-rs-2 p-2 p-sm  mb-2">
            <span className="tc-danger-5">
              <span className="tc-success-2">&lt;Form.Group</span> as=
              <span className="tc-warning-2">&#123;Row&#125;</span> controlId=
              <span className="tc-warning-2">
                "formHorizontalEmail"
              </span>&gt; <br></br>
              <span className="ml-5">
                <span className="tc-success-2">&lt;Form.Label</span> column sm=
                <span className="tc-warning-2">&#123;2&#125;</span>&gt;{' '}
              </span>
              <br></br>
              <span className="ml-10 tc-dark-contrast">Email</span>
              <br></br>
              <span className="ml-5 tc-success-2">&lt;/Form.Label&gt;</span>
              <br></br>
              <span className="ml-5">
                <span className="tc-success-2">&lt;col</span> sm=
                <span className="tc-warning-2">&#123;10&#125;</span>&gt;
              </span>
              <br></br>
              <span className="ml-10">
                <span className="tc-success-2">&lt;Form.Control</span> type=
                <span className="tc-warning-2">"email"</span> placeholder=
                <span className="tc-warning-2">"Email" </span> /&gt;
              </span>
              <br></br>
              <span className="ml-5">
                <span className="tc-success-2">&lt;col</span> sm=
                <span className="tc-warning-2">&#123;10&#125;</span>&gt;
              </span>
              <br></br>
              <span className="tc-success-2">&lt;Form.Group&gt;</span>
            </span>
          </div>
        </div>

        <div className="mb-4">
          <div
            className="p-4 bd-tl-rs-2 bd-tr-rs-2 bg-light"
            style={{ border: '1px solid rgba(0,0,0,.1)' }}
          >
            <div className="max-w-70% pos-r ml-a mr-a">
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalPassword"
              >
                <Form.Label column sm={2}>
                  Password
                </Form.Label>
                <Col sm={10}>
                  <Form.Control type="password" placeholder="Password" />
                </Col>
              </Form.Group>
            </div>
          </div>
          <div className="code ff-menlo bg-dark bd-bl-rs-2 bd-br-rs-2 p-2 p-sm  mb-2">
            <span className="tc-danger-5">
              <span className="tc-success-2">&lt;Form.Group</span> as=
              <span className="tc-warning-2">&#123;Row&#125;</span> controlId=
              <span className="tc-warning-2">
                "formHorizontalPassword"
              </span>&gt; <br></br>
              <span className="ml-5">
                <span className="tc-success-2">&lt;Form.Label</span> column sm=
                <span className="tc-warning-2">&#123;2&#125;</span>&gt;{' '}
              </span>
              <br></br>
              <span className="ml-10 tc-dark-contrast">Password</span>
              <br></br>
              <span className="ml-5 tc-success-2">&lt;/Form.Label&gt;</span>
              <br></br>
              <span className="ml-5">
                <span className="tc-success-2">&lt;col</span> sm=
                <span className="tc-warning-2">&#123;10&#125;</span>&gt;
              </span>
              <br></br>
              <span className="ml-10">
                <span className="tc-success-2">&lt;Form.Control</span> type=
                <span className="tc-warning-2">"email"</span> placeholder=
                <span className="tc-warning-2">"Email"</span> /&gt;
              </span>
              <br></br>
              <span className="ml-5 tc-success-2">&lt;/col&gt;</span>
              <br></br>
              <span className="tc-success-2">&lt;Form.Group&gt;</span>
            </span>
          </div>
        </div>

        <div className="mb-4">
          <div
            className="p-4 bd-tl-rs-2 bd-tr-rs-2 bg-light"
            style={{ border: '1px solid rgba(0,0,0,.1)' }}
          >
            <div className="max-w-70% pos-r ml-a mr-a">
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
            </div>
          </div>
          <div className="code ff-menlo bg-dark bd-bl-rs-2 bd-br-rs-2 p-2 p-sm  mb-2">
            <span className="tc-danger-5">
              <span className="tc-success-2">&lt;fieldset&gt; </span>
              <br></br>
              <span className="ml-5">
                <span className="tc-success-2">&lt;Form.Group</span> as=
                <span className="tc-warning-2">&#123;Row&#125;</span> className=
                <span className="tc-warning-2">"mb-3"</span>&gt;
              </span>
              <br></br>
              <span className="ml-10">
                <span className="tc-success-2">&lt;Form.Label</span> as=
                <span className="tc-warning-2">"legend"</span> column sm=
                <span className="tc-warning-2">&#123;2&#125;</span>&gt;
              </span>
              <br></br>
              <span className="ml-14 tc-dark-contrast">Radios</span>
              <br></br>
              <span className="ml-10 tc-success-2">&lt;/Form.Label&gt;</span>
              <br></br>
              <span className="ml-10">
                <span className="tc-success-2">&lt;col</span> sm=
                <span className="tc-warning-2">&#123;10&#125;</span>&gt;
              </span>
              <br></br>
              <span className="ml-14 tc-success-2">&lt;Form.Check</span>
              <br></br>
              <span className="ml-20">
                type=<span className="tc-warning-2">"radio"</span>
              </span>
              <br></br>
              <span className="ml-20">
                label=<span className="tc-warning-2">"first radio"</span>
              </span>
              <br></br>
              <span className="ml-20">
                name=
                <span className="tc-warning-2">"formHorizontalRadios"</span>
              </span>
              <br></br>
              <span className="ml-20">
                id=<span className="tc-warning-2">"formHorizontalRadios1"</span>
              </span>
              <br></br>
              <span className="ml-14 tc-success-2">/&gt;</span>
              <br></br>
              <span className="ml-14 tc-success-2">&lt;Form.Check</span>
              <br></br>
              <span className="ml-20">
                type=<span className="tc-warning-2">"radio"</span>
              </span>
              <br></br>
              <span className="ml-20">
                label=<span className="tc-warning-2">"second radio"</span>
              </span>
              <br></br>
              <span className="ml-20">
                name=
                <span className="tc-warning-2">"formHorizontalRadios"</span>
              </span>
              <br></br>
              <span className="ml-20">
                id=<span className="tc-warning-2">"formHorizontalRadios2"</span>
              </span>
              <br></br>
              <span className="ml-14 tc-success-2">/&gt;</span>
              <br></br>
              <span className="ml-14 tc-success-2">&lt;Form.Check</span>
              <br></br>
              <span className="ml-20">
                type=<span className="tc-warning-2">"radio"</span>
              </span>
              <br></br>
              <span className="ml-20">
                label=<span className="tc-warning-2">"third radio"</span>
              </span>
              <br></br>
              <span className="ml-20">
                name=
                <span className="tc-warning-2">"formHorizontalRadios"</span>
              </span>
              <br></br>
              <span className="ml-20">
                id=<span className="tc-warning-2">"formHorizontalRadios3"</span>
              </span>
              <br></br>
              <span className="ml-14 tc-success-2">/&gt;</span>
              <br></br>
              <span className="ml-10 tc-success-2">&lt;/col&gt;</span>
              <br></br>
              <span className="tc-success-2 ml-5">&lt;Form.Group&gt;</span>
              <br></br>
              <span className="tc-success-2">&lt;fieldset&gt;</span>
            </span>
          </div>
        </div>

        <div className="mb-4">
          <div
            className="p-4 bd-tl-rs-2 bd-tr-rs-2 bg-light"
            style={{ border: '1px solid rgba(0,0,0,.1)' }}
          >
            <div className="max-w-70% pos-r ml-a mr-a">
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
            </div>
          </div>
          <div className="code ff-menlo bg-dark bd-bl-rs-2 bd-br-rs-2 p-2 p-sm  mb-2">
            <span className="tc-danger-5">
              <span className="tc-success-2">&lt;fieldset&gt; </span>
              <br></br>
              <span className="ml-5">
                <span className="tc-success-2">&lt;Form.Group</span> as=
                <span className="tc-warning-2">&#123;Row&#125;</span> className=
                <span className="tc-warning-2">"mb-3"</span>&gt;
              </span>
              <br></br>
              <span className="ml-10">
                <span className="tc-success-2">&lt;Form.Label</span> as=
                <span className="tc-warning-2">"legend"</span> column sm=
                <span className="tc-warning-2">&#123;2&#125;</span>&gt;
              </span>
              <br></br>
              <span className="ml-14 tc-dark-contrast">Checkbox</span>
              <br></br>
              <span className="ml-10 tc-success-2">&lt;/Form.Label&gt;</span>
              <br></br>
              <span className="ml-10">
                <span className="tc-success-2">&lt;col</span> sm=
                <span className="tc-warning-2">&#123;10&#125;</span>&gt;
              </span>
              <br></br>
              <span className="ml-14 tc-success-2">&lt;Form.Check</span>
              <br></br>
              <span className="ml-20">
                type=<span className="tc-warning-2">"checkbox"</span>
              </span>
              <br></br>
              <span className="ml-20">
                label=<span className="tc-warning-2">"first checkbox"</span>
              </span>
              <br></br>
              <span className="ml-20">
                name=
                <span className="tc-warning-2">"formHorizontalcheckbox"</span>
              </span>
              <br></br>
              <span className="ml-20">
                id=
                <span className="tc-warning-2">"formHorizontalcheckbox1"</span>
              </span>
              <br></br>
              <span className="ml-14 tc-success-2">/&gt;</span>
              <br></br>
              <span className="ml-14 tc-success-2">&lt;Form.Check</span>
              <br></br>
              <span className="ml-20">
                type=<span className="tc-warning-2">"checkbox"</span>
              </span>
              <br></br>
              <span className="ml-20">
                label=<span className="tc-warning-2">"second checkbox"</span>
              </span>
              <br></br>
              <span className="ml-20">
                name=
                <span className="tc-warning-2">"formHorizontalcheckbox"</span>
              </span>
              <br></br>
              <span className="ml-20">
                id=
                <span className="tc-warning-2">"formHorizontalcheckbox2"</span>
              </span>
              <br></br>
              <span className="ml-14 tc-success-2">/&gt;</span>
              <br></br>
              <span className="ml-14 tc-success-2">&lt;Form.Check</span>
              <br></br>
              <span className="ml-20">
                type=<span className="tc-warning-2">"checkbox"</span>
              </span>
              <br></br>
              <span className="ml-20">
                label=<span className="tc-warning-2">"third checkbox"</span>
              </span>
              <br></br>
              <span className="ml-20">
                name=
                <span className="tc-warning-2">"formHorizontalcheckbox"</span>
              </span>
              <br></br>
              <span className="ml-20">
                id=
                <span className="tc-warning-2">"formHorizontalcheckbox3"</span>
              </span>
              <br></br>
              <span className="ml-14 tc-success-2">/&gt;</span>
              <br></br>
              <span className="ml-10 tc-success-2">&lt;/col&gt;</span>
              <br></br>
              <span className="tc-success-2 ml-5">&lt;Form.Group&gt;</span>
              <br></br>
              <span className="tc-success-2">&lt;/fieldset&gt; </span>
            </span>
          </div>
        </div>

        <div className="mb-4">
          <div
            className="p-4 bd-tl-rs-2 bd-tr-rs-2 bg-light"
            style={{ border: '1px solid rgba(0,0,0,.1)' }}
          >
            <div className="max-w-70% pos-r ml-a mr-a">
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label className="mb-2">Option Value</Form.Label>
                <Form.Select defaultValue="Option 1">
                  <option>Option 1</option>
                  <option>Option 2</option>
                </Form.Select>
              </Form.Group>
            </div>
          </div>
          <div className="code ff-menlo bg-dark bd-bl-rs-2 bd-br-rs-2 p-2 p-sm  mb-2">
            <span className="tc-danger-5">
              <span className="tc-success-2">&lt;Form.Group</span> as=
              <span className="tc-warning-2">&#123;Col&#125;</span> controlId=
              <span className="tc-warning-2">"formGridState"</span>&gt;{' '}
              <br></br>
              <span className="ml-5">
                <span className="tc-success-2">Form.Label</span> ClassName=
                <span className="tc-warning-2">"mb-2"</span>&gt;{' '}
              </span>
              <br></br>
              <span className="ml-10 tc-dark-contrast">Option Value</span>
              <br></br>
              <span className="ml-5 tc-success-2">&lt;/Form.Label&gt;</span>
              <br></br>
              <span className="ml-5">
                <span className="tc-success-2">&lt;Form.Select</span>{' '}
                defaultValue=<span className="tc-warning-2">"Option 1"</span>
                &gt;
              </span>
              <br></br>
              <span className="ml-10">
                <span className="tc-success-2">&lt;option&gt;</span>Option 1
                <span className="tc-success-2">&lt;/option&gt;</span>{' '}
              </span>
              <br></br>
              <span className="ml-10">
                <span className="tc-success-2">&lt;option&gt;</span>Option 2
                <span className="tc-success-2">&lt;/option&gt;</span>{' '}
              </span>
              <br></br>
              <span className="ml-5 tc-success-2">&lt;/Form.Select&gt;</span>
              <br></br>
              <span className="tc-success-2">&lt;Form.Group&gt;</span>
            </span>
          </div>
        </div>

        <div className="mb-4">
          <div
            className="p-4 bd-tl-rs-2 bd-tr-rs-2 bg-light"
            style={{ border: '1px solid rgba(0,0,0,.1)' }}
          >
            <div className="max-w-70% pos-r ml-a mr-a">
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Single File Input</Form.Label>
                <Form.Control type="file" />
              </Form.Group>
            </div>
          </div>
          <div className="code ff-menlo bg-dark bd-bl-rs-2 bd-br-rs-2 p-2 p-sm  mb-2">
            <span className="tc-danger-5">
              <span className="tc-success-2">&lt;Form.Group</span> controlId=
              <span className="tc-warning-2">"formFile"</span> ClassName=
              <span className="tc-warning-2">"mb-3"</span>&gt;<br></br>
              <span className="ml-5">
                <span className="tc-success-2">Form.Label</span>&gt;{' '}
              </span>
              <br></br>
              <span className="ml-10 tc-dark-contrast">Single File Input</span>
              <br></br>
              <span className="ml-5 tc-success-2">&lt;/Form.Label&gt;</span>
              <br></br>
              <span className="ml-5">
                <span className="tc-success-2">&lt;Form.Control</span> type=
                <span className="tc-warning-2">"file"</span> /&gt;
              </span>
              <br></br>
              <span className="tc-success-2">&lt;Form.Group&gt;</span>
            </span>
          </div>
        </div>

        <div className="mb-4">
          <div
            className="p-4 bd-tl-rs-2 bd-tr-rs-2 bg-light"
            style={{ border: '1px solid rgba(0,0,0,.1)' }}
          >
            <div className="max-w-70% pos-r ml-a mr-a">
              <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Label>Multiple files input</Form.Label>
                <Form.Control type="file" multiple />
              </Form.Group>
            </div>
          </div>
          <div className="code ff-menlo bg-dark bd-bl-rs-2 bd-br-rs-2 p-2 p-sm  mb-2">
            <span className="tc-danger-5">
              <span className="tc-success-2">&lt;Form.Group</span> controlId=
              <span className="tc-warning-2">"formFileMultiple"</span>{' '}
              ClassName=<span className="tc-warning-2">"mb-3"</span>&gt;
              <br></br>
              <span className="ml-5">
                <span className="tc-success-2">Form.Label</span>&gt;{' '}
              </span>
              <br></br>
              <span className="ml-10 tc-dark-contrast">
                Multiple files input
              </span>
              <br></br>
              <span className="ml-5 tc-success-2">&lt;/Form.Label&gt;</span>
              <br></br>
              <span className="ml-5">
                <span className="tc-success-2">&lt;Form.Control</span> type=
                <span className="tc-warning-2">"file"</span> multiple/&gt;
              </span>
              <br></br>
              <span className="tc-success-2">&lt;Form.Group&gt;</span>
            </span>
          </div>
        </div>
        <div className="mb-4">
          <div
            className="p-4 bd-tl-rs-2 bd-tr-rs-2 bg-light"
            style={{ border: '1px solid rgba(0,0,0,.1)' }}
          >
            <div className="max-w-70% pos-r ml-a mr-a">
              <Form.Group as={Row} className="mb-3">
                <Col sm>
                  <Button type="submit">Sign in</Button>
                </Col>
              </Form.Group>
            </div>
          </div>
          <div className="code ff-menlo bg-dark bd-bl-rs-2 bd-br-rs-2 p-2 p-sm  mb-2">
            <span className="tc-danger-5">
              <span className="tc-success-2">&lt;Button</span> type=
              <span className="tc-warning-2">"submit"</span>&gt;Sign in
              <span className="tc-success-2">&lt;/Button&gt;</span>
            </span>
          </div>
        </div>
      </Form>
    </div>
  );
}
