import React, { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { PageWrapper } from "app/components/PageWrapper";
import Breadcrumb from "app/components/BreadCrumb";
import QR from "app/components/QRCode";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
	selectRequestBox,
	selectRequestBoxes,
} from "../../../../store/Selector/RequestBoxSelector";
import { getRequestBoxDetail } from "actions/RequestBoxAction";
import {
	RequestBoxInterfaceState,
	ApprovalInterfaceState,
} from "store/Types/RequestBoxTypes";
import moment from "moment";

const ApprovalPrint = ({ match }) => {
	const requestBox: RequestBoxInterfaceState = useSelector(selectRequestBox);
	let history = useHistory();

	const request_id = match.params.id;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getRequestBoxDetail(request_id));
	}, []);

	const Width = {
		width: "40mm",
		height: "20mm",
		marginTop: "-35px",
	};

	const font = {
		fontSize: "8px",
		lineHeight: "12px",
	};

	const qr = "box-" + requestBox.id;

	return (
		<>
			<PageWrapper className="row row w-100%">
				<div style={Width} className="d-flex ai-center jc-center ">
					<Card className="pv-1 ph-1 d-flex ai-center jc-center fd-row col-6">
						<QR
							id="Detail-Box-QR"
							title="Scan here"
							value="CAB-a7ce06df-3431-4cf3-abff-a80326750287"
							className="d-flex jc-center"
						/>
					</Card>
					<div className="ml-2 col-6">
						<p style={font} className="ff-1-bd ta-center ">
							Cabinet
						</p>
						<p style={font} className="ff-1-bd ta-center">
							a7ce06df-3431-4cf3-abff-a80326750287
						</p>
					</div>
				</div>
			</PageWrapper>
		</>
	);
};

export default ApprovalPrint;
