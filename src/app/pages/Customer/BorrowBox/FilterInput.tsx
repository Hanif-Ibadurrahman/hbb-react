import React from "react";
import { Button, Col, Row, Container, Form } from "react-bootstrap";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { selectBox } from "store/Selector/BoxSelector";
import { SearchBoxesBorrow } from "actions/BorrowItemAction";
import { selectBorrowItem } from "store/Selector/BorrowItemSelector";
import { BorrowItemInterfaceState } from "store/Types/BorrowItemTypes";

export function SearchInput(props) {
	const dispatch = useDispatch();
	const box: BorrowItemInterfaceState = useSelector(selectBorrowItem);

	return (
		<>
			<Formik
				validationSchema={false}
				initialValues={box}
				enableReinitialize={true}
				onSubmit={async values => {
					try {
						const res = await SearchBoxesBorrow(values);
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
									name="code_box"
									placeholder="cari Kode Box"
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
					</Form>
				)}
			</Formik>
		</>
	);
}
