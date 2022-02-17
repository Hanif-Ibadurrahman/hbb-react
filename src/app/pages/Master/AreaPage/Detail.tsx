import React, { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { PageWrapper } from "app/components/PageWrapper";
import Breadcrumb from "app/components/BreadCrumb";
import QR from "app/components/QRCode";
import "../master.scoped.scss";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAreaDetail } from "actions/AreaActions";
import { selectAreas, selectArea } from "store/Selector/AreaSelector";
import { AreaInterfaceState } from "store/Types/AreaTypes";

const AreaPageDetail = ({ match }) => {
	const area: AreaInterfaceState = useSelector(selectArea);
	let history = useHistory();

	const goToPreviousPath = e => {
		e.preventDefault();
		history.goBack();
	};

	const area_id = match.params.id;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAreaDetail(area_id));
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
								<Form.Label>Nama Area</Form.Label>
								<Form.Control type="text" disabled defaultValue={area.name} />
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Kode Area</Form.Label>
								<Form.Control
									type="text"
									disabled
									defaultValue={area.code_area}
								/>
							</Form.Group>
							<div className="d-flex jc-end">
								<Button
									className="mv-4 mr-4"
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
							value="ID : A12O2O3"
							className="d-flex jc-center"
						/>
						<div className="d-flex jc-center">
							<p className="p-xl ff-1-bd ta-center mt-3">{area.id}</p>
						</div>
					</Card>
				</div>
			</PageWrapper>
		</>
	);
};

export default AreaPageDetail;
