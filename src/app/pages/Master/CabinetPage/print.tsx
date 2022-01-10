import React, { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { PageWrapper } from "app/components/PageWrapper";
import Breadcrumb from "app/components/BreadCrumb";
import QR from "app/components/QRCode";
import "../master.scoped.scss";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCabinetDetail } from "actions/CabinetAction";
import { selectCabinets, selectCabinet } from "store/Selector/CabinetSelector";
import { CabinetInterfaceState } from "store/Types/CabinetTypes";

const PrintCabinet = ({ match }) => {
	const cabinet: CabinetInterfaceState = useSelector(selectCabinet);
	let history = useHistory();

	const cabinet_id = match.params.id;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCabinetDetail(cabinet_id));
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

	return (
		<>
			<PageWrapper className="row row w-100%">
				<div style={Width} className="d-flex ai-center jc-center ">
					<Card className="pv-1 ph-1 d-flex ai-center jc-center fd-row col-6">
						<QR
							id="Detail-Box-QR"
							title="Scan here"
							value={cabinet.code_cabinet}
							className="d-flex jc-center"
						/>
					</Card>
					<div className="ml-2 col-6">
						<p style={font} className="ff-1-bd ta-center ">
							Lemari
						</p>
						<p style={font} className="ff-1-bd ta-center">
							{cabinet.code_cabinet}
						</p>
					</div>
				</div>
			</PageWrapper>
		</>
	);
};

export default PrintCabinet;
