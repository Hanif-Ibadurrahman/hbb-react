import { TablePaginateAndSort } from "app/components/table/antd/tablePaginateAndSort";
import { MainLayout } from "app/layout/mainLayout";
import { useState } from "react";
import { PaginationState } from "store/types/paginationTypes";
import { columns } from "./components/table/columnAndDataType";
import { SideModal } from "app/components/modal/sideModal";
import { SelectWithTag } from "app/components/selectWithTag";
import { DatePicker } from "antd";

const HbbInventoryReport = () => {
	const { RangePicker } = DatePicker;

	const [selectedPageAndSort, setSelectedPageAndSort] = useState<{
		page?: number;
		per_page?: number;
		sort?: string;
		order_by?: string;
	}>();
	const [fetchData, setFetchData] = useState<PaginationState>();

	return (
		<MainLayout>
			<section className="content">
				<div className="row">
					<div className="col-12">
						<TablePaginateAndSort
							title="Laporan HBB dan Inventaris"
							dataSource={fetchData}
							columns={columns}
							setSelectedPageAndSort={setSelectedPageAndSort}
						/>
					</div>
				</div>
			</section>

			<SideModal
				title="Filter"
				contentFooter={
					<button
						type="button"
						className="btn btn-primary"
						data-bs-dismiss="modal"
					>
						Filter
					</button>
				}
			>
				<h6 className="box-title mt-10 d-block mb-10">Bisnis Unit</h6>
				<SelectWithTag />
				<h6 className="box-title mt-10 d-block mb-10">Area</h6>
				<SelectWithTag />
				<h6 className="box-title mt-10 d-block mb-10">Satuan Kerja</h6>
				<SelectWithTag />
				<h6 className="box-title mt-10 d-block mb-10">Lokasi</h6>
				<SelectWithTag />
				<h6 className="box-title mt-10 d-block mb-10">Main Group</h6>
				<SelectWithTag />
				<h6 className="box-title mt-10 d-block mb-10">Sub Group</h6>
				<SelectWithTag />
				<h6 className="box-title mt-10 d-block mb-10">Tanggal</h6>
				<RangePicker style={{ width: "100%" }} format={"DD-MM-YYYY"} />
				<h6 className="box-title mt-10 d-block mb-10">Sub Group</h6>
				<SelectWithTag />
				<h6 className="box-title mt-10 d-block mb-10">Jenis Barang</h6>
				<SelectWithTag />
				<h6 className="box-title mt-10 d-block mb-10">Export</h6>
				<SelectWithTag />
			</SideModal>
		</MainLayout>
	);
};

export default HbbInventoryReport;
