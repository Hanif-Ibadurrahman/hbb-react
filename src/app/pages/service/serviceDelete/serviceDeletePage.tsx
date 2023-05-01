import { Loading } from "app/components/loading";
import { listCheckPermission } from "app/helper/permission";
import { lazyLoad } from "utils/loadable";

const loadPage = () => {
	return listCheckPermission.isAllowReadServicePenghapusan
		? () => import("app/pages/service/serviceDelete")
		: () => import("app/pages/error/notFound");
};

export const ServiceDeletePage = lazyLoad(loadPage(), undefined, {
	fallback: <Loading />,
});
