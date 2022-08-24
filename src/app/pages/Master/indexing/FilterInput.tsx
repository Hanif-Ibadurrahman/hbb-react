import React from "react";
import { Button, Col, Row, Container, Form } from "react-bootstrap";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { IndexingInterfaceState } from "store/Types/IndexingTypes";
import { selectindexing } from "store/Selector/IndexingSelector";
import { SearchIndexing } from "actions/IndexingAction";

export function SearchIndex(props) {
	const dispatch = useDispatch();
	const indexing: IndexingInterfaceState = useSelector(selectindexing);

	return (
		<>
			<Formik
				validationSchema={false}
				initialValues={indexing}
				enableReinitialize={true}
				onSubmit={async values => {
					try {
						const res = await SearchIndexing(values);
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
									name="index"
									placeholder="cari Index"
									value={values?.index}
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
