import React, { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { PageWrapper } from "app/components/PageWrapper";
import Breadcrumb from "app/components/BreadCrumb";
import QR from "app/components/QRCode";
import "../master.scoped.scss";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getBoxDetail } from "actions/BoxActions";
import { selectBoxes, selectBox } from "store/Selector/BoxSelector";
import { BoxInterfaceState } from "store/Types/BoxTypes";
import moment from "moment";

const BoxPageDetail = ({ match }) => {
	const box: BoxInterfaceState = useSelector(selectBox);
	let history = useHistory();

	const goToPreviousPath = e => {
		e.preventDefault();
		history.goBack();
	};

	const box_id = match.params.id;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getBoxDetail(box_id));
	}, []);

	const folders = box.folders ?? []

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
								<Form.Label>Code Box</Form.Label>
								<Form.Control type="text" disabled defaultValue={box.code_box} />
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Status</Form.Label>
								<Form.Control type="text" disabled defaultValue={box.status} />
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Code Lemari</Form.Label>
								<Form.Control type="text" disabled defaultValue={box.cabinet_slot.name} />
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
					<Card className="ph-5 pv-3 bd-rs-2 mt-3">
						<h6 className="mb-4 mt-4">Folder</h6>
						{folders.map((item, index) => {
							return (
								<div>
									<p className="mb-1 p-lg">Slot {index + 1}</p>
									<div className="w-50% bg-dark h-2px mb-4" />
									<div className="row mb-4">
										<div className="col-6">
											<Form.Group>
												<Form.Label>Nama Folder</Form.Label>
												<Form.Control
													type="text"
													disabled
													defaultValue={""}
												/>
											</Form.Group>
											<Form.Group className="mt-2">
												<Form.Label>Tanggal Pembuatan</Form.Label>
												<Form.Control
													type="text"
													disabled
													defaultValue={""}
												/>
											</Form.Group>
										</div>
										<div className="col-6 d-flex jc-center ai-center">
											<QR
												id="QR Box"
												title="Scan here"
												value="Folder-Code"
												className="d-flex jc-center"
											/>
										</div>
									</div>
								</div>
							)
						})}
					</Card>
				</div>
				<div className="col col-3">
					<Card className="p-4 bd-rs-2 d-flex ai-center jc-center">
						<QR
							id="Detail-Box-QR"
							title="Scan here"
							value={box.sign_code}
							className="d-flex jc-center"
						/>
						<div className="d-flex jc-center">
							<p className="p-xl ff-1-bd ta-center mt-3">{box.id}</p>
						</div>
					</Card>
				</div>
			</PageWrapper>
		</>
	);
};

export default BoxPageDetail;
