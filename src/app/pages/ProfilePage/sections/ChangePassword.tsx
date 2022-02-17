import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
// import { Profile, ProfileHero } from '../../../components/Image';

// const profileSize = 130;

const validationSchema = Yup.object().shape({
	OldPassword: Yup.string().required("Password is required"),
	NewPassword: Yup.string().required("Password is required"),
	Confirmation: Yup.string().oneOf(
		[Yup.ref("NewPassword"), null],
		"Passwords must match",
	),
});

export default function ChangePassword() {
	return (
		<>
			<div className="pl-8 w-80%">
				<h6 className="ff-1-bd pt-8 pb-12 tc-medium">Change Password</h6>
				<div className="pos-r">
					<Formik
						validationSchema={validationSchema}
						initialValues={{
							OldPassword: "",
							NewPassword: "",
							Confirmation: "",
						}}
						onSubmit={(values, { setSubmitting, resetForm }) => {
							// When button submits form and form is in the process of submitting, submit button is disabled
							setSubmitting(true);

							// Simulate submitting to database, shows us values submitted, resets form
							setTimeout(() => {
								alert(JSON.stringify(values, null, 2));
								resetForm();
								setSubmitting(false);
							}, 500);
						}}
					>
						{({
							values,
							errors,
							touched,
							handleChange,
							handleBlur,
							handleSubmit,
							isSubmitting,
						}) => (
							<Form onSubmit={handleSubmit}>
								{console.log(values)}
								<Form.Group className="mb-4" controlId="formBasicEmail">
									<Form.Label className="tc-medium">Old Password</Form.Label>
									<Form.Control
										className="ls-2"
										type="password"
										name="OldPassword"
										value={values.OldPassword}
										onChange={handleChange}
										onBlur={handleBlur}
									/>
									{touched.OldPassword && errors.OldPassword ? (
										<p className="tc-danger-5 pos-a p-sm">
											{errors.OldPassword}
										</p>
									) : null}
								</Form.Group>
								<Form.Group className="mb-4" controlId="formBasicEmail">
									<Form.Label className="tc-medium">New Password</Form.Label>
									<Form.Control
										className="ls-2"
										type="password"
										name="NewPassword"
										value={values.NewPassword}
										onChange={handleChange}
										onBlur={handleBlur}
									/>
									{touched.NewPassword && errors.NewPassword ? (
										<p className="tc-danger-5 pos-a p-sm">
											{errors.NewPassword}
										</p>
									) : null}
								</Form.Group>
								<Form.Group className="mb-4" controlId="formBasicEmail">
									<Form.Label className="tc-medium">
										Confirmation New Password
									</Form.Label>
									<Form.Control
										className="ls-2"
										type="password"
										name="Confirmation"
										value={values.Confirmation}
										onChange={handleChange}
										onBlur={handleBlur}
									/>
									{touched.Confirmation && errors.Confirmation ? (
										<p className="tc-danger-5 pos-a p-sm">
											{errors.Confirmation}
										</p>
									) : null}
								</Form.Group>
								<div className="d-flex jc-end">
									<Button
										className="bg-success-6"
										variant="success"
										disabled={isSubmitting}
										type="submit"
									>
										Edit Data
									</Button>{" "}
								</div>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</>
	);
}
