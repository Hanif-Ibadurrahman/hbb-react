import { Loading } from "app/components/loading";
import { listCheckPermission } from "app/helper/permission";
import { lazyLoad } from "utils/loadable";

const loadPage = () => {
	return listCheckPermission.isAllowReadMasterCondition
		? () => import("app/pages/master/masterCondition")
		: () => import("app/pages/error/notFound");
};

export const MasterConditionPage = lazyLoad(loadPage(), undefined, {
	fallback: <Loading />,
});
