import React from "react";
import { Button, Col, Row, Container, Form, Modal } from "react-bootstrap";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { SearchApprovalAdmin } from "actions/RequestBoxAction";
import { RequestBoxInterfaceState } from "store/Types/RequestBoxTypes";
import { selectRequestBox } from "store/Selector/RequestBoxSelector";

export function SearchInput(props) {
	const dispatch = useDispatch();
	const csrAdminApproval: RequestBoxInterfaceState =
		useSelector(selectRequestBox);

	return (
		<Formik
			validationSchema={false}
			initialValues={csrAdminApproval}
			enableReinitialize={true}
			onSubmit={async values => {
				try {
					const res = await SearchApprovalAdmin(values);
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
					<Container>
						<Row className="jc-end mb-4">
							<Col xs={3}>
								<Form.Select
									className="cur-p"
									name="type"
									value={values.type}
									onChange={e => {
										handleChange(e);
									}}
									onBlur={handleBlur}
								>
									<option>Pilih Tipe Permintaan</option>
									<option value="request-box">Request Box</option>
									<option value="borrow-item">Peminjaman</option>
									<option value="return-item">Pengembalian</option>
								</Form.Select>
							</Col>
							<Button
								type="submit"
								disabled={isSubmitting}
								className="bg-success-6 w-20"
								variant="success"
							>
								Filter
							</Button>
						</Row>
					</Container>
				</Form>
			)}
		</Formik>
	);
}
