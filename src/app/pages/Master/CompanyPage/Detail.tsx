import React, { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { PageWrapper } from "app/components/PageWrapper";
import Breadcrumb from "app/components/BreadCrumb";
import QR from "app/components/QRCode";
import "../master.scoped.scss";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCompanyDetail } from "actions/CompanyAction";
import { selectCompanys, selectCompany } from "store/Selector/CompanySelector";
import { CompanyInterfaceState } from "store/Types/CompanyTypes";

const CompanyPageDetail = ({ match }) => {
	const Companys: CompanyInterfaceState = useSelector(selectCompany);
	let history = useHistory();

	const goToPreviousPath = e => {
		e.preventDefault();
		history.goBack();
	};

	const Companys_id = match.params.id;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCompanyDetail(Companys_id));
	}, []);

	return (
		<>
			<PageWrapper className="row w-100%">
				<Breadcrumb
					crumbs={["Dashboard", "Company", "Detail"]}
					selected
					className="mb-4"
				/>
				<div className="col col-9">
					<Card className="ph-5 pv-3 bd-rs-2">
						<Form className="mt-3">
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Name Company</Form.Label>
								<Form.Control
									type="text"
									disabled
									defaultValue={Companys.CodeName}
								/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Location</Form.Label>
								<Form.Control
									type="text"
									disabled
									defaultValue={Companys.CodeLocation}
								/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Latitude</Form.Label>
								<Form.Control
									type="number"
									disabled
									defaultValue={Companys.CodeLatitude}
								/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Longitude</Form.Label>
								<Form.Control
									type="number"
									disabled
									defaultValue={Companys.CodeLongitude}
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
							id="Detail-Company-QR"
							title="Scan here"
							value="ID : A12O2O3"
							className="d-flex jc-center"
						/>
						<div className="d-flex jc-center">
							<p className="p-xl ff-1-bd ta-center mt-3">{Companys.CodeName}</p>
						</div>
					</Card>
				</div>
			</PageWrapper>
		</>
	);
};

export default CompanyPageDetail;
