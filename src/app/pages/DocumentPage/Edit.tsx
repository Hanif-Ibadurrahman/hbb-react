import React, { useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

export function EditDocument() {
	const validationSchema = Yup.object().shape({
		date: Yup.date().required("*Date is required"),
		time: Yup.string().required("*Time is required"),
		quantity: Yup.string().required("*Quantity required"),
		notes: Yup.string().required("*Notes required"),
	});

	return (
		<Formik
			validationSchema={validationSchema}
			initialValues={{
				codeDocument: "A091321",
				no: "1",
				serialno: "1",
				date: "2021-09-09",
				time: "16:27",
				nominal: "2",
				quantity: "12",
				nobox: "13",
				nofolder: "14",
				notes:
					"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
				list: "Lorem ipsum dolor sit amet",
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
				<div className="pos-r p-8">
					<div className="row mt-14">
						<div className="col-12">
							<Form onSubmit={handleSubmit}>
								{console.log(values)}
								<Form.Group className="mb-4" controlId="formBasicEmail">
									<Form.Label>Code</Form.Label>
									<Form.Control
										type="text"
										name="codeDocument"
										value={values.codeDocument}
										onChange={handleChange}
										onBlur={handleBlur}
										disabled
									/>
									{touched.codeDocument && errors.codeDocument ? (
										<p className="tc-danger-5 pos-a p-sm">
											{errors.codeDocument}
										</p>
									) : null}
								</Form.Group>
								<Form.Group className="mb-4" controlId="formBasicEmail">
									<Form.Label>No</Form.Label>
									<FormControl
										type="number"
										name="no"
										placeholder="No"
										value={values.no}
										onChange={handleChange}
										onBlur={handleBlur}
									/>
									{touched.no && errors.no ? (
										<p className="tc-danger-5 pos-a p-sm">{errors.no}</p>
									) : null}
								</Form.Group>
								<Form.Group className="mb-4" controlId="formBasicEmail">
									<Form.Label>Serial No</Form.Label>
									<Form.Control
										type="number"
										name="serialno"
										placeholder="SerialNo"
										value={values.serialno}
										onChange={handleChange}
										onBlur={handleBlur}
									/>
									{touched.serialno && errors.serialno ? (
										<p className="tc-danger-5 pos-a p-sm">{errors.serialno}</p>
									) : null}
								</Form.Group>
								<Form.Group className="mb-4" controlId="formBasicEmail">
									<Form.Label>Date</Form.Label>
									<Form.Control
										type="date"
										name="date"
										placeholder="Date"
										value={values.date}
										onChange={handleChange}
										onBlur={handleBlur}
									/>
									{touched.date && errors.date ? (
										<p className="tc-danger-5 pos-a p-sm">{errors.date}</p>
									) : null}
								</Form.Group>
								<Form.Group className="mb-4" controlId="formBasicEmail">
									<Form.Label>Time</Form.Label>
									<Form.Control
										type="time"
										name="time"
										placeholder="Time"
										value={values.time}
										onChange={handleChange}
										onBlur={handleBlur}
									/>
									{touched.time && errors.time ? (
										<p className="tc-danger-5 pos-a p-sm">{errors.time}</p>
									) : null}
								</Form.Group>
								<Form.Group className="mb-4" controlId="formBasicEmail">
									<Form.Label>Nominal</Form.Label>
									<Form.Control
										type="number"
										name="nominal"
										placeholder="Nominal"
										value={values.nominal}
										onChange={handleChange}
										onBlur={handleBlur}
									/>
									{touched.nominal && errors.nominal ? (
										<p className="tc-danger-5 pos-a p-sm">{errors.nominal}</p>
									) : null}
								</Form.Group>
								<Form.Group className="mb-4" controlId="formBasicEmail">
									<Form.Label>Quantity</Form.Label>
									<Form.Control
										type="number"
										name="quantity"
										placeholder="Quantity"
										value={values.quantity}
										onChange={handleChange}
										onBlur={handleBlur}
									/>
									{touched.quantity && errors.quantity ? (
										<p className="tc-danger-5 pos-a p-sm">{errors.quantity}</p>
									) : null}
								</Form.Group>
								<Form.Group className="mb-4" controlId="formBasicEmail">
									<Form.Label>No Box</Form.Label>
									<Form.Control
										type="number"
										name="nobox"
										placeholder="NoBox"
										value={values.nobox}
										onChange={handleChange}
										onBlur={handleBlur}
									/>
									{touched.nobox && errors.nobox ? (
										<p className="tc-danger-5 pos-a p-sm">{errors.nobox}</p>
									) : null}
								</Form.Group>
								<Form.Group className="mb-4" controlId="formBasicEmail">
									<Form.Label>No Folder</Form.Label>
									<Form.Control
										type="number"
										name="nofolder"
										placeholder="NoFolder"
										value={values.nofolder}
										onChange={handleChange}
										onBlur={handleBlur}
									/>
									{touched.nofolder && errors.nofolder ? (
										<p className="tc-danger-5 pos-a p-sm">{errors.nofolder}</p>
									) : null}
								</Form.Group>
								<Form.Group className="mb-4" controlId="formBasicEmail">
									<Form.Label>Notes</Form.Label>
									<Form.Control
										type="textarea"
										name="notes"
										placeholder="Notes"
										value={values.notes}
										onChange={handleChange}
										onBlur={handleBlur}
									/>
									{touched.notes && errors.notes ? (
										<p className="tc-danger-5 pos-a p-sm">{errors.notes}</p>
									) : null}
								</Form.Group>
								<Form.Group className="mb-4" controlId="formBasicEmail">
									<Form.Label>List</Form.Label>
									<Form.Control
										type="textarea"
										name="list"
										placeholder="List"
										value={values.list}
										onChange={handleChange}
										onBlur={handleBlur}
									/>
									{touched.list && errors.list ? (
										<p className="tc-danger-5 pos-a p-sm">{errors.list}</p>
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
					</div>
				</div>
			)}
		</Formik>
	);
}
