/* eslint-disable jsx-a11y/anchor-is-valid */
import {
	Badge,
	Button,
	Dropdown,
	MenuProps,
	Space,
	Typography,
	notification,
} from "antd";
import { deleteNotificationApi, getNotificationApi } from "api/dashboard";
import { logoutApi } from "api/login";
import { CheckResponse } from "app/helper/authentication";
import FeatherIcon from "feather-icons-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { INotification } from "store/types/dashboard";
import { BellOutlined } from "@ant-design/icons";
import { tokenDecode } from "app/helper/permission";
interface IHeader {
	collapseHandler: (thisKey: string) => void;
}

export const Header = ({ collapseHandler }: IHeader) => {
	const { Text } = Typography;
	const [api, contextHolder] = notification.useNotification();
	const navigate = useNavigate();
	const [dataNotification, setDataNotification] = useState<INotification[]>();

	const fetchDataNotification = async () => {
		try {
			const response = await getNotificationApi();
			setDataNotification(response.data.data);
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const deleteNotification = async (id: number) => {
		try {
			await deleteNotificationApi(id).then(() => {
				fetchDataNotification();
			});
		} catch (error: any) {
			CheckResponse(error);
		}
	};

	const openNotification = () => {
		// eslint-disable-next-line array-callback-return
		dataNotification?.map(value => {
			api.open({
				message: value.type,
				description: value.note,
				btn: (
					<Button
						type="primary"
						danger
						size="small"
						onClick={() => {
							api.destroy(value.id);
							deleteNotification(value.id);
						}}
					>
						Don't show again
					</Button>
				),
				key: value.id,
				duration: 30,
				icon: <BellOutlined style={{ color: "#108ee9" }} />,
			});
		});
	};

	useEffect(() => {
		fetchDataNotification();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleLogout = async () => {
		try {
			await logoutApi();
		} catch (error: any) {
			CheckResponse(error);
		}
		document.cookie = `token=;`;
		document.cookie = `laravel_session=;`;
		document.cookie = `XSRF-TOKEN=;`;
		navigate("/login", { replace: true });
	};

	const items: MenuProps["items"] = [
		// {
		// 	key: "1",
		// 	label: (
		// 		// eslint-disable-next-line jsx-a11y/anchor-is-valid
		// 		<a className="dropdown-item">
		// 			<i className="ti-user text-muted me-2"></i> Profile
		// 		</a>
		// 	),
		// },
		// {
		// 	key: "2",
		// 	label: (
		// 		// eslint-disable-next-line jsx-a11y/anchor-is-valid
		// 		<a className="dropdown-item">
		// 			<i className="ti-settings text-muted me-2"></i> Email
		// 		</a>
		// 	),
		// },
		{
			key: "3",
			label: (
				// eslint-disable-next-line jsx-a11y/anchor-is-valid
				<a className="dropdown-item" onClick={handleLogout}>
					<i className="ti-lock text-muted me-2"></i> Logout
				</a>
			),
		},
	];

	return (
		<header className="main-header">
			<div className="d-flex align-items-center logo-box justify-content-start">
				<a href="/" className="logo">
					<div className="logo-mini w-25">
						<span className="light-logo">
							<img src="images/logo-icon-pgn-outline.png" alt="logo" />
						</span>
						<span className="dark-logo">
							<img src="images/logo-icon-pgn.png" alt="logo" />
						</span>
					</div>
				</a>
			</div>
			<nav className="navbar navbar-static-top">
				<div className="app-menu">
					<ul className="header-megamenu nav">
						<li
							className="btn-group nav-item"
							onClick={() => collapseHandler("collapse")}
						>
							<div className="waves-effect waves-light nav-link push-btn btn-primary-light">
								<FeatherIcon icon={"align-justify"} />
							</div>
						</li>
						<li className="btn-group d-lg-inline-flex d-none">
							<div className="app-menu">
								<Link to="/">
									<div
										className="d-flex align-items-center"
										style={{ width: 80, columnGap: 10 }}
									>
										<img src="images/logo-icon-pgn.png" alt="logo" />
										<img src="images/logo-text-pgn.png" alt="logo" />
									</div>
								</Link>
							</div>
						</li>
					</ul>
				</div>

				<div className="navbar-custom-menu r-side">
					<ul className="nav navbar-nav">
						<li className="btn-group dropdown notifications-menu">
							{contextHolder}
							<Link
								to="#"
								className="waves-effect waves-light dropdown-toggle btn-info-light"
								title="Notifications"
								onClick={openNotification}
							>
								<Badge count={dataNotification?.length}>
									<FeatherIcon icon={"bell"} />
								</Badge>
							</Link>
						</li>

						<li className="dropdown user user-menu">
							<Dropdown menu={{ items }} placement="bottomLeft">
								<div title={tokenDecode?.user?.name?.toUpperCase()}>
									<Space>
										<img
											src="images/avatar/avatar-1.png"
											className="avatar rounded-10 bg-primary-light h-40 w-40"
											alt="user"
										/>
										<a href="#">
											<p className="fw-bold">
												<Text
													style={{ width: 100 }}
													ellipsis={{
														tooltip: "",
													}}
												>
													{tokenDecode?.user?.name?.toUpperCase()}
												</Text>
											</p>
										</a>
									</Space>
								</div>
							</Dropdown>
						</li>
					</ul>
				</div>
			</nav>
		</header>
	);
};
