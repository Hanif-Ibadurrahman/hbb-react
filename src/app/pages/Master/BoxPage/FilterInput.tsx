import React, { useEffect, useState } from "react";
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
import { Autocomplete, TextField } from "@mui/material";
import { selectCompanys } from "store/Selector/CompanySelector";
import { selectDivisions } from "store/Selector/DivisionSelector";
import { getCompanyList } from "actions/CompanyAction";
import { getDivisionsList } from "actions/DivisionAction";

export function SearchInput(props) {
	const dispatch = useDispatch();
	const box: BoxInterfaceState = useSelector(selectBox);
	const [modalShow, setModalShow] = useState(false);
	const company = useSelector(selectCompanys);
	const division = useSelector(selectDivisions);
	const CompanyList = (page = 1) => {
		dispatch(getCompanyList(page));
	};
	const DivisionData = (page = 1) => {
		dispatch(getDivisionsList(page));
	};
	useEffect(() => {
		CompanyList();
	}, []);
	useEffect(() => {
		DivisionData();
	}, []);
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
						setFieldValue,
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
										<Col xs={12}>
											<Form.Group className="mb-4">
												<Form.Label>Kode Pelasana</Form.Label>
												<Form.Control
													type="text"
													name="implementer_code"
													placeholder="Kode Pelaksana"
													value={values.implementer_code}
													onChange={e => {
														handleChange(e);
													}}
												/>
											</Form.Group>
										</Col>
										<Col xs={12}>
											<Form.Group className="mb-4">
												<Form.Label>Perusahaan</Form.Label>
												<Autocomplete
													id="company"
													options={company.Companys}
													getOptionLabel={option => option.name}
													value={values.company}
													onChange={(e, value) => {
														setFieldValue(
															"company",
															value !== null ? value : values.company,
														);
													}}
													renderInput={params => (
														<TextField
															margin="normal"
															placeholder="Company"
															name="comapany_id"
															{...params}
														/>
													)}
												/>
											</Form.Group>
										</Col>
										<Col xs={12}>
											<Form.Group className="mb-4">
												<Form.Label>Divisi</Form.Label>
												<Autocomplete
													id="division_id"
													value={values?.division}
													options={division?.Divisions}
													getOptionLabel={option => option.name}
													onChange={(e, value) => {
														setFieldValue(
															"division",
															value !== null ? value : values?.division.id,
														);
													}}
													renderInput={params => (
														<TextField
															margin="normal"
															placeholder="Division"
															name="division_id"
															{...params}
														/>
													)}
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
