import React, { useEffect } from "react";
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
	const requestItems = requestBox.request_items ?? [];

	const goToPreviousPath = e => {
		e.preventDefault();
		history.goBack();
	};

	const request_id = match.params.id;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getRequestBoxDetail(request_id));
	}, []);

	const delivered_at = moment(requestBox.delivered_at).format("MM/DD/YYYY");

	return (
		<>
			<PageWrapper className="row w-100%">
				<Breadcrumb
					crumbs={["Dashboard", "Request", "Detail"]}
					selected
					className="mb-4"
				/>
				<div className="col col-9">
					<Card className="ph-5 pv-3 bd-rs-2">
						<Form className="mt-3">
							<Form.Group className="mb-4" controlId="formBasicEmail">
								<Form.Label>Nama Customer</Form.Label>
								<Form.Control
									type="text"
									value={requestBox.customer.name}
									disabled
								/>
							</Form.Group>
							<Form.Group className="mb-4" controlId="formBasicEmail">
								<Form.Label>Nama Perusahaan</Form.Label>
								<Form.Control
									type="text"
									value={requestBox.customer.company.name}
									disabled
								/>
							</Form.Group>
							<Form.Group className="mb-4" controlId="formBasicEmail">
								<Form.Label>Quantity</Form.Label>
								<Form.Control
									type="text"
									disabled
									defaultValue={requestBox.quantity}
								/>
							</Form.Group>
							<Form.Group className="mb-4" controlId="formBasicEmail">
								<Form.Label>Tanggal Kirim</Form.Label>
								<Form.Control type="text" value={delivered_at} disabled />
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
					<Card className="ph-5 pv-3 bd-rs-2 mt-3">
						<h6 className="mb-4 mt-4">Box List</h6>
						{requestItems.map((item, index) => {
							return (
								<div>
									<p className="mb-1 p-lg">Box {index + 1}</p>
									<div className="w-50% bg-dark h-2px mb-4" />
									<div className="row mb-4">
										<div className="col-6">
											<Form.Group>
												<Form.Label>Kode Box</Form.Label>
												<Form.Control
													type="text"
													disabled
													defaultValue={item?.box?.code_box}
												/>
											</Form.Group>
											<Form.Group className="mt-2">
												<Form.Label>Status</Form.Label>
												<Form.Control
													type="text"
													disabled
													defaultValue={item?.status}
												/>
											</Form.Group>
										</div>
										<div className="col-6 d-flex jc-center ai-center">
											<QR
												id="QR Box"
												title="Scan here"
												value={item?.box !== null ? item?.box?.sign_code : "-"}
												className="d-flex jc-center"
											/>
										</div>
									</div>
								</div>
							);
						})}
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
											<p>
												{moment(item.time).format(
													"dddd, MMMM Do YYYY, h:mm:ss a",
												)}
											</p>
										</div>
									</div>
								);
							})}
						</div>
					</Card>
				</div>
			</PageWrapper>
		</>
	);
};

export default ApprovalAdminDetail;
