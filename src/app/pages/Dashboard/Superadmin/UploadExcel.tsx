import React, { useEffect, useState } from "react";
import { Button, Col, Row, Container, Form } from "react-bootstrap";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { UploadFile } from "store/Types/DocumentTypes";
import {
	selectDocuemnts,
	selectFileUpload,
} from "store/Selector/DocumentSelector";
import { UploadDocument, downloadFileExcel } from "actions/DocumentAction";
import { downloadFile } from "api/documents";
import { saveAs } from "file-saver";

export function UploadExcel(props) {
	const dispatch = useDispatch();
	const file: UploadFile = useSelector(selectFileUpload);
	const documents = useSelector(selectDocuemnts);
	const onClickDownload = () => {
		saveAs("http://fleedy.id/wp-content/uploads/2022/04/documents.xlsx");
	};

	const FetchData = () => {
		dispatch(downloadFile);
	};

	useEffect(() => {
		FetchData();
	}, []);
	return (
		<>
			<Formik
				validationSchema={false}
				initialValues={file}
				enableReinitialize={true}
				onSubmit={async values => {
					try {
						const res = await UploadDocument(values);
						await dispatch(res);
						// setTimeout(function () {
						// 	window.location.reload();
						// }, 1000);
					} catch (e) {
						console.log("error");
						// setTimeout(function () {
						// 	window.location.reload();
						// }, 1000);
					}
				}}
			>
				{({
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					handleSubmit,
					isSubmitting,
				}) => (
					<Form onSubmit={handleSubmit} className="right mb-4">
						<Container className="d-flex jc-end">
							<Button
								onClick={onClickDownload}
								className="bg-success-6 mr-4"
								variant="success"
							>
								Download Template
							</Button>
							{/* <Button
								onClick={onClickDownload}
								className="bg-success-6 w-100"
								variant="success"
							>
								Download Template
							</Button> */}
							<Form.Group>
								{/* <Form.Control
									type="file"
									name="file"
									value={values.file}
									onChange={e => {
										handleChange(e);
									}}
								/> */}
								{/* <input type="file" /> */}
								<input
									id="file"
									name="file"
									type="file"
									value={values.file}
									onChange={e => {
										console.log("onchange", e);

										handleChange(e);
									}}
									className="form-control"
								/>
							</Form.Group>
							<Button
								type="submit"
								disabled={isSubmitting}
								className="bg-success-6 w-20 ml-4"
								variant="success"
							>
								Upload
							</Button>
						</Container>
					</Form>
				)}
			</Formik>
		</>
	);
}
