import BackgroundImage from "assets/image/backgroundNotFound.jpg";
import Image from "assets/image/404.jpg";
import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<div
			className="hold-transition theme-primary bg-img"
			style={{
				backgroundImage: `url(${BackgroundImage})`,
				backgroundPosition: "center",
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
				height: "80vh",
			}}
		>
			<div className="error-page h-p100">
				<div className="container h-p100">
					<div className="row h-p100 align-items-center justify-content-center text-center">
						<div className="col-lg-7 col-md-10 col-12">
							<div className="rounded10 p-50">
								<img src={Image} className="max-w-200" alt="" />
								<h1>Page Not Found !</h1>
								<h3>looks like, page doesn't exist</h3>
								<div className="my-30">
									<Link to={"/dashboard"} className="btn btn-danger">
										Back to dashboard
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NotFound;
