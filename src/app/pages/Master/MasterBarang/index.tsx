import { TableWithExport } from "app/components/Table/TableWithExport";
import { MainLayout } from "app/layout/MainLayout";

const MasterBarang = () => {
	return (
		<MainLayout>
			<section className="content">
				<div className="row">
					<div className="col-12">
						<TableWithExport title="Barang" />
					</div>
				</div>
			</section>
		</MainLayout>
	);
};

export default MasterBarang;
