import React, { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { PageWrapper } from "app/components/PageWrapper";
import Breadcrumb from "app/components/BreadCrumb";
import QR from "app/components/QRCode";
import "../master.scoped.scss";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getRoomDetail } from "actions/RoomAction";
import { selectRooms, selectRoom } from "store/Selector/RoomSelector";
import { RoomInterfaceState } from "store/Types/RoomTypes";
// import { getAreasList } from "actions/AreaActions";
import { selectArea } from "store/Selector/AreaSelector";
import { AreaInterfaceState } from "store/Types/AreaTypes";
import { getAreasList } from "actions/AreaActions";

const RoomPageDetail = ({ match }) => {
	const room: RoomInterfaceState = useSelector(selectRoom);
	const area: AreaInterfaceState = useSelector(selectArea);
	let history = useHistory();

	const goToPreviousPath = e => {
		e.preventDefault();
		history.goBack();
	};

	const room_id = match.params.id;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getRoomDetail(room_id));
	}, []);

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
								<Form.Label>Nama Ruangan</Form.Label>
								<Form.Control type="text" disabled defaultValue={room.name} />
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Kode Ruangan</Form.Label>

								<Form.Control
									type="text"
									disabled
									defaultValue={room.code_room}
								/>
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
							<p className="p-xl ff-1-bd ta-center mt-3">{room.code_room}</p>
						</div>
					</Card>
				</div>
			</PageWrapper>
		</>
	);
};

export default RoomPageDetail;
