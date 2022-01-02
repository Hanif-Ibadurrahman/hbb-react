import axios from "axios";

const token =
	"Y2t4eGQ3cHB1MDAwMTVqbzExZXIyOG96dg.KU2Q_x6ulJB7W1IK4w_lqoZQoa4Wy28SD-0REDeLKkwcdPnw0d2ppkW12GtZ";

export default axios.create({
	baseURL: "http://103.93.57.36:8008",
	headers: { Authorization: "Bearer " + token },
});
