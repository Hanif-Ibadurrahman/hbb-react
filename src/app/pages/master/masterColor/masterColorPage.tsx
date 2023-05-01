import { Loading } from "app/components/loading";
import { listCheckPermission } from "app/helper/permission";
import { lazyLoad } from "utils/loadable";

const loadPage = () => {
	return listCheckPermission.isAllowReadMasterColor
		? () => import("app/pages/master/masterColor")
		: () => import("app/pages/error/notFound");
};

export const MasterColorPage = lazyLoad(loadPage(), undefined, {
	fallback: <Loading />,
});
