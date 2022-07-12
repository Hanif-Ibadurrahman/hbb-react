import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { selectCar } from "store/Selector/CarSelector";
import { CarInterfaceState } from "store/Types/CarTypes";
import { SearchCar } from "actions/CarAction";

export function SearchInput(props) {
	const dispatch = useDispatch();
	const car: CarInterfaceState = useSelector(selectCar);

	return (
		<>
			<Formik
				validationSchema={false}
				initialValues={car}
				enableReinitialize={true}
				onSubmit={async values => {
					try {
						const res = await SearchCar(values);
						await dispatch(res);
					} catch (e) {
						console.log("error");
					}
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
					<Form onSubmit={handleSubmit} className="right">
						<Container className="d-flex">
							<Form.Group>
								<Form.Control
									type="text"
									name="license_plate"
									placeholder="cari kode kendaraan"
									value={values.license_plate}
									onChange={e => {
										handleChange(e);
									}}
								/>
							</Form.Group>
							<Button
								type="submit"
								disabled={isSubmitting}
								className="bg-success-6 w-20 ml-4"
								variant="success"
							>
								Cari
							</Button>
						</Container>
					</Form>
				)}
			</Formik>
		</>
	);
}
