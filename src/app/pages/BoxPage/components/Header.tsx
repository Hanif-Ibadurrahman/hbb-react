import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Breadcrumb as B_Breadcrumb } from "react-bootstrap";
import { ModalForm } from "./ModalForm";
import { Filter } from "app/components/Filter";
import Breadcrumb from "app/components/BreadCrumb";

export function Header() {
	const [crumbs, setCrumbs] = useState(["Dashboard", "BoxPage"]);

	return (
		<>
			<div className="d-flex jc-between ai-center mb-4">
				<Breadcrumb crumbs={crumbs} selected />
				<div className="d-flex">
					<Filter />
					<Button
						className="d-flex ai-center mr-2 bg-warning-5"
						variant="warning"
					>
						Template Upload<i className="fas fa-file ml-2"></i>
					</Button>{" "}
					<Button
						className="d-flex ai-center mr-2 bg-warning-5"
						variant="warning"
					>
						Import<i className="fas fa-upload ml-2"></i>
					</Button>{" "}
					<Button
						className="d-flex ai-center mr-2 bg-warning-5"
						variant="warning"
					>
						Export<i className="fas fa-download ml-2"></i>
					</Button>{" "}
					<ModalForm />
				</div>
			</div>
		</>
	);
}
