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
import { height, width } from "@mui/system";
import { size } from "lodash";

const PrintBox = ({ match }) => {
	const box: BoxInterfaceState = useSelector(selectBox);

	const box_id = match.params.id;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getBoxDetail(box_id));
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

	console.log("QR CODE >>", box.SignCode);


	return (
		<>
			<PageWrapper className="row row w-100%">
				<div style={Width} className="d-flex ai-center jc-center ">
					<Card className="pv-1 ph-1 d-flex ai-center jc-center fd-row col-6">
						<QR
							id="Detail-Box-QR"
							title="Scan here"
							value={box.SignCode}
							className="d-flex jc-center"
						/>
					</Card>
					<div className="ml-2 col-6">
						<p style={font} className="ff-1-bd ta-center ">
							Box
						</p>
						<p style={font} className="ff-1-bd ta-center">
							{box.CodeBox}
						</p>
					</div>
				</div>
			</PageWrapper>
		</>
	);
};

export default PrintBox;
