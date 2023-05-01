import { Loading } from "app/components/loading";
import { listCheckPermission } from "app/helper/permission";
import { lazyLoad } from "utils/loadable";

const loadPage = () => {
	return listCheckPermission.isAllowReadMasterBisnisUnit
		? () => import("app/pages/master/masterBusinessUnit")
		: () => import("app/pages/error/notFound");
};

export const MasterBusinessUnitPage = lazyLoad(loadPage(), undefined, {
	fallback: <Loading />,
});
