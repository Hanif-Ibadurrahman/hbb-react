import { Loading } from "app/components/loading";
import { listCheckPermission } from "app/helper/permission";
import { lazyLoad } from "utils/loadable";

const loadPage = () => {
	return listCheckPermission.isAllowReadServicePengembalian
		? () => import("app/pages/service/serviceReturn")
		: () => import("app/pages/error/notFound");
};

export const ServiceReturnPage = lazyLoad(loadPage(), undefined, {
	fallback: <Loading />,
});
