import { loginAction } from "actions/loginAction";
import { Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import BackgroundImage from "assets/image/background.jpg";
import { useEffect } from "react";

const Login = () => {
	const token = sessionStorage.getItem("Token");
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (token) {
			navigate("/", { replace: true });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onFinish = async (values: any) => {
		try {
			await dispatch(loginAction(values));
			window.location.href = "/";
		} catch (error) {
			Swal.fire({
				icon: "error",
				title: "Opps... Telah terjadi kesalahan pada saat login",
				showConfirmButton: false,
				timer: 3000,
			});
		}
	};

	return (
		<div
			className="hold-transition theme-primary bg-img"
			style={{
				backgroundImage: `url(${BackgroundImage})`,
				backgroundPosition: "center",
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
				width: "100vw",
				height: "100vh",
			}}
		>
			<div className="container h-p100">
				<div className="row align-items-center justify-content-md-center h-p100">
					<div className="col-12">
						<div className="row justify-content-center g-0">
							<div className="col-lg-5 col-md-5 col-12">
								<div className="bg-white rounded10 shadow-lg">
									<div className="content-top-agile p-40 pb-0">
										<div className="row">
											<div className="col-3">
												<img src="images/logo-icon-pgn.png" alt="logo" />
											</div>
											<div className="col-9">
												<h2 className="text-primary">Welcome</h2>
												<p className="mb-0">
													Sign in to continue to HBB Application.
												</p>
											</div>
										</div>
									</div>
									<div className="p-40">
										<Form onFinish={onFinish}>
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
												<div className="col-12 text-center">
													<button
														type="submit"
														className="btn btn-danger mt-10"
														style={{ width: "100%" }}
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
