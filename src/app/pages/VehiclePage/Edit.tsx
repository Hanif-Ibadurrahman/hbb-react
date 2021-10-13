import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import Breadcrumb from "app/components/BreadCrumb";

export function EditVehicle() {
	const [crumbs, setCrumbs] = useState(["Dashboard", "VehiclePage", "Edit"]);

	const validationSchema = Yup.object().shape({
		NoPolisi: Yup.string().required("*Nomor Polisi is required"),
		JenisKendaraan: Yup.string().required("*Jenis is required"),
		MerkKendaraan: Yup.string().required("*Merk Kendaraan required"),
		WarnaKendaraan: Yup.string().required("*Warna Kendaraan required"),
		MaksMuatan: Yup.number().required("*Maksimal required"),
	});

	return (
		<Formik
			validationSchema={validationSchema}
			initialValues={{
				NoPolisi: "F123125AB",
				JenisKendaraan: "SUV",
				MerkKendaraan: "Suzuki",
				WarnaKendaraan: "Putih",
				MaksMuatan: "10",
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
							<Form.Group className="mb-4" controlId="NoPolisi">
								<Form.Label>Nomor Polisi</Form.Label>
								<Form.Control
									type="text"
									name="NoPolisi"
									value={values.NoPolisi}
									onChange={handleChange}
									onBlur={handleBlur}
								/>
								{touched.NoPolisi && errors.NoPolisi ? (
									<p className="tc-danger-5 pos-a p-sm">{errors.NoPolisi}</p>
								) : null}
							</Form.Group>
							<Form.Group className="mb-4" controlId="JenisKendaraan">
								<Form.Label>Jenis Kendaraan</Form.Label>
								<Form.Control
									type="text"
									name="JenisKendaraan"
									value={values.JenisKendaraan}
									onChange={handleChange}
									onBlur={handleBlur}
								/>
								{touched.JenisKendaraan && errors.JenisKendaraan ? (
									<p className="tc-danger-5 pos-a p-sm">
										{errors.JenisKendaraan}
									</p>
								) : null}
							</Form.Group>
							<Form.Group className="mb-4" controlId="MerkKendaraan">
								<Form.Label>Merk kendaraan</Form.Label>
								<Form.Control
									type="text"
									name="MerkKendaraan"
									value={values.MerkKendaraan}
									onChange={handleChange}
									onBlur={handleBlur}
								/>
								{touched.MerkKendaraan && errors.MerkKendaraan ? (
									<p className="tc-danger-5 pos-a p-sm">
										{errors.MerkKendaraan}
									</p>
								) : null}
							</Form.Group>
							<Form.Group className="mb-4" controlId="WarnaKendaraan">
								<Form.Label>Warna Kendaraan</Form.Label>
								<Form.Control
									type="text"
									name="WarnaKendaraan"
									value={values.WarnaKendaraan}
									onChange={handleChange}
									onBlur={handleBlur}
								/>
								{touched.WarnaKendaraan && errors.WarnaKendaraan ? (
									<p className="tc-danger-5 pos-a p-sm">
										{errors.WarnaKendaraan}
									</p>
								) : null}
							</Form.Group>
							<Form.Group className="mb-4" controlId="MaksimalMuatan">
								<Form.Label>Maksimal Muatan</Form.Label>
								<Form.Control
									type="number"
									name="MaksMuatan"
									value={values.MaksMuatan}
									onChange={handleChange}
									onBlur={handleBlur}
								/>
								{touched.MaksMuatan && errors.MaksMuatan ? (
									<p className="tc-danger-5 pos-a p-sm">{errors.MaksMuatan}</p>
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
