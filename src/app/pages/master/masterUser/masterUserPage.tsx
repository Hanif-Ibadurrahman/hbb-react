import { Loading } from "app/components/loading";
import { listCheckPermission } from "app/helper/permission";
import { lazyLoad } from "utils/loadable";

const loadPage = () => {
	return listCheckPermission.isAllowReadMasterUser
		? () => import("app/pages/master/masterUser")
		: () => import("app/pages/error/notFound");
};

export const MasterUserPage = lazyLoad(loadPage(), undefined, {
	fallback: <Loading />,
});
