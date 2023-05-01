import { Loading } from "app/components/loading";
import { listCheckPermission } from "app/helper/permission";
import { lazyLoad } from "utils/loadable";

const loadPage = () => {
	return listCheckPermission.isAllowReadMasterPenyedia
		? () => import("app/pages/master/masterProvider")
		: () => import("app/pages/error/notFound");
};

export const MasterProviderPage = lazyLoad(loadPage(), undefined, {
	fallback: <Loading />,
});
