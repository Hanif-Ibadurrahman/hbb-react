import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Alert from "app/components/Alerts";
import { selectDocuemnts } from "store/Selector/DocumentSelector";
import { downloadFile, uploadFile } from "api/documents";
import { saveAs } from "file-saver";
import { getFileDatabase } from "api/downloadDatabase";
import { getTemplateUpload } from "api/downloadDatabase";

export function UploadExcel(props) {
	const [showAlertSuccess, setShowAlertSuccess] = useState(false);
	const [showAlertFailed, setShowAlertFailed] = useState(false);
	const dispatch = useDispatch();
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
			<Alert
				text="Upload Sukses"
				variant="success"
				show={showAlertSuccess}
				style={{
					top: 50,
					position: "fixed",
					left: "50%",
					transform: [{ translateX: "-50%" }],
				}}
				onHide={() => setShowAlertSuccess(false)}
			/>
			<Alert
				text="Upload Gagal, File yang di upload tidak sesuai"
				variant="danger"
				show={showAlertFailed}
				style={{
					top: 50,
					position: "fixed",
					left: "50%",
					transform: [{ translateX: "-50%" }],
				}}
				onHide={() => setShowAlertFailed(false)}
			/>
			<Formik
				validationSchema={false}
				initialValues={{}}
				enableReinitialize={true}
				onSubmit={async (values: any) => {
					try {
						const res = await uploadFile(fileUpload);
						if (res.status === 200) {
							setShowAlertSuccess(true);
							setTimeout(() => {
								setShowAlertSuccess(false);
							}, 1500);
							setTimeout(() => {
								window.location.reload();
							}, 2000);
							// setValueUpload("");
						} else {
							setShowAlertFailed(true);
							setTimeout(() => {
								setShowAlertFailed(false);
							}, 2000);
							console.log(res.body);
						}
					} catch (err) {
						setShowAlertFailed(true);
						setTimeout(() => {
							setShowAlertFailed(false);
						}, 2000);
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
							<Button onClick={getFileDatabase} className="mr-4">
								Download Database
							</Button>
							<Button
								onClick={getTemplateUpload}
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
