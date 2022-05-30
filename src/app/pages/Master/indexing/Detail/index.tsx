import React, { useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { PageWrapper } from "app/components/PageWrapper";
import Breadcrumb from "app/components/BreadCrumb";
import "../../master.scoped.scss";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IndexingInterfaceState } from "store/Types/IndexingTypes";
import { selectindexing } from "store/Selector/IndexingSelector";
import { getIndexingDetail } from "actions/IndexingAction";
import TableIndexingPage from "./Table";

const IndexingPageDetail = ({ match }) => {
	const indexing: IndexingInterfaceState = useSelector(selectindexing);
	let history = useHistory();

	const goToPreviousPath = e => {
		e.preventDefault();
		history.goBack();
	};

	const indexing_id = match.params.id;

	console.log("values >>>", indexing);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getIndexingDetail(indexing_id));
	}, []);

	return (
		<>
			<PageWrapper className="w-100%">
				<Breadcrumb
					crumbs={["Dashboard", "Indexing", "Detail"]}
					selected
					className="mb-4"
				/>
				<div className="col col-9">
					<Card className="ph-5 pv-3 bd-rs-2">
						<Form className="mt-3">
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Title Indexing</Form.Label>
								<Form.Control
									type="text"
									disabled
									defaultValue={indexing.index}
								/>
							</Form.Group>
							{/* <Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Klasifikasi</Form.Label>
								<Form.Control
									type="text"
									disabled
									defaultValue={indexing.classification_code}
								/>
							</Form.Group> */}
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Tipe</Form.Label>
								<Form.Control
									type="text"
									disabled
									defaultValue={indexing.type}
								/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Periode Retensi</Form.Label>
								<Form.Control
									type="text"
									disabled
									defaultValue={indexing.retention_period}
								/>
							</Form.Group>
							<Form.Group>
								<h6>List Document</h6>
								{indexing.documents.map((data, index) => (
									<>
										<div className="d-flex ai-center mt-4 mb-2">
											<div className="col-2">No Document {index + 1}</div>
											<div className="col-10">
												<Form.Control type="text" value={data.no} readOnly />
											</div>
										</div>
									</>
								))}
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
				<div className="col col-12">
					<div className="mt-4 card">
						<TableIndexingPage />
					</div>
				</div>
			</PageWrapper>
		</>
	);
};

export default IndexingPageDetail;
