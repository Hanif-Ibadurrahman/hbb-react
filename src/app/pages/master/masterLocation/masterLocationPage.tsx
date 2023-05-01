import { Loading } from "app/components/loading";
import { listCheckPermission } from "app/helper/permission";
import { lazyLoad } from "utils/loadable";

const loadPage = () => {
	return listCheckPermission.isAllowReadMasterLocation
		? () => import("app/pages/master/masterLocation")
		: () => import("app/pages/error/notFound");
};

export const MasterLocationPage = lazyLoad(loadPage(), undefined, {
	fallback: <Loading />,
});
