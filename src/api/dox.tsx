import axios from "axios";

const token =
	"Y2t4bjcxMmIzMDAwMDRtcWk3M29zMzJqaA.x4YZVNpcwlplTpPwyH35q6CQJqLSbBHwOGJ8kgyG25C8p0Hnxtu6EnRZv7R5";

export default axios.create({
	baseURL: "http://103.93.57.36:8008",
	headers: { Authorization: "Bearer " + token },
});
