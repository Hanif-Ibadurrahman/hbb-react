import React from "react";
import { Button, Col, Row, Container, Form } from "react-bootstrap";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { selectCabinet } from "store/Selector/CabinetSelector";
import { AreaInterfaceState } from "store/Types/AreaTypes";
import { selectArea } from "store/Selector/AreaSelector";
import { SearchArea } from "actions/AreaActions";

export function SearchInput(props) {
	const dispatch = useDispatch();
	const area: AreaInterfaceState = useSelector(selectArea);

	return (
		<>
			<Formik
				validationSchema={false}
				initialValues={area}
				enableReinitialize={true}
				onSubmit={async values => {
					try {
						const res = await SearchArea(values);
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
									name="code_area"
									placeholder="cari code area"
									value={values.code_area}
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
