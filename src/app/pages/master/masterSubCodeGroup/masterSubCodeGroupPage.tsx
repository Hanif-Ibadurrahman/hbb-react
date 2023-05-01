import { Loading } from "app/components/loading";
import { listCheckPermission } from "app/helper/permission";
import { lazyLoad } from "utils/loadable";

const loadPage = () => {
	return listCheckPermission.isAllowReadMasterSubGroup
		? () => import("app/pages/master/masterSubCodeGroup")
		: () => import("app/pages/error/notFound");
};

export const MasterSubCodeGroupPage = lazyLoad(loadPage(), undefined, {
	fallback: <Loading />,
});
