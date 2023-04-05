export const ChatBox = () => {
	return (
		<div id="chat-box-body">
			<div
				id="chat-circle"
				className="waves-effect waves-circle btn btn-circle btn-lg btn-warning l-h-70"
			>
				<div id="chat-overlay"></div>
				<span className="icon-Group-chat fs-30">
					<span className="path1"></span>
					<span className="path2"></span>
				</span>
			</div>

			<div className="chat-box">
				<div className="chat-box-header p-15 d-flex justify-content-between align-items-center">
					<div className="btn-group">
						<button
							className="waves-effect waves-circle btn btn-circle btn-primary-light rounded-circle l-h-45 h-40 w-40"
							type="button"
							data-bs-toggle="dropdown"
						>
							<span className="icon-Add-user fs-22">
								<span className="path1"></span>
								<span className="path2"></span>
							</span>
						</button>
						<div className="dropdown-menu min-w-200">
							<a className="dropdown-item fs-16" href="#">
								<span className="icon-Color me-15"></span>
								New Group
							</a>
							<a className="dropdown-item fs-16" href="#">
								<span className="icon-Clipboard me-15">
									<span className="path1"></span>
									<span className="path2"></span>
									<span className="path3"></span>
									<span className="path4"></span>
								</span>
								Contacts
							</a>
							<a className="dropdown-item fs-16" href="#">
								<span className="icon-Group me-15">
									<span className="path1"></span>
									<span className="path2"></span>
								</span>
								Groups
							</a>
							<a className="dropdown-item fs-16" href="#">
								<span className="icon-Active-call me-15">
									<span className="path1"></span>
									<span className="path2"></span>
								</span>
								Calls
							</a>
							<a className="dropdown-item fs-16" href="#">
								<span className="icon-Settings1 me-15">
									<span className="path1"></span>
									<span className="path2"></span>
								</span>
								Settings
							</a>
							<div className="dropdown-divider"></div>
							<a className="dropdown-item fs-16" href="#">
								<span className="icon-Question-circle me-15">
									<span className="path1"></span>
									<span className="path2"></span>
								</span>
								Help
							</a>
							<a className="dropdown-item fs-16" href="#">
								<span className="icon-Notifications me-15">
									<span className="path1"></span>
									<span className="path2"></span>
								</span>
								Privacy
							</a>
						</div>
					</div>
					<div className="flex-grow-1 text-center">
						<div className="text-dark fs-18">Mayra Sibley</div>
						<div>
							<span className="badge badge-sm badge-dot badge-primary"></span>
							<span className="text-muted fs-12">Active</span>
						</div>
					</div>
					<div className="chat-box-toggle">
						<button
							id="chat-box-toggle"
							className="waves-effect waves-circle btn btn-circle btn-danger-light rounded-circle l-h-45 h-40 w-40"
							type="button"
						>
							<span className="icon-Close fs-22">
								<span className="path1"></span>
								<span className="path2"></span>
							</span>
						</button>
					</div>
				</div>
				<div className="chat-box-body">
					<div className="chat-box-overlay"></div>
					<div className="chat-logs">
						<div className="chat-msg user">
							<div className="d-flex align-items-center">
								<span className="msg-avatar">
									<img
										src="../images/avatar/2.jpg"
										className="avatar avatar-lg"
										alt=""
									/>
								</span>
								<div className="mx-10">
									<a href="#" className="text-dark hover-primary fw-bold">
										Mayra Sibley
									</a>
									<p className="text-muted fs-12 mb-0">2 Hours</p>
								</div>
							</div>
							<div className="cm-msg-text">Hi there, I am Jesse and you?</div>
						</div>
						<div className="chat-msg self">
							<div className="d-flex align-items-center justify-content-end">
								<div className="mx-10">
									<a href="#" className="text-dark hover-primary fw-bold">
										You
									</a>
									<p className="text-muted fs-12 mb-0">3 minutes</p>
								</div>
								<span className="msg-avatar">
									<img
										src="../images/avatar/3.jpg"
										className="avatar avatar-lg"
										alt=""
									/>
								</span>
							</div>
							<div className="cm-msg-text">My name is Anne Clarc.</div>
						</div>
						<div className="chat-msg user">
							<div className="d-flex align-items-center">
								<span className="msg-avatar">
									<img
										src="../images/avatar/2.jpg"
										className="avatar avatar-lg"
										alt=""
									/>
								</span>
								<div className="mx-10">
									<a href="#" className="text-dark hover-primary fw-bold">
										Mayra Sibley
									</a>
									<p className="text-muted fs-12 mb-0">40 seconds</p>
								</div>
							</div>
							<div className="cm-msg-text">
								Nice to meet you Anne.
								<br />
								How can i help you?
							</div>
						</div>
					</div>
				</div>
				<div className="chat-input">
					<form>
						<input
							type="text"
							id="chat-input"
							placeholder="Send a message..."
						/>
						<button type="submit" className="chat-submit" id="chat-submit">
							<span className="icon-Send fs-22"></span>
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};
