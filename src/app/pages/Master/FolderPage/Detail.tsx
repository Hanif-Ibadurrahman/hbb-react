import React, { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { PageWrapper } from "app/components/PageWrapper";
import Breadcrumb from "app/components/BreadCrumb";
import QR from "app/components/QRCode";
import "../master.scoped.scss";
import api from "../../../../api/dox";
import PaginatedFolderResponse from "app/pages/Interface/cabinet";
import { useHistory } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { getFolderDetail } from "actions/FolderAction";

const mapStateToProps = state => {
	return {
		FolderDetail: state.folders.FolderDetail,
		errorUserDetail: state.folders.errorFolderDetail,
	};
};

const FolderPageDetail = props => {
	let history = useHistory();

	const goToPreviousPath = e => {
		e.preventDefault();
		history.goBack();
	};

	const folder_id = props.match.params.key;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getFolderDetail(folder_id));
	}, []);

	return (
		<>
			<PageWrapper className="row w-100%">
				<Breadcrumb
					crumbs={["Dashboard", "Folder", "Detail"]}
					selected
					className="mb-4"
				/>
				<div className="col col-9">
					<Card className="ph-5 pv-3 bd-rs-2">
						<Form className="mt-3">
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>No Folder</Form.Label>
								<Form.Control
									type="text"
									disabled
									defaultValue={props.FolderDetail.no}
								/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Date</Form.Label>
								<Form.Control type="date" disabled defaultValue="04/09/21" />
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Time</Form.Label>
								<Form.Control type="time" disabled defaultValue="16:27" />
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Quantity</Form.Label>
								<Form.Control type="text" disabled defaultValue="10" />
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Notes</Form.Label>
								<Form.Control
									as="textarea"
									className="notesdisable"
									disabled
									defaultValue="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
								/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Status</Form.Label>
								<Form.Control
									className="bg-success-6 w-100%"
									defaultValue="Approve"
									disabled
								></Form.Control>
							</Form.Group>
							<div className="d-flex jc-end">
								<Button
									className="mv-4 mr-4"
									variant="outline-secondary"
									onClick={goToPreviousPath}
								>
									Kembali
								</Button>{" "}
								<Button
									className="bg-success-6 mv-4 d-flex ai-center"
									variant="success"
								>
									<i className="far fa-edit mr-2 p-md"></i>
									<span className="text p-md">Edit Data</span>
								</Button>{" "}
							</div>
						</Form>
					</Card>
				</div>
				<div className="col col-3">
					<Card className="p-4 bd-rs-2 d-flex ai-center jc-center">
						<QR
							id="Detail-Box-QR"
							title="Scan here"
							value="ID : A12O2O3"
							className="d-flex jc-center"
						/>
						<div className="d-flex jc-center">
							<p className="p-xl ff-1-bd ta-center mt-3">
								{props.FolderDetail.no}
							</p>
						</div>
					</Card>
				</div>
			</PageWrapper>
		</>
	);
};

export default connect(mapStateToProps, null)(FolderPageDetail);
