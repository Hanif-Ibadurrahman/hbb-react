import React, { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { PageWrapper } from "app/components/PageWrapper";
import Breadcrumb from "app/components/BreadCrumb";
import "../master.scoped.scss";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CustomerInterfaceState } from "store/Types/CustomerTypes";
import { selectCustomer } from "store/Selector/CustomerSelector";
import { getCustomerDetail } from "actions/CustomerAction";

const CustomerPageDetail = ({ match }) => {
	const Customer: CustomerInterfaceState = useSelector(selectCustomer);
	let history = useHistory();

	const goToPreviousPath = e => {
		e.preventDefault();
		history.goBack();
	};

	const customer_id = match.params.id;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCustomerDetail(customer_id));
	}, []);

	return (
		<>
			<PageWrapper className="row w-100%">
				<Breadcrumb
					crumbs={["Dashboard", "Division", "Detail"]}
					selected
					className="mb-4"
				/>
				<div className="col col-9">
					<Card className="ph-5 pv-3 bd-rs-2">
						<Form className="mt-3">
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Username</Form.Label>
								<Form.Control
									type="text"
									disabled
									defaultValue={Customer.username}
								/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Nama</Form.Label>
								<Form.Control
									type="text"
									disabled
									defaultValue={Customer.name}
								/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Email</Form.Label>
								<Form.Control
									type="text"
									disabled
									defaultValue={Customer.email}
								/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>No. Hp</Form.Label>
								<Form.Control
									type="text"
									disabled
									defaultValue={Customer.phone}
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
			</PageWrapper>
		</>
	);
};

export default CustomerPageDetail;
