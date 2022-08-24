import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { resetPassword } from "api/user";
import Alert from "app/components/Alerts";

// import { Profile, ProfileHero } from '../../../components/Image';

// const profileSize = 130;

const validationSchema = Yup.object().shape({
	OldPassword: Yup.string().required("Password is required"),
	NewPassword: Yup.string()
		.required("Password is required")
		.min(8, "Password must be at least 8 characters"),
	Confirmation: Yup.string().oneOf(
		[Yup.ref("NewPassword"), null],
		"Passwords must match",
	),
});

export default function ChangePassword() {
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [varianAlert, setVarianAlert] = useState("");
	return (
		<>
			<Alert
				text={alertMessage}
				variant={varianAlert}
				show={showAlert}
				style={{
					top: 50,
					position: "fixed",
					left: "50%",
					transform: [{ translateX: "-50%" }],
				}}
				onHide={() => setShowAlert(false)}
			/>
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
							const payload = {
								password: values.OldPassword,
								new_password: values.NewPassword,
								new_password_confirmation: values.Confirmation,
							};

							resetPassword(payload)
								.then(res => {
									setAlertMessage(res?.data?.data?.message);
									setVarianAlert("success");
									resetForm();
									setSubmitting(false);
									setShowAlert(true);
									setTimeout(function () {
										window.location.reload();
									}, 1000);
								})
								.catch(err => {
									setShowAlert(true);
									console.log(err, "err");
									if (err?.response?.status === 401) {
										setAlertMessage("Failed! Wrong old password");
									} else {
										setAlertMessage("Change password failed");
									}
									setVarianAlert("danger");
									setTimeout(function () {
										setShowAlert(false);
										resetForm();
									}, 4000);
								});
							// Simulate submitting to database, shows us values submitted, resets form
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
									</Button>
								</div>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</>
	);
}
