import { Loading } from "app/components/loading";
import { listCheckPermission } from "app/helper/permission";
import { lazyLoad } from "utils/loadable";

const loadPage = () => {
	return listCheckPermission.isAllowReadMasterItem
		? () => import("app/pages/master/masterItem")
		: () => import("app/pages/error/notFound");
};

export const MasterItemPage = lazyLoad(loadPage(), undefined, {
	fallback: <Loading />,
});
