import { Loading } from "app/components/loading";
import { listCheckPermission } from "app/helper/permission";
import { lazyLoad } from "utils/loadable";

const loadPage = () => {
	return listCheckPermission.isAllowReadMasterPengelola
		? () => import("app/pages/master/masterManager")
		: () => import("app/pages/error/notFound");
};

export const MasterManagerPage = lazyLoad(loadPage(), undefined, {
	fallback: <Loading />,
});
