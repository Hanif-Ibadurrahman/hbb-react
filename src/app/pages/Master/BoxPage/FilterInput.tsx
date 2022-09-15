import React from "react";
import { Button, Col, Row, Container, Form } from "react-bootstrap";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { SearchBoxes } from "actions/BoxActions";
import { BoxInterfaceState } from "store/Types/BoxTypes";
import { selectBox } from "store/Selector/BoxSelector";

export function SearchInput(props) {
	const dispatch = useDispatch();
	const box: BoxInterfaceState = useSelector(selectBox);

	return (
		<>
			<Formik
				validationSchema={false}
				initialValues={box}
				enableReinitialize={true}
				onSubmit={async values => {
					try {
						const res = await SearchBoxes(values);
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
					<Form onSubmit={handleSubmit} className="right d-flex">
						<Container className="d-flex">
							<Form.Group>
								<Form.Control
									type="text"
									name="code_box"
									placeholder="cari code box"
									value={values.code_box}
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
						<Container className="d-flex">
							<Form.Group>
								<Form.Control
									type="text"
									name="custom_code_box"
									placeholder="Custome Code Box"
									value={values.custom_code_box}
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
