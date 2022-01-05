import axios from "axios";

const token =
	"Y2t5MW12ZXAxMDA0ZzRsbXIxM28wN2lvcg.FFQWKZSvOUrWl8nElHjtYwqOD_eozKuoEfALL2fr17bKss46lAdObtjdkw0G";

export default axios.create({
	baseURL: "http://103.93.57.36:8008",
	headers: { Authorization: "Bearer " + token },
});
