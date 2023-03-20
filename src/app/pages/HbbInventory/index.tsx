import { MainLayout } from "app/layout/MainLayout";
import { TableSelection } from "./components/TableSelection";

const HbbInventory = () => {
	return (
		<MainLayout>
			<section className="content">
				<div className="row">
					<div className="col-12">
						<TableSelection />
					</div>
				</div>
			</section>
		</MainLayout>
	);
};

export default HbbInventory;
