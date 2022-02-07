import * as dotenv from "dotenv";

dotenv.config();

import Server from "./app";

const port = parseInt(process.env.PORT || "3000");

const app = new Server();

export const init = async () => {
	return await app.start(port);
};

export default init();
