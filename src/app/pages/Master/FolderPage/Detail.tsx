import React, { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { PageWrapper } from "app/components/PageWrapper";
import Breadcrumb from "app/components/BreadCrumb";
import QR from "app/components/QRCode";
import "../master.scoped.scss";
import api from "../../../../api/dox";
import PaginatedFolderResponse from "app/pages/Interface/cabinet";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getFolderDetail } from "actions/FolderAction";
import { FolderInterfaceState } from "store/Types/FolderTypes";
import { selectFolder } from "store/Selector/FolderSelector";

const FolderPageDetail = ({ match }) => {
	const folder: FolderInterfaceState = useSelector(selectFolder);
	let history = useHistory();

	const goToPreviousPath = e => {
		e.preventDefault();
		history.goBack();
	};

	const folder_id = match.params.id;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getFolderDetail(folder_id));
	}, []);

	return (
		<>
			<PageWrapper className="row w-100%">
				<Breadcrumb
					crumbs={["Dashboard", "Box", "Detail"]}
					selected
					className="mb-4"
				/>
				<div className="col col-9">
					<Card className="ph-5 pv-3 bd-rs-2">
						<Form className="mt-3">
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>No</Form.Label>
								<Form.Control type="text" disabled defaultValue={folder.No} />
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Location</Form.Label>
								<Form.Control
									type="text"
									disabled
									defaultValue={folder.Location}
								/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Status</Form.Label>
								<Form.Control
									type="text"
									disabled
									defaultValue={folder.Status}
								/>
							</Form.Group>
							<div className="d-flex jc-end">
								<Button
									className="mv-4"
									variant="outline-secondary"
									onClick={goToPreviousPath}
								>
									Kembali
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
							value={folder.SignCode}
							className="d-flex jc-center"
						/>
						<div className="d-flex jc-center">
							<p className="p-xl ff-1-bd ta-center mt-3">Folder</p>
						</div>
					</Card>
				</div>
			</PageWrapper>
		</>
	);
};

export default FolderPageDetail;
