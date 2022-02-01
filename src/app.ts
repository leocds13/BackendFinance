import express, { Application } from "express";
import helmet from "helmet";
import database from "./database/conexao";
import ErrorHandler from "./error/ErrorHandler";
// import tables from "./infra/database/tables";
import rootRoutes from "./routes";

class Server {
	private app: Application;

	constructor() {
		this.init();
	}

	private async init() {
		this.app = express();
		await this.dbConnect();
		this.config();
		this.routerConfig();
		this.errorConfig();
	}

	private async config() {
		this.app.use(helmet());
		this.app.use(express.json());
	}

	private async dbConnect() {
		await database.sync();
	}

	private async routerConfig() {
		this.app.use("/", rootRoutes);
	}

	private errorConfig() {
		this.app.use(ErrorHandler)
	}

	public start = (port: number) => {
		return new Promise((resolve, reject) => {
			this.app
				.listen(port, () => {
					resolve(port);
				})
				.on("error", (err: Object) => reject(err));
		});
	};
}

export default Server;
