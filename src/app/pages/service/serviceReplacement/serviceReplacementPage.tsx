import { Loading } from "app/components/loading";
import { listCheckPermission } from "app/helper/permission";
import { lazyLoad } from "utils/loadable";

const loadPage = () => {
	return listCheckPermission.isAllowReadServicePenggantian
		? () => import("app/pages/service/serviceReplacement")
		: () => import("app/pages/error/notFound");
};

export const ServiceReplacementPage = lazyLoad(loadPage(), undefined, {
	fallback: <Loading />,
});
