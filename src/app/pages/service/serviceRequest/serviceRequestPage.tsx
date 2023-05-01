import { Loading } from "app/components/loading";
import { listCheckPermission } from "app/helper/permission";
import { lazyLoad } from "utils/loadable";

const loadPage = () => {
	return listCheckPermission.isAllowReadServicePermintaan
		? () => import("app/pages/service/serviceRequest")
		: () => import("app/pages/error/notFound");
};

export const ServiceRequestPage = lazyLoad(loadPage(), undefined, {
	fallback: <Loading />,
});
