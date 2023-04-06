import { loginAction } from "actions/loginAction";
import { Form, Input, Modal } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const modalAlert = () => {
		Modal.error({
			title: "Telah terjadi kesalahan pada saat login",
			content: "Mohon di cek kembali username atau password yang dimasukkan",
		});
	};

	const onFinish = async (values: any) => {
		try {
			await dispatch(loginAction(values));
			navigate("/", { replace: true });
		} catch (error) {
			modalAlert();
		}
	};

	return (
		<div className="theme-primary">
			<div className="container h-p100">
				<div className="row align-items-center justify-content-md-center h-p100">
					<div className="col-12">
						<div className="row justify-content-center g-10">
							<div className="col-lg-5 col-md-5 col-12">
								<div className="bg-white rounded10">
									<div className="content-top-agile p-20 pb-0">
										<h2 className="text-primary">Let's Get Started</h2>
										<p className="mb-0">
											Sign in to continue to HBB Application.
										</p>
									</div>
									<div className="p-40">
										<Form onFinish={onFinish} autoComplete="off">
											<Form.Item
												name="username"
												rules={[
													{
														required: true,
														message: "Please input your username!",
													},
												]}
											>
												<div className="form-group">
													<div className="input-group mb-3">
														<span className="input-group-text bg-transparent">
															<i className="ti-user"></i>
														</span>
														<Input
															type="text"
															className="form-control ps-15 bg-transparent"
															placeholder="Username"
														/>
													</div>
												</div>
											</Form.Item>
											<Form.Item
												name="password"
												rules={[
													{
														required: true,
														message: "Please input your password!",
													},
												]}
											>
												<div className="form-group">
													<div className="input-group mb-3">
														<span className="input-group-text  bg-transparent">
															<i className="ti-lock"></i>
														</span>
														<Input.Password
															type="password"
															className="form-control ps-15 bg-transparent"
															placeholder="Password"
															style={{ display: "inherit" }}
														/>
													</div>
												</div>
											</Form.Item>
											<div className="row">
												<div className="col-6">
													<a href="/login" className="text-warning ms-3">
														Don't have an account?
													</a>
												</div>
												<div className="col-6">
													<div className="fog-pwd text-end">
														<a href="/login" className="hover-warning">
															<i className="ion ion-locked"></i> Forgot
															password?
														</a>
														<br />
													</div>
												</div>
												<div className="col-12 text-center">
													<button
														type="submit"
														className="btn btn-danger mt-10"
													>
														SIGN IN
													</button>
												</div>
											</div>
										</Form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
