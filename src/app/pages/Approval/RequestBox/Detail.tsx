import React, { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { PageWrapper } from "app/components/PageWrapper";
import Breadcrumb from "app/components/BreadCrumb";
import QR from "app/components/QRCode";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectRequestBox } from "../../../../store/Selector/RequestBoxSelector";
import { getRequestBoxDetail } from "actions/RequestBoxAction";
import { RequestBoxInterfaceState } from "store/Types/RequestBoxTypes";
import moment from "moment";

const ApprovalAdminDetail = ({ match }) => {
	const requestBox: RequestBoxInterfaceState = useSelector(selectRequestBox);
	const requestLogs = requestBox.request_logs ?? [];
	let history = useHistory();

	const goToPreviousPath = e => {
		e.preventDefault();
		history.goBack();
	};

	const request_id = match.params.id;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getRequestBoxDetail(request_id));
	}, []);

	const formatDate = date => moment(date ?? "").format("d MMMM YYYY - hh:mm");

	return (
		<>
			<PageWrapper className="row w-100%">
				<Breadcrumb
					crumbs={["Dashboard", "Box", "Detail"]}
					selected
					className="mb-4"
				/>
				<div className="col col-9">
					<Card className="ph-5 pv-3 bd-rs-2">
						<Form className="mt-3">
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Quantity</Form.Label>
								<Form.Control
									type="text"
									disabled
									defaultValue={requestBox.quantity}
								/>
							</Form.Group>
							<Form.Group className="mb-4" controlId="formBasicEmail">
								<Form.Label>Tanggal Kirim</Form.Label>
								<Form.Control
									type="text"
									value={formatDate(requestBox.delivered_at)}
									disabled
								/>
							</Form.Group>
							<Form.Group className="mb-4" controlId="formBasicEmail">
								<Form.Label>Note</Form.Label>
								<Form.Control as="textarea" value={requestBox.note} disabled />
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
					<Card className="ph-5 pt-7 pb-4 mt-3 bd-rs-2">
						<h6 className="mb-3">Timeline </h6>
						<div className="timeline-wrapper w-100%">
							{requestLogs.map((item, index) => {
								return (
									<div
										key={index}
										className={`${
											index != requestLogs.length - 1 ? "mb-3" : ""
										} row ai-center timeline-item w-100% ml-0 mr-0`}
									>
										{/* {`${index + " != " + (requestLogs.length - 1)}`} */}
										{/* <p key={index}>{item.status}</p> */}
										<span className="timeline-indicator d-flex ai-center jc-center">
											<span
												className={`timeline-icon d-flex ai-center jc-center icon-${item.status}`}
											>
												<i className="fas"></i>
											</span>
										</span>

										<div
											className={`f-1 ph-4 pv-2 bg-light-shade bd-rs-2 status-${item.status}`}
										>
											<p className="txtf-c ff-1-bd">
												{item.status != null
													? item.status.split("-").map((item, index) => {
															const turnToUppercase = word => {
																if (word === "csr" || word === "rc")
																	return word.toUpperCase();
																else return word;
															};

															return (
																<>
																	{index != 0
																		? " " + turnToUppercase(item)
																		: turnToUppercase(item)}
																</>
															);
													  })
													: item.status}
											</p>
											<p>{formatDate(item.time)}</p>
										</div>
									</div>
								);
							})}
						</div>
					</Card>
				</div>
				<div className="col col-3">
					<Card className="p-4 bd-rs-2 d-flex ai-center jc-center">
						<QR
							id="Detail-Box-QR"
							title="Scan here"
							value="box-b29b0931-46b5-4326-9752-ecf1e855f711"
							className="d-flex jc-center"
						/>
						<div className="d-flex jc-center">
							<p className="p-xl ff-1-bd ta-center mt-3">Box 2</p>
						</div>
					</Card>
				</div>
			</PageWrapper>
		</>
	);
};

export default ApprovalAdminDetail;
