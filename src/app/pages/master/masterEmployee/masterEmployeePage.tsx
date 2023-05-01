import { Loading } from "app/components/loading";
import { listCheckPermission } from "app/helper/permission";
import { lazyLoad } from "utils/loadable";

const loadPage = () => {
	return listCheckPermission.isAllowReadMasterEmployee
		? () => import("app/pages/master/masterEmployee")
		: () => import("app/pages/error/notFound");
};

export const MasterEmployeePage = lazyLoad(loadPage(), undefined, {
	fallback: <Loading />,
});
