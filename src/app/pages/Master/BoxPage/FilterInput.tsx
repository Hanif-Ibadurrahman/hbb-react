import React, { useState } from "react";
import { Button, Col, Row, Container, Form, Modal } from "react-bootstrap";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
	AddValueFilter,
	getBoxesList,
	RESET_BOX_FORM,
	SearchBoxes,
} from "actions/BoxActions";
import { BoxInterfaceState } from "store/Types/BoxTypes";
import { selectBox } from "store/Selector/BoxSelector";

export function SearchInput(props) {
	const dispatch = useDispatch();
	const box: BoxInterfaceState = useSelector(selectBox);
	const [modalShow, setModalShow] = useState(false);
	return (
		<>
			<Button
				className="d-flex ai-center mr-2"
				variant="secondary"
				onClick={() => setModalShow(true)}
			>
				Filter<i className="fas fa-sort-alt ml-2"></i>
			</Button>{" "}
			<Modal
				{...props}
				aria-labelledby="contained-modal-title-vcenter"
				className="right"
				show={modalShow}
				onHide={() => setModalShow(false)}
			>
				<Formik
					validationSchema={false}
					initialValues={box}
					enableReinitialize={true}
					onSubmit={async values => {
						try {
							// const res = await getBoxesList(1, null, values);
							dispatch(await AddValueFilter(values));
							// await dispatch(res);
							setModalShow(false);
						} catch (e) {
							setModalShow(false);
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
							<Modal.Header closeButton>
								<Modal.Title id="contained-modal-title-vcenter">
									Filter
								</Modal.Title>
							</Modal.Header>
							<Modal.Body className="show-grid">
								<Container>
									<Row>
										<Col xs={12}>
											<Form.Group className="mb-4">
												<Form.Label>Code Box</Form.Label>
												<Form.Control
													type="text"
													name="code_box"
													placeholder="Code Box"
													value={values.code_box}
													onChange={e => {
														handleChange(e);
													}}
												/>
											</Form.Group>
										</Col>
										<Col xs={12}>
											<Form.Group className="mb-4">
												<Form.Label>Alternative Code</Form.Label>
												<Form.Control
													type="text"
													name="custom_code_box"
													placeholder="Alternative Code"
													value={values.custom_code_box}
													onChange={e => {
														handleChange(e);
													}}
												/>
											</Form.Group>
										</Col>
									</Row>
								</Container>
							</Modal.Body>
							<Modal.Footer>
								<Button
									type="submit"
									disabled={isSubmitting}
									className="bg-success-6"
									variant="success"
								>
									Filter
								</Button>{" "}
								<Button
									variant="danger"
									onClick={() => {
										dispatch({ type: RESET_BOX_FORM });
									}}
								>
									Reset
								</Button>
							</Modal.Footer>
						</Form>
					)}
				</Formik>
			</Modal>
		</>
	);
}
