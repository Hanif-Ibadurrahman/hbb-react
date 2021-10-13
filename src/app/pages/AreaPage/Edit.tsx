import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import Breadcrumb from "app/components/BreadCrumb";

export function EditArea() {
	const [crumbs, setCrumbs] = useState(["Dashboard", "AreaPage", "Edit"]);
	const validationSchema = Yup.object().shape({
		RecordCenter: Yup.string().required("*Record Center is required"),
	});

	return (
		<Formik
			validationSchema={validationSchema}
			initialValues={{
				RecordCenter: "RC Bandung",
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
				<>
					<Breadcrumb crumbs={crumbs} selected />
					<div className="pos-r p-8 w-80%">
						<Form onSubmit={handleSubmit}>
							{console.log(values)}
							<Form.Group className="mb-4" controlId="formBasicEmail">
								<Form.Label>Record Center</Form.Label>
								<Form.Control
									type="text"
									name="RecordCenter"
									value={values.RecordCenter}
									onChange={handleChange}
									onBlur={handleBlur}
								/>
								{touched.RecordCenter && errors.RecordCenter ? (
									<p className="tc-danger-5 pos-a p-sm">
										{errors.RecordCenter}
									</p>
								) : null}
							</Form.Group>
							<Button
								className="mt-4 bg-success-6"
								variant="success"
								disabled={isSubmitting}
							>
								Edit Data
							</Button>{" "}
						</Form>
					</div>
				</>
			)}
		</Formik>
	);
}
