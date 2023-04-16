import { Loading } from "app/components/loading";
import { lazyLoad } from "utils/loadable";

export const LoginPage = lazyLoad(() => import("app/pages/login"), undefined, {
	fallback: <Loading />,
});
