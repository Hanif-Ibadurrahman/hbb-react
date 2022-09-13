import { Form, Modal, Container, Row, Col, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import Alert from "app/components/Alerts";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete, TextField } from "@mui/material";
import { IndexingInterfaceState } from "store/Types/IndexingTypes";
import {
	selectindexing,
	selectindexings,
} from "store/Selector/IndexingSelector";
import { selectAreas } from "store/Selector/AreaSelector";
import { selectRooms } from "store/Selector/RoomSelector";
import { selectBoxes } from "store/Selector/BoxSelector";
import {
	selectClassifications,
	selectClassificatoinTreeView,
} from "store/Selector/ClassificationSelector";
import { getAreasList } from "actions/AreaActions";
import { getRoomsList } from "actions/RoomAction";
import { getBoxesList, getBoxesNotPage } from "actions/BoxActions";
import {
	getClassificationsList,
	getClassificationTreeView,
} from "actions/ClassificationAction";
import { CreateIndexing, UpdateIndexing } from "actions/IndexingAction";
import moment from "moment";
import TreeView from "@mui/lab/TreeView";
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from "@mui/lab/TreeItem";
import { ClassificationTreeViewInterfaceState } from "store/Types/ClassificationTypes";

const ModalForm = props => {
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [varianAlert, setVarianAlert] = useState("");
	const indexing: IndexingInterfaceState = useSelector(selectindexing);
	const dispatch = useDispatch();
	const area = useSelector(selectAreas);
	const room = useSelector(selectRooms);
	const box = useSelector(selectBoxes);
	const classification = useSelector(selectClassifications);
	const FetchData = (page = 1) => {
		dispatch(getAreasList(page));
	};
	const RoomData = (page = 1) => {
		dispatch(getRoomsList(page));
	};
	const BoxData = (page = 1) => {
		dispatch(getBoxesNotPage(page));
	};
	const ClassificationData = () => {
		dispatch(getClassificationTreeView());
	};
	useEffect(() => {
		FetchData();
	}, []);
	useEffect(() => {
		RoomData();
	}, []);
	useEffect(() => {
		BoxData();
	}, []);
	useEffect(() => {
		ClassificationData();
	}, []);
	const validationSchema = Yup.object().shape({
		index: Yup.string().required("*Wajib diisi"),
		date: Yup.string().required("*Wajib diisi"),
		// classification_code: Yup.string().required("*Wajib diisi"),
	});

	const getTreeItemsFromData = treeItems => {
		return treeItems?.map(treeItemData => {
			let children = undefined;
			if (treeItemData?.nodes && treeItemData?.nodes.length > 0) {
				children = getTreeItemsFromData(treeItemData?.nodes);
			}
			return (
				<TreeItem
					key={treeItemData?.code}
					nodeId={treeItemData?.code}
					label={treeItemData?.text}
					children={children}
				/>
			);
		});
	};

	return (
		<>
			<Alert
				text={alertMessage}
				variant={varianAlert}
				show={showAlert}
				style={{
					top: 50,
					position: "fixed",
					left: "50%",
					transform: [{ translateX: "50%" }],
				}}
				onHide={() => setShowAlert(false)}
			/>

			<Modal
				show={props.modal}
				onHide={props.hide}
				aria-labelledby="contained-modal-title-vcenter"
			>
				{" "}
				<Formik
					validationSchema={validationSchema}
					initialValues={indexing}
					enableReinitialize={true}
					onSubmit={async values => {
						try {
							values.date_retention = moment(values?.date)
								.add(values?.retention_period, "year")
								.format("YYYY-MM-DD");
							let action = indexing?.id
								? UpdateIndexing(values)
								: CreateIndexing(values);
							const res = await action;
							await dispatch(res);
							action.then(() => {
								props.modalSet(props.valueModalSet);
								setShowAlert(true);
								setVarianAlert("success");
								indexing?.id
									? setAlertMessage("Data Berhasil di Edit")
									: setAlertMessage("Data Berhasil di Tambah");
								setTimeout(function () {
									window.location.reload();
								}, 1000);
							});
						} catch (e) {
							setShowAlert(true);
							setAlertMessage("Gagal Update Data");
							setVarianAlert("danger");
							setTimeout(function () {
								setShowAlert(false);
							}, 4000);
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
						setFieldValue,
						isSubmitting,
					}) => (
						<Form onSubmit={handleSubmit}>
							<Modal.Header closeButton className="bg-primary-5">
								<Modal.Title id="contained-modal-title-vcenter">
									{indexing?.id ? <>Edit Data</> : <>Tambah Data</>}
								</Modal.Title>
							</Modal.Header>
							<Modal.Body className="show-grid">
								<Container>
									<Row>
										<Col xs={12}>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Index</Form.Label>
												<Form.Control
													type="text"
													name="index"
													placeholder="Title Index"
													value={values?.index}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.index && errors.index ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.index}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Tanggal Pemindahan</Form.Label>
												<Form.Control
													type="date"
													name="date"
													placeholder="Pilih Tanggal"
													value={moment(values?.date).format("YYYY-MM-DD")}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
												{touched.date && errors.date ? (
													<p className="tc-danger-5 pos-a p-sm">
														{errors.date}
													</p>
												) : null}
											</Form.Group>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Tipe Berkas</Form.Label>
												<Form.Select
													className="cur-p"
													name="type"
													value={values?.type}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												>
													<option value="">Pilih Tipe</option>
													<option value="fasilitatif">Fasilitatif</option>
													<option value="subtantif">Subtantif</option>
												</Form.Select>
											</Form.Group>

											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Pilih Area</Form.Label>
												<Autocomplete
													id="company"
													options={area?.Areas}
													getOptionLabel={option => option?.name}
													value={values?.area}
													onChange={(e, value) => {
														setFieldValue(
															"area",
															value !== null ? value : values?.area,
														);
													}}
													renderInput={params => (
														<TextField
															margin="normal"
															placeholder="Area"
															name="area"
															{...params}
														/>
													)}
												/>
											</Form.Group>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Pilih Ruangan</Form.Label>
												<Autocomplete
													id="company"
													options={room?.Rooms}
													getOptionLabel={option => option?.name}
													value={values?.room}
													onChange={(e, value) => {
														setFieldValue(
															"room",
															value !== null ? value : values?.room,
														);
													}}
													renderInput={params => (
														<TextField
															margin="normal"
															placeholder="Ruangan"
															name="room"
															{...params}
														/>
													)}
												/>
											</Form.Group>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<TreeView
													defaultCollapseIcon={
														<i className="fas fa-angle-down" />
													}
													defaultExpandIcon={<i className="fas fa-angle-up" />}
													onNodeSelect={(event, nodeIds) => {
														setFieldValue("classification", nodeIds);
													}}
												>
													{getTreeItemsFromData(
														classification?.ClassificationTreeView,
													)}
												</TreeView>
												<Form.Label className="mt-4">Klasifikasi</Form.Label>
												<Form.Control
													type="text"
													name="classification"
													placeholder="Title classification"
													value={values?.classification}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
											</Form.Group>
											<Form.Group className="mb-4" controlId="formBasicEmail">
												<Form.Label>Periode Retensi</Form.Label>
												<Form.Control
													type="number"
													min="0"
													disabled={values?.is_permanent}
													name="retention_period"
													placeholder="Periode Retensi"
													value={values?.retention_period}
													onChange={e => {
														handleChange(e);
													}}
													onBlur={handleBlur}
												/>
											</Form.Group>
											<label>
												<Field
													type="checkbox"
													name="is_permanent"
													checked={values?.is_permanent}
													onChange={e => {
														handleChange(e);
													}}
												/>
												Data Permanen
											</label>
										</Col>
									</Row>
								</Container>
							</Modal.Body>
							<Modal.Footer>
								<Button variant="danger" onClick={props.hide}>
									Close
								</Button>
								<Button
									type="submit"
									disabled={isSubmitting}
									className="bg-success-6"
									variant="success"
								>
									Request
								</Button>{" "}
							</Modal.Footer>
						</Form>
					)}
				</Formik>
			</Modal>
		</>
	);
};

export default ModalForm;
