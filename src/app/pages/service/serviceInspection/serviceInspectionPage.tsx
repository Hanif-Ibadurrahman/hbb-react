import { Loading } from "app/components/loading";
import { listCheckPermission } from "app/helper/permission";
import { lazyLoad } from "utils/loadable";

const loadPage = () => {
	return listCheckPermission.isAllowReadServicePemeriksaan
		? () => import("app/pages/service/serviceInspection")
		: () => import("app/pages/error/notFound");
};

export const ServiceInspectionPage = lazyLoad(loadPage(), undefined, {
	fallback: <Loading />,
});
