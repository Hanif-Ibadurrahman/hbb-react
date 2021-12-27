import axios from "axios";

const token =
	"Y2t4a2l3M2x3MDAwMDRtcWllaXdmNzJpag.JWlSbG8cyvXQybN7fUbDKqB34UgWyizse4EHCUrP7usyC8L8wwAR_v-Rq7vM";

export default axios.create({
	baseURL: "http://103.93.57.36:8008",
	headers: { Authorization: "Bearer " + token },
});
