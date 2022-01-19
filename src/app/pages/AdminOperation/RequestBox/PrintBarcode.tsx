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
	const requestItems = requestBox.request_items ?? [];

	const request_id = match.params.id;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getRequestBoxDetail(request_id));
	}, []);

	const Width = {
		width: "40mm",
		height: "20mm",
		marginTop: "-25px",
	};

	const font = {
		fontSize: "8px",
		lineHeight: "12px",
	};

	const qr = "box-" + requestBox.id;

	return (
		<>
			{requestItems.map((item, index) => {
				return (
					<PageWrapper className="row row w-100%">
						<div style={Width} className="d-flex ai-center jc-center">
							<Card className="pv-1 ph-1 d-flex ai-center jc-center fd-row col-6">
								<QR
									id="QR Box"
									title="Scan here"
									value={item.box.sign_code}
									className="d-flex jc-center"
								/>
							</Card>
							<div className="ml-2 col-6">
								<p style={font} className="ff-1-bd ta-center ">
									Box {index + 1}
								</p>
								<p style={font} className="ff-1-bd ta-center">
									{item.box.code_box}
								</p>
							</div>
						</div>
					</PageWrapper>
				)
			})}
		</>
	);
};

export default ApprovalPrint;
