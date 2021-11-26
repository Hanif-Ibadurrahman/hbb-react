import axios from "axios";

const token =
	"Y2t3ZzBtMG03MDAwODRtazVhN2k2YzJucA.vxjNJeHgjb-6GPVna0_lagrXtRphWvZQn-QdOzKvhe6P84lIV4b_EtadMaKa";

export default axios.create({
	baseURL: "http://103.93.57.36:8008",
	headers: { Authorization: "Bearer " + token },
});
