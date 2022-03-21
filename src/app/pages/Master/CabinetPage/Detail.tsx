import React, { useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { PageWrapper } from "app/components/PageWrapper";
import Breadcrumb from "app/components/BreadCrumb";
import QR from "app/components/QRCode";
import "../master.scoped.scss";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCabinetDetail } from "actions/CabinetAction";
import { selectCabinet } from "store/Selector/CabinetSelector";
import { CabinetInterfaceState } from "store/Types/CabinetTypes";

const CabinetPageDetail = ({ match }) => {
	const cabinet: CabinetInterfaceState = useSelector(selectCabinet);
	const cabinetSlot = cabinet.cabinet_slots ?? [];
	let history = useHistory();

	const goToPreviousPath = e => {
		e.preventDefault();
		history.goBack();
	};

	const cabinet_id = match.params.id;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCabinetDetail(cabinet_id));
	}, []);

	console.log("test", cabinet.total_bays);

	return (
		<>
			<PageWrapper className="row w-100%">
				<Breadcrumb
					crumbs={["Dashboard", "Cabinet", "Detail"]}
					selected
					className="mb-4"
				/>
				<div className="col col-9">
					<Card className="ph-5 pv-3 bd-rs-2">
						<Form className="mt-3">
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Code Cabinet</Form.Label>
								<Form.Control
									type="text"
									disabled
									defaultValue={cabinet.code_cabinet}
								/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Total Bays</Form.Label>
								<Form.Control
									type="text"
									disabled
									defaultValue={cabinet.total_bays}
								/>
							</Form.Group>

							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Ruangan</Form.Label>
								<Form.Control
									type="text"
									disabled
									defaultValue={cabinet.room.area.code_area}
								></Form.Control>
							</Form.Group>
							<div className="d-flex jc-end">
								<Button
									className="mv-4 mr-4"
									variant="outline-secondary"
									onClick={goToPreviousPath}
								>
									Kembali
								</Button>{" "}
							</div>
						</Form>
					</Card>
					<Card className="ph-5 pv-3 bd-rs-2 mt-3">
						<h6 className="mb-4 mt-4">Cabinet Slot</h6>
						{cabinetSlot.map((item, index) => {
							return (
								<div>
									<p className="mb-1 p-lg">Slot {index + 1}</p>
									<div className="w-50% bg-dark h-2px mb-4" />
									<div className="row mb-4">
										<div className="col-6">
											<Form.Group>
												<Form.Label>Nama Cabinet Slot</Form.Label>
												<Form.Control
													type="text"
													disabled
													defaultValue={item.name}
												/>
											</Form.Group>
											<Form.Group className="mt-2">
												<Form.Label>Kode Cabinet Slot</Form.Label>
												<Form.Control
													type="text"
													disabled
													defaultValue={item.code}
												/>
											</Form.Group>
											<Form.Group className="mt-2">
												<Form.Label>Kapasitas</Form.Label>
												<Form.Control
													type="text"
													disabled
													defaultValue={item.capacity}
												/>
											</Form.Group>
										</div>
										<div className="col-6 d-flex jc-center ai-center">
											<QR
												id="QR Box"
												title="Scan here"
												value={item.sign_code}
												className="d-flex jc-center"
											/>
										</div>
									</div>
								</div>
							);
						})}
					</Card>
				</div>
				<div className="col col-3">
					<Card className="p-4 bd-rs-2 d-flex ai-center jc-center">
						<QR
							id="Cabinet-QR"
							title="Scan here"
							value={cabinet.sign_code}
							className="d-flex jc-center"
						/>
						<div className="d-flex jc-center">
							<p className="p-xl ff-1-bd ta-center mt-3">{cabinet.id}</p>
						</div>
					</Card>
				</div>
			</PageWrapper>
		</>
	);
};

export default CabinetPageDetail;
