import axios from "axios";

const token =
	"Y2t3dWRiY3BuMDAwMWIwcGsyOWI5NHlrbw.3PzFJTpWfg04pK6QVqR7UMTjSLJ2fOkbSeoSU97sx9Ca_x4gfm0B2RxRPIwL";

export default axios.create({
	baseURL: "http://103.93.57.36:8008",
	headers: { Authorization: "Bearer " + token },
});
