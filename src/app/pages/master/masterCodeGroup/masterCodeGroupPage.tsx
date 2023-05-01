import { Loading } from "app/components/loading";
import { listCheckPermission } from "app/helper/permission";
import { lazyLoad } from "utils/loadable";

const loadPage = () => {
	return listCheckPermission.isAllowReadMasterMainGroup
		? () => import("app/pages/master/masterCodeGroup")
		: () => import("app/pages/error/notFound");
};

export const MasterCodeGroupPage = lazyLoad(loadPage(), undefined, {
	fallback: <Loading />,
});
