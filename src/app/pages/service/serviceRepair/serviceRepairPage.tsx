import { Loading } from "app/components/loading";
import { listCheckPermission } from "app/helper/permission";
import { lazyLoad } from "utils/loadable";

const loadPage = () => {
	return listCheckPermission.isAllowReadServicePerbaikan
		? () => import("app/pages/service/serviceRepair")
		: () => import("app/pages/error/notFound");
};

export const ServiceRepairPage = lazyLoad(loadPage(), undefined, {
	fallback: <Loading />,
});
