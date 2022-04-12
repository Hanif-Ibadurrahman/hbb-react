import React from "react";
import { Button, Col, Row, Container, Form } from "react-bootstrap";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { selectStaff } from "store/Selector/StaffSelector";
import { SearchStaff } from "actions/StaffAction";
import { StaffInterfaceState } from "store/Types/StaffTypes";

export function SearchInput(props) {
	const dispatch = useDispatch();
	const staff: StaffInterfaceState = useSelector(selectStaff);

	return (
		<>
			<Formik
				validationSchema={false}
				initialValues={staff}
				enableReinitialize={true}
				onSubmit={async values => {
					try {
						const res = await SearchStaff(values);
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
									name="username"
									placeholder="cari username"
									value={values.username}
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
