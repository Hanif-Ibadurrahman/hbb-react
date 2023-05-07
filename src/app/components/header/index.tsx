import { Avatar, Dropdown, MenuProps, Modal } from "antd";
import { logoutApi } from "api/login";
import FeatherIcon from "feather-icons-react";
import { Link, useNavigate } from "react-router-dom";
interface IHeader {
	collapseHandler: (thisKey: string) => void;
}

export const Header = ({ collapseHandler }: IHeader) => {
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await logoutApi();
			sessionStorage.clear();
			navigate("/login", { replace: true });
		} catch (error) {
			Modal.error({
				title: "Telah terjadi kesalahan pada saat logout",
				content: "Mohon di tunggu beberapa saat lagi",
			});
		}
	};

	const items: MenuProps["items"] = [
		{
			key: "1",
			label: (
				// eslint-disable-next-line jsx-a11y/anchor-is-valid
				<a className="dropdown-item">
					<i className="ti-user text-muted me-2"></i> Profile
				</a>
			),
		},
		{
			key: "2",
			label: (
				// eslint-disable-next-line jsx-a11y/anchor-is-valid
				<a className="dropdown-item">
					<i className="ti-settings text-muted me-2"></i> Email
				</a>
			),
		},
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
							<img
								src="images/logo-icon-pgn.png"
								alt="logo"
								style={{
									background: "#fff",
									border: "1px solid #ddd",
									borderRadius: "4px",
									padding: "5px",
								}}
							/>
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
							<a
								href="/"
								className="waves-effect waves-light dropdown-toggle btn-info-light"
								data-bs-toggle="dropdown"
								title="Notifications"
							>
								<FeatherIcon icon={"bell"} />
							</a>
							<ul className="dropdown-menu animated bounceIn">
								<li className="header">
									<div className="p-20">
										<div className="flexbox">
											<div>
												<h4 className="mb-0 mt-0">Notifications</h4>
											</div>
											<div>
												<a href="/" className="text-danger">
													Clear All
												</a>
											</div>
										</div>
									</div>
								</li>

								<li>
									<ul className="menu sm-scrol">
										<li>
											<a href="/">
												<i className="fa fa-users text-info"></i> Curabitur id
												eros quis nunc suscipit blandit.
											</a>
										</li>
										<li>
											<a href="/">
												<i className="fa fa-warning text-warning"></i> Duis
												malesuada justo eu sapien elementum, in semper diam
												posuere.
											</a>
										</li>
										<li>
											<a href="/">
												<i className="fa fa-users text-danger"></i> Donec at
												nisi sit amet tortor commodo porttitor pretium a erat.
											</a>
										</li>
										<li>
											<a href="/">
												<i className="fa fa-shopping-cart text-success"></i> In
												gravida mauris et nisi
											</a>
										</li>
										<li>
											<a href="/">
												<i className="fa fa-user text-danger"></i> Praesent eu
												lacus in libero dictum fermentum.
											</a>
										</li>
										<li>
											<a href="/">
												<i className="fa fa-user text-primary"></i> Nunc
												fringilla lorem
											</a>
										</li>
										<li>
											<a href="/">
												<i className="fa fa-user text-success"></i> Nullam
												euismod dolor ut quam interdum, at scelerisque ipsum
												imperdiet.
											</a>
										</li>
									</ul>
								</li>
								<li className="footer">
									<a href="/">View all</a>
								</li>
							</ul>
						</li>

						<li className="dropdown user user-menu">
							<Dropdown menu={{ items }} placement="bottomLeft">
								<div data-bs-toggle="dropdown" title="User">
									<img
										src="images/avatar/avatar-1.png"
										className="avatar rounded-10 bg-primary-light h-40 w-40"
										alt=""
									/>
								</div>
							</Dropdown>
						</li>
					</ul>
				</div>
			</nav>
		</header>
	);
};
