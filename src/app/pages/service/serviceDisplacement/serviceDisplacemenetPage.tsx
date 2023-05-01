import { Loading } from "app/components/loading";
import { listCheckPermission } from "app/helper/permission";
import { lazyLoad } from "utils/loadable";

const loadPage = () => {
	return listCheckPermission.isAllowReadServicePemindahan
		? () => import("app/pages/service/serviceDisplacement")
		: () => import("app/pages/error/notFound");
};

export const ServiceDisplacementPage = lazyLoad(loadPage(), undefined, {
	fallback: <Loading />,
});
