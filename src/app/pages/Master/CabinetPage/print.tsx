import React, { useEffect } from "react";
import {  Card } from "react-bootstrap";
import QR from "app/components/QRCode";
import "../master.scoped.scss";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCabinetDetail } from "actions/CabinetAction";
import { selectCabinets, selectCabinet } from "store/Selector/CabinetSelector";
import { CabinetInterfaceState } from "store/Types/CabinetTypes";

const PrintCabinet = ({ match }) => {
	const cabinet: CabinetInterfaceState = useSelector(selectCabinet);
	const cabinetSlot = cabinet.cabinet_slots ?? []
	let history = useHistory();

	const cabinet_id = match.params.id;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCabinetDetail(cabinet_id));
	}, []);

	const Width = {
		width: "40mm",
		height: "20mm",
	};

	const font = {
		fontSize: "8px",
		lineHeight: "12px",
	};

	return (
		<>
			<div style={{ marginBottom: 7, marginLeft: 10 }}>
				<div style={Width} className="d-flex ai-center jc-center">
					<Card className="pv-1 ph-1 d-flex ai-center jc-center fd-row col-6">
						<QR
							id="QR Box"
							title="Scan here"
							value={cabinet.sign_code}
							className="d-flex jc-center"
						/>
					</Card>
					<div className="ml-2 col-6">
						<p style={font} className="ff-1-bd ta-center ">
							Cabinet
						</p>
						<p style={font} className="ff-1-bd ta-center">
							{cabinet.id}
						</p>
					</div>
				</div>
			</div>
			{cabinetSlot.map((item, index) => {
				return (
					<div style={{ marginBottom: 7.5, marginLeft: 10 }}>
						<div style={Width} className="d-flex ai-center jc-center">
							<Card className="pv-1 ph-1 d-flex ai-center jc-center fd-row col-6">
								<QR
									id="QR Box"
									title="Scan here"
									value={item.sign_code}
									className="d-flex jc-center"
								/>
							</Card>
							<div className="ml-2 col-6">
								<p style={font} className="ff-1-bd ta-center ">
									Cabinet Slot {index + 1}
								</p>
								<p style={font} className="ff-1-bd ta-center">
									{item.code}
								</p>
							</div>
						</div>
					</div>
				)
			})}
		</>
	);
};

export default PrintCabinet;
