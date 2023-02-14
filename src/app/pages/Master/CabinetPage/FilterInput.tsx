import React from "react";
import { Button, Col, Row, Container, Form } from "react-bootstrap";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { SearchBoxes } from "actions/BoxActions";
import { BoxInterfaceState } from "store/Types/BoxTypes";
import { selectBox } from "store/Selector/BoxSelector";
import { SearchCabinet } from "actions/CabinetAction";
import { CabinetInterfaceState } from "store/Types/CabinetTypes";
import { selectCabinet } from "store/Selector/CabinetSelector";

export function SearchInput(props) {
	const dispatch = useDispatch();
	const cabinet: CabinetInterfaceState = useSelector(selectCabinet);

	return (
		<>
			<Formik
				validationSchema={false}
				initialValues={cabinet}
				enableReinitialize={true}
				onSubmit={async values => {
					try {
						const res = await SearchCabinet(values);
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
									name="code_cabinet"
									placeholder="cari Kode Kabinet"
									value={values.code_cabinet}
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
