import express, { Application } from "express";
import helmet from "helmet";
import { Server } from "http";
import database from "./database/conexao";
import ErrorHandler from "./error/ErrorHandler";
import rootRoutes from "./routes";

class App {
	app: Application;

	constructor() {
		this.init();
	}

	private async init() {
		this.app = express();
		this.config();
		this.routerConfig();
		this.errorConfig();
	}

	private async config() {
		this.app.use(helmet());
		this.app.use(express.json());
	}

	private async dbConnect() {
		await new database().sync();
	}

	private async routerConfig() {
		this.app.use("/", rootRoutes);
	}

	private errorConfig() {
		this.app.use(ErrorHandler);
	}

	public start = async (port: number): Promise<Server> => {
		await this.dbConnect()
	
		return this.app.listen(port, () => {
			console.log(`Server rodando na porta ${port}`)
		})
	};
}

export default App;
