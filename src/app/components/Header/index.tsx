// import { Search } from "../Search";

export const Header = () => {
	return (
		<header className="main-header">
			<div className="d-flex align-items-center logo-box justify-content-start">
				<a href="index.html" className="logo">
					<div className="logo-mini w-50">
						<span className="light-logo">
							<img src="images/logo-icon-pgn.png" alt="logo" />
						</span>
						<span className="dark-logo">
							<img src="images/logo-icon-pgn.png" alt="logo" />
						</span>
					</div>
					<div className="logo-lg">
						<span className="light-logo">
							<img src="images/logo-text-pgn.png" alt="logo" />
						</span>
						<span className="dark-logo">
							<img src="images/logo-text-pgn.png" alt="logo" />
						</span>
					</div>
				</a>
			</div>
			<nav className="navbar navbar-static-top">
				<div className="app-menu">
					<ul className="header-megamenu nav">
						<li className="btn-group nav-item">
							<a
								href="#"
								className="waves-effect waves-light nav-link push-btn btn-primary-light"
								data-toggle="push-menu"
								role="button"
							>
								<i data-feather="align-left"></i>
							</a>
						</li>
						<li className="btn-group d-lg-inline-flex d-none">
							<div className="app-menu">{/* <Search /> */}</div>
						</li>
					</ul>
				</div>

				<div className="navbar-custom-menu r-side">
					<ul className="nav navbar-nav">
						<li className="btn-group nav-item d-lg-inline-flex d-none">
							<a
								href="#"
								data-provide="fullscreen"
								className="waves-effect waves-light nav-link full-screen btn-warning-light"
								title="Full Screen"
							>
								<i data-feather="maximize"></i>
							</a>
						</li>
						<li className="btn-group dropdown notifications-menu">
							<a
								href="#"
								className="waves-effect waves-light dropdown-toggle btn-info-light"
								data-bs-toggle="dropdown"
								title="Notifications"
							>
								<i data-feather="bell"></i>
							</a>
							<ul className="dropdown-menu animated bounceIn">
								<li className="header">
									<div className="p-20">
										<div className="flexbox">
											<div>
												<h4 className="mb-0 mt-0">Notifications</h4>
											</div>
											<div>
												<a href="#" className="text-danger">
													Clear All
												</a>
											</div>
										</div>
									</div>
								</li>

								<li>
									<ul className="menu sm-scrol">
										<li>
											<a href="#">
												<i className="fa fa-users text-info"></i> Curabitur id
												eros quis nunc suscipit blandit.
											</a>
										</li>
										<li>
											<a href="#">
												<i className="fa fa-warning text-warning"></i> Duis
												malesuada justo eu sapien elementum, in semper diam
												posuere.
											</a>
										</li>
										<li>
											<a href="#">
												<i className="fa fa-users text-danger"></i> Donec at
												nisi sit amet tortor commodo porttitor pretium a erat.
											</a>
										</li>
										<li>
											<a href="#">
												<i className="fa fa-shopping-cart text-success"></i> In
												gravida mauris et nisi
											</a>
										</li>
										<li>
											<a href="#">
												<i className="fa fa-user text-danger"></i> Praesent eu
												lacus in libero dictum fermentum.
											</a>
										</li>
										<li>
											<a href="#">
												<i className="fa fa-user text-primary"></i> Nunc
												fringilla lorem
											</a>
										</li>
										<li>
											<a href="#">
												<i className="fa fa-user text-success"></i> Nullam
												euismod dolor ut quam interdum, at scelerisque ipsum
												imperdiet.
											</a>
										</li>
									</ul>
								</li>
								<li className="footer">
									<a href="#">View all</a>
								</li>
							</ul>
						</li>

						<li className="btn-group nav-item">
							<a
								href="#"
								data-toggle="control-sidebar"
								title="Setting"
								className="waves-effect full-screen waves-light btn-danger-light"
							>
								<i data-feather="settings"></i>
							</a>
						</li>

						<li className="btn-group dropdown user user-menu">
							<a
								href="#"
								className="waves-effect waves-light dropdown-toggle l-h-12 no-shadow w-auto bg-transparent py-0"
								data-bs-toggle="dropdown"
								title="User"
							>
								<img
									src="images/avatar/avatar-1.png"
									className="avatar rounded-10 bg-primary-light h-40 w-40"
									alt=""
								/>
							</a>
							<ul className="dropdown-menu animated flipInX">
								<li className="user-body">
									<a className="dropdown-item" href="extra_profile.html">
										<i className="ti-user text-muted me-2"></i> Profile
									</a>
									<a className="dropdown-item" href="mailbox.html">
										<i className="ti-settings text-muted me-2"></i> Email
									</a>
									<div className="dropdown-divider"></div>
									<a className="dropdown-item" href="auth_login.html">
										<i className="ti-lock text-muted me-2"></i> Logout
									</a>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</nav>
		</header>
	);
};
