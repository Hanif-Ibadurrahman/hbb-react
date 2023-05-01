import { Loading } from "app/components/loading";
import { listCheckPermission } from "app/helper/permission";
import { lazyLoad } from "utils/loadable";

const loadPage = () => {
	return listCheckPermission.isAllowReadMasterDivision
		? () => import("app/pages/master/masterDivision")
		: () => import("app/pages/error/notFound");
};

export const MasterDivisionPage = lazyLoad(loadPage(), undefined, {
	fallback: <Loading />,
});
