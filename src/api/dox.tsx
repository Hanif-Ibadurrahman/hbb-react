import axios from "axios";

const token =
	"Y2t3dW15Z2I1MDAwMDRscGtiZXVlZnc0Nw.Y4kgdZYMkNsvucV8F_dsWKPkzIBoOIpwVz_YTzQYA1YAoyK06ugL9feCiGY6";

export default axios.create({
	baseURL: "http://103.93.57.36:8008",
	headers: { Authorization: "Bearer " + token },
});
