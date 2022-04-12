import React from "react";
import { Button, Col, Row, Container, Form } from "react-bootstrap";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { FolderInterfaceState } from "store/Types/FolderTypes";
import { SearchFolders } from "actions/FolderAction";
import { selectFolder } from "store/Selector/FolderSelector";

export function SearchInput(props) {
	const dispatch = useDispatch();
	const folder: FolderInterfaceState = useSelector(selectFolder);

	return (
		<>
			<Formik
				validationSchema={false}
				initialValues={folder}
				enableReinitialize={true}
				onSubmit={async values => {
					try {
						const res = await SearchFolders(values);
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
									name="no"
									placeholder="cari no folder"
									value={values.no}
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
