import { Loading } from "app/components/loading";
import { listCheckPermission } from "app/helper/permission";
import { lazyLoad } from "utils/loadable";

const loadPage = () => {
	return listCheckPermission.isAllowReadServicePerubahan
		? () => import("app/pages/service/serviceChange")
		: () => import("app/pages/error/notFound");
};

export const ServiceChangePage = lazyLoad(loadPage(), undefined, {
	fallback: <Loading />,
});
