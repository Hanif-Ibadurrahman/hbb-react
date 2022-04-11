import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import QR from "app/components/QRCode";
import { useSelector, useDispatch } from "react-redux";
import { selectRequestBox } from "../../../../store/Selector/RequestBoxSelector";
import { getRequestBoxDetail } from "actions/RequestBoxAction";
import { RequestBoxInterfaceState } from "store/Types/RequestBoxTypes";

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
	};

	const font = {
		fontSize: "8px",
		lineHeight: "12px",
	};

	return (
		<div>
			{requestItems.map((item, index) => {
				return (
					<div style={{ marginBottom: 7, marginLeft: 10 }}>
						<div style={Width} className="d-flex ai-center jc-center">
							<Card className="pv-1 ph-1 d-flex ai-center jc-center fd-row col-6">
								<QR
									id="QR Box"
									title="Scan here"
									value={item?.box?.sign_code || "-"}
									className="d-flex jc-center"
								/>
							</Card>
							<div className="ml-2 col-6">
								<p style={font} className="ff-1-bd ta-center ">
									Box {index + 1}
								</p>
								<p style={font} className="ff-1-bd ta-center">
									{item?.box?.code_box || "-"}
								</p>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default ApprovalPrint;
