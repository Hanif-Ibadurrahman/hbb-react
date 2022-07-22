import React from "react";
import { Button, Col, Row, Container, Form } from "react-bootstrap";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { selectCabinet } from "store/Selector/CabinetSelector";
import { AreaInterfaceState } from "store/Types/AreaTypes";
import { selectArea } from "store/Selector/AreaSelector";
import { SearchArea } from "actions/AreaActions";
import { ClassificationInterfaceState } from "store/Types/ClassificationTypes";
import { selectClassification } from "store/Selector/ClassificationSelector";
import { SearchClassification } from "actions/ClassificationAction";

export function SearchInput(props) {
	const dispatch = useDispatch();
	const classification: ClassificationInterfaceState =
		useSelector(selectClassification);

	return (
		<>
			<Formik
				validationSchema={false}
				initialValues={classification}
				enableReinitialize={true}
				onSubmit={async values => {
					try {
						const res = await SearchClassification(values);
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
									name="name"
									placeholder="cari nama klasifikasi"
									value={values.name}
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
