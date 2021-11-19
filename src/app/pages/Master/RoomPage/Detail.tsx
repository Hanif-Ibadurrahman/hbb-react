import React, { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { PageWrapper } from "app/components/PageWrapper";
import Breadcrumb from "app/components/BreadCrumb";
import QR from "app/components/QRCode";
import "../master.scoped.scss";
import api from "../../../../api/dox";
import PaginatedAreaResponse from "app/pages/Interface/area";
import { useHistory } from "react-router-dom";
import { getRoomDetail } from "actions/RoomAction";
import { connect, useDispatch } from "react-redux";

const mapStateToProps = state => {
	return {
		RoomDetail: state.rooms.RoomDetail,
		errorUserDetail: state.rooms.errorRoomDetail,
	};
};

const RoomPageDetail = props => {
	let history = useHistory();

	const goToPreviousPath = e => {
		e.preventDefault();
		history.goBack();
	};

	const room_id = props.match.params.id;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getRoomDetail(room_id));
	}, []);
	console.log(props.RoomDetail);

	return (
		<>
			<PageWrapper className="row w-100%">
				<Breadcrumb
					crumbs={["Dashboard", "Room", "Detail"]}
					selected
					className="mb-4"
				/>
				<div className="col col-9">
					<Card className="ph-5 pv-3 bd-rs-2">
						<Form className="mt-3">
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Kode Ruangan</Form.Label>
								<Form.Control
									type="text"
									disabled
									defaultValue={props.RoomDetail.code_room}
								/>
							</Form.Group>
							<div className="d-flex jc-end">
								<Button
									className="mv-4 mr-4"
									variant="outline-secondary"
									onClick={goToPreviousPath}
								>
									Kembali
								</Button>{" "}
								<Button
									className="bg-success-6 mv-4 d-flex ai-center"
									variant="success"
								>
									<i className="far fa-edit mr-2 p-md"></i>
									<span className="text p-md">Edit Data</span>
								</Button>{" "}
							</div>
						</Form>
					</Card>
				</div>
				<div className="col col-3">
					<Card className="p-4 bd-rs-2 d-flex ai-center jc-center">
						<QR
							id="Detail-Box-QR"
							title="Scan here"
							value="ID : A12O2O3"
							className="d-flex jc-center"
						/>
						<div className="d-flex jc-center">
							<p className="p-xl ff-1-bd ta-center mt-3">
								{props.RoomDetail.code_room}
							</p>
						</div>
					</Card>
				</div>
			</PageWrapper>
		</>
	);
};

export default connect(mapStateToProps, null)(RoomPageDetail);
