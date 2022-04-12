import React from "react";
import { Button, Col, Row, Container, Form, Modal } from "react-bootstrap";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { DocumentInterfaceState } from "store/Types/DocumentTypes";
import { selectDocument } from "store/Selector/DocumentSelector";
import { filterData, RESET_DOCUMENT_FORM } from "actions/DocumentAction";

export function ModalFilter(props) {
	const dispatch = useDispatch();
	const document: DocumentInterfaceState = useSelector(selectDocument);

	return (
		<Modal
			{...props}
			aria-labelledby="contained-modal-title-vcenter"
			className="right"
		>
			<Formik
				validationSchema={false}
				initialValues={document}
				enableReinitialize={true}
				onSubmit={async values => {
					try {
						const res = await filterData(values);
						await dispatch(res);
						dispatch({ type: RESET_DOCUMENT_FORM });
						props.modalSet(props.valueModalSet);
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
						<Modal.Header closeButton>
							<Modal.Title id="contained-modal-title-vcenter">
								Filter
							</Modal.Title>
						</Modal.Header>
						<Modal.Body className="show-grid">
							<Container>
								<Row>
									<Col xs={12}>
										<Form.Group className="mb-4" controlId="formBasicEmail">
											<Form.Label>No Document</Form.Label>
											<Form.Control
												type="text"
												name="no"
												placeholder="No Document"
												value={values.no}
												onChange={e => {
													handleChange(e);
												}}
												onBlur={handleBlur}
											/>
										</Form.Group>
									</Col>
									<Col xs={12}>
										<Form.Group className="mb-4" controlId="formBasicEmail">
											<Form.Label>Detail</Form.Label>
											<Form.Control
												type="text"
												name="detail"
												placeholder="Detail"
												value={values.detail}
												onChange={e => {
													handleChange(e);
												}}
												onBlur={handleBlur}
											/>
										</Form.Group>
									</Col>
									<Col xs={12}>
										<Form.Group className="mb-4" controlId="formBasicEmail">
											<Form.Label>Masa Aktif Dokumen</Form.Label>
											<Form.Control
												type="text"
												name="active_year_for"
												placeholder="Masa Aktif Dokumen"
												value={values.active_year_for}
												onChange={e => {
													handleChange(e);
												}}
												onBlur={handleBlur}
											/>
										</Form.Group>
									</Col>
									<Col xs={12}>
										<Form.Group className="mb-4" controlId="formBasicEmail">
											<Form.Label>Level Progress</Form.Label>
											<Form.Control
												type="text"
												name="level_progress"
												placeholder="Level Progress"
												value={values.level_progress}
												onChange={e => {
													handleChange(e);
												}}
												onBlur={handleBlur}
											/>
										</Form.Group>
									</Col>
									<Col xs={12}>
										<Form.Group className="mb-4" controlId="formBasicEmail">
											<Form.Label>Media Penyimpanan</Form.Label>
											<Form.Control
												type="text"
												name="media_storage"
												placeholder="Media Penyimpanan"
												value={values.media_storage}
												onChange={e => {
													handleChange(e);
												}}
												onBlur={handleBlur}
											/>
										</Form.Group>
									</Col>
									<Col xs={12}>
										<Form.Group className="mb-4" controlId="formBasicEmail">
											<Form.Label>Kondisi</Form.Label>
											<Form.Control
												type="text"
												name="condition"
												placeholder="Kondisi"
												value={values.condition}
												onChange={e => {
													handleChange(e);
												}}
												onBlur={handleBlur}
											/>
										</Form.Group>
									</Col>
									<Col xs={12}>
										<Form.Group className="mb-4" controlId="formBasicEmail">
											<Form.Label>Deskripsi</Form.Label>
											<Form.Control
												type="text"
												name="description"
												placeholder="Deskripsi"
												value={values.description}
												onChange={e => {
													handleChange(e);
												}}
												onBlur={handleBlur}
											/>
										</Form.Group>
									</Col>
									<Col xs={12}>
										<Form.Group className="mb-4" controlId="formBasicEmail">
											<Form.Label>Status</Form.Label>
											<Form.Control
												type="text"
												name="status"
												placeholder="Status"
												value={values.status}
												onChange={e => {
													handleChange(e);
												}}
												onBlur={handleBlur}
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
							<Button variant="danger">Reset</Button>
						</Modal.Footer>
					</Form>
				)}
			</Formik>
		</Modal>
	);
}
