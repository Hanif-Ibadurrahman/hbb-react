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
import Logo from "assets/images/logo.png";

const PrintBox = ({ match }) => {
	const box: BoxInterfaceState = useSelector(selectBox);

	const box_id = match.params.id;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getBoxDetail(box_id));
	}, []);

	return (
		<>
			<PageWrapper className="row row w-100%">
				<div className="h-24 d-flex ai-center mb-12">
					<img src={Logo} alt="Logo" className="h-24" />
				</div>
				<div style={{ maxWidth: 300 }}>
					<Card className="p-4 bd-rs-2 d-flex ai-center jc-center">
						<QR
							id="Detail-Box-QR"
							title="Scan here"
							value="ID : A12O2O3"
							className="d-flex jc-center"
						/>
						<div className="d-flex jc-center">
							<p className="p-xl ff-1-bd ta-center mt-3">{box.CodeBox}</p>
						</div>
					</Card>
					{/* <div className="d-flex jc-end">
						<Button
							className="mv-4 w-100%"
							variant="success"
						>
							Print
						</Button>{" "}
					</div> */}
				</div>
			</PageWrapper>
		</>
	);
};

export default PrintBox;
