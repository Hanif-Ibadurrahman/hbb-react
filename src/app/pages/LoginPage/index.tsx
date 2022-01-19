import { Form, Button } from "react-bootstrap";
import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Helmet } from "react-helmet-async";
import { useHistory } from "react-router-dom";
import LoginBg from "assets/images/login.jpg";
import { useDispatch, useSelector } from "react-redux";
import "./LoginPage.scoped.scss";
import { LoginInterfaceState } from "store/Types/LoginTypes";
import { selectLogin, selectLogins } from "store/Selector/LoginSelector";
import { Login } from "actions/LoginAction";

export function LoginPage() {
	let history = useHistory();
	const [active, setActive] = useState(false);

	// const LoginForm = () => {
	// 	return (
	// 		<form className="form-signin">
	// 			<h1 className="h3 mb-12 font-weight-normal tc-dark-contrast">
	// 				Sign In
	// 			</h1>
	// 			<div className="pos-r">
	// 				<Form.Group controlId="formHorizontalEmail" className="mb-3">
	// 					<Form.Control
	// 						type="email"
	// 						placeholder="Email"
	// 						id="email"
	// 						className="pv-3 ph-4 fc-white"
	// 					/>
	// 				</Form.Group>
	// 				<Form.Group controlId="formHorizontalPassword">
	// 					<Form.Control
	// 						type="password"
	// 						placeholder="Password"
	// 						id="password"
	// 						className="pv-3 ph-4"
	// 					/>
	// 				</Form.Group>
	// 			</div>
	// 			<div className="d-grid gap-2 mt-8 mb-6">
	// 				<Button variant="primary" className="pv-3 ph-4" onClick={onSubmit}>
	// 					Log In
	// 				</Button>
	// 			</div>
	// 			<div className="d-flex jc-center">
	// 				<span
	// 					className="cur-p tc-medium-tint hover:tc-light"
	// 					onClick={e => setActive(true)}
	// 				>
	// 					Lupa Password?
	// 				</span>
	// 			</div>
	// 		</form>
	// 	);
	// };

	const LoginForm = props => {
		// const [CodeBox, setCodeBox] = useState("");
		const login: LoginInterfaceState = useSelector(selectLogin);
		const dispatch = useDispatch();
		const validationSchema = Yup.object().shape({
			username: Yup.string().required("*Wajib diisi"),
			password: Yup.string().required("*Wajib diisi"),
		});

		return (
			<>
				<div>
					{" "}
					<Formik
						validationSchema={validationSchema}
						initialValues={login}
						enableReinitialize={true}
						onSubmit={async values => {
							try {
								console.log("data", values);
								let action = Login(values);
								// dispatch(loadingbarTurnOn)
								const res = await action;
								await dispatch(res);
								action.then(() => {
									history.push("/Dashboard/Superadmin");
									window.location.reload();
								});
							} catch (e) {
								console.log("ini error di depan");
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
							<Form onSubmit={handleSubmit}>
								<div className="form-signin">
									<h1 className="h3 mb-12 font-weight-normal tc-dark-contrast">
										Sign In
									</h1>
									<div className="pos-r">
										<Form.Group className="mb-3">
											<Form.Control
												type="text"
												name="username"
												placeholder="Username"
												value={values.username}
												onChange={e => {
													handleChange(e);
												}}
												onBlur={handleBlur}
											/>
											{touched.username && errors.username ? (
												<p className="tc-danger-5 pos-a p-sm">
													{errors.username}
												</p>
											) : null}
										</Form.Group>
										<Form.Group>
											<Form.Control
												type="password"
												name="password"
												placeholder="Password"
												value={values.password}
												onChange={e => {
													handleChange(e);
												}}
												onBlur={handleBlur}
											/>
											{touched.password && errors.password ? (
												<p className="tc-danger-5 pos-a p-sm">
													{errors.password}
												</p>
											) : null}
										</Form.Group>
									</div>
									<div className="d-grid gap-2 mt-8 mb-6">
										<Button
											type="submit"
											disabled={isSubmitting}
											variant="primary"
											className="pv-3 ph-4"
										>
											Submit
										</Button>{" "}
									</div>
									<div className="d-flex jc-center">
										<span
											className="cur-p tc-medium-tint hover:tc-light"
											onClick={e => setActive(true)}
										>
											Lupa Password?
										</span>
									</div>
								</div>
							</Form>
						)}
					</Formik>
				</div>
			</>
		);
	};

	const ForgotPasswordForm = () => {
		return (
			<form className="form-password">
				<h1 className="h4 mb-3 font-weight-normal tc-dark-contrast">
					Forgot Password
				</h1>
				<p className="max-w-100% op-50% tc-dark-contrast mb-10">
					Enter your given company email to receive your password change
					confirmation.
				</p>
				<div className="pos-r">
					<Form.Group controlId="formHorizontalEmail" className="mb-3">
						<Form.Control
							type="email"
							placeholder="Email"
							id="email"
							className="pv-3 ph-4"
						/>
					</Form.Group>
				</div>
				<div className="d-grid gap-2 mt-8 mb-6">
					<Button variant="primary" className="pv-3 ph-4">
						Send Email
					</Button>
				</div>
				<div className="d-flex jc-center">
					<span
						className="cur-p tc-medium-tint hover:tc-light"
						onClick={e => setActive(false)}
					>
						I remember my password
					</span>
				</div>
			</form>
		);
	};

	return (
		<>
			<Helmet>
				<title>Dox - Login</title>
				<meta
					name="description"
					content="A React Boilerplate application homepage"
				/>
			</Helmet>
			<div
				className="login-bg"
				style={{ backgroundImage: "url(" + LoginBg + ")" }}
			/>
			<div className="pos-r d-flex ai-center h-100vh zi-2">
				<div className="pos-r max-w-40% ml-a mr-a -mt-8 login-wrapper p-14 pb-10">
					<div
						className={
							"pos-r form-wrapper " + (active === true ? "active" : "nonactive")
						}
					>
						<LoginForm />
						<ForgotPasswordForm />
					</div>
				</div>
			</div>
		</>
	);
}
