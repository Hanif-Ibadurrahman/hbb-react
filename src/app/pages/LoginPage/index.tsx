import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import LoginBg from 'assets/images/login.jpg';
import './LoginPage.scoped.scss';

export function LoginPage() {
  let history = useHistory();
  const [active, setActive] = useState(false);

  const onSubmit = e => {
    e.preventDefault();
    history.push('/Dashboard');
  };

  const LoginForm = () => {
    return (
      <form className="form-signin">
        <h1 className="h3 mb-12 font-weight-normal tc-dark-contrast">
          Sign In
        </h1>
        <div className="pos-r">
          <Form.Group controlId="formHorizontalEmail" className="mb-3">
            <Form.Control
              type="email"
              placeholder="Email"
              id="email"
              className="pv-3 ph-4"
            />
          </Form.Group>
          <Form.Group controlId="formHorizontalPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              id="password"
              className="pv-3 ph-4"
            />
          </Form.Group>
        </div>
        <div className="d-grid gap-2 mt-8 mb-6">
          <Button variant="primary" className="pv-3 ph-4" onClick={onSubmit}>
            Log In
          </Button>
        </div>
        <div className="d-flex jc-center">
          <span
            className="cur-p tc-medium-tint hover:tc-light"
            onClick={e => setActive(true)}
          >
            Lupa Password?
          </span>
        </div>
      </form>
    );
  };

  const ForgotPasswordForm = () => {
    return (
      <form className="form-password">
        <h1 className="h4 mb-3 font-weight-normal tc-dark-contrast">
          Forgot Password
        </h1>
        <p className="max-w-100% op-50% tc-dark-contrast mb-8">
          Enter your given company email to receive your password change
          confirmation.
        </p>
        <div className="pos-r">
          <Form.Group controlId="formHorizontalEmail" className="mb-3">
            <Form.Control
              type="email"
              placeholder="Email"
              id="email"
              className="pv-3 ph-4"
            />
          </Form.Group>
        </div>
        <div className="d-grid gap-2 mt-8 mb-6">
          <Button variant="primary" className="pv-3 ph-4">
            Log In
          </Button>
        </div>
        <div className="d-flex jc-center">
          <span
            className="cur-p tc-medium-tint hover:tc-light"
            onClick={e => setActive(false)}
          >
            I remember my password
          </span>
        </div>
      </form>
    );
  };

  return (
    <>
      <Helmet>
        <title>Dox - Login</title>
        <meta
          name="description"
          content="A React Boilerplate application homepage"
        />
      </Helmet>
      <div
        className="login-bg"
        style={{ backgroundImage: 'url(' + LoginBg + ')' }}
      />
      <div className="pos-r d-flex ai-center h-100vh">
        <div className="pos-r max-w-40% ml-a mr-a -mt-8 login-wrapper p-14 pb-10">
          <div
            className={
              'pos-r form-wrapper ' + (active === true ? 'active' : 'nonactive')
            }
          >
            <LoginForm />
            <ForgotPasswordForm />
          </div>
        </div>
      </div>
    </>
  );
}
