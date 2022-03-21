import React, { useEffect } from "react";
import { getBoxesList } from "actions/BoxActions";
import { useDispatch, useSelector } from "react-redux";
import { selectBoxes } from "store/Selector/BoxSelector";
import { Card } from "react-bootstrap";
import QR from "app/components/QRCode";
import { Pagination } from "app/components/Pagination";
import "./styles.css";

const PrintBoxPerPage = () => {
	const boxes = useSelector(selectBoxes);
	const BoxData = boxes?.Boxes;
	const dispatch = useDispatch();

	const FetchData = (page = 1) => {
		dispatch(getBoxesList(page));
	};

	useEffect(() => {
		FetchData();
	}, []);

	const Width = {
		width: "40mm",
		height: "20mm",
	};

	const title = {
		fontSize: "16px",
		lineHeight: "12px",
		marginBottom: "5px",
	};

	const content = {
		fontSize: "16px",
		lineHeight: "16px",
	};

	return (
		<>
			<div className="no-print">
				<Pagination
					pageCount={boxes.Meta.last_page}
					onPageChange={data => FetchData(data.selected + 1)}
				/>
			</div>
			<div>
				{BoxData?.map((item, index) => {
					return (
						<div style={{ marginBottom: 7.5, marginLeft: 10 }}>
							<div style={Width} className="d-flex ai-center jc-betwen">
								<Card className="pv-1 ph-1 d-flex ai-center jc-center fd-row col-6">
									<QR
										id="QR Box"
										title="Scan here"
										value={item.sign_code}
										className="d-flex jc-center"
									/>
								</Card>
								<div className="ml-6 col-6">
									<p style={title} className="ff-1-bd ta-center ">
										Box
									</p>
									{/* <p style={content} className="ff-1-bd ta-center">{item.custom_code_box} - {item.division.code}</p> */}
									<p style={content} className="ff-1-bd ta-center">
										{/* {item?.code_box || item?.custom_code_box} */}
										{item?.company?.code} - {item?.division?.code} -{" "}
										{item?.custom_code_box}
									</p>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default PrintBoxPerPage;
