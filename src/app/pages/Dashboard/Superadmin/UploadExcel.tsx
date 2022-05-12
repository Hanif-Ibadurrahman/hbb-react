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
import { downloadFile, uploadFile } from "api/documents";
import { saveAs } from "file-saver";

export function UploadExcel(props) {
	const dispatch = useDispatch();
	// const file: UploadFile = useSelector(selectFileUpload);
	const documents = useSelector(selectDocuemnts);
	const onClickDownload = () => {
		saveAs("http://fleedy.id/wp-content/uploads/2022/04/documents.xlsx");
	};
	const [fileUpload, setFileUpload] = useState();

	const FetchData = () => {
		dispatch(downloadFile);
	};

	function onChangeFile(event: any) {
		setFileUpload(event.currentTarget.files[0]);
	}

	useEffect(() => {
		FetchData();
	}, []);
	return (
		<>
			<Formik
				validationSchema={false}
				initialValues={{}}
				enableReinitialize={true}
				onSubmit={async (values: any) => {
					try {
						const res = await uploadFile(fileUpload);
						if (res.status === 200) {
							alert("Upload Sukses");
						} else {
							alert("Upload Gagal, File yang di upload tidak sesuai");
							console.log(res.body);
						}
					} catch (err) {
						alert("Upload Gagal");
						console.log(err);
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
							<Form.Group>
								<input
									id="file"
									name="file"
									type="file"
									onChange={e => {
										console.log("onchange", e);
										onChangeFile(e);
									}}
									accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
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
