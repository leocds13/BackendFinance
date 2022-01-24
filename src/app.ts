import express, { Application } from "express";
import helmet from "helmet";
import rootRoutes from "./routes";

class Server {
	private app: Application;

	constructor() {
		this.app = express();
		this.config();
		this.routerConfig();
		this.dbConnect();
	}

	private config() {
		this.app.use(helmet());
		this.app.use(express.json());
	}

	private dbConnect() {
		// pool.connect(function (err, client, done) {
		// 	if (err) throw new Error(err.message);

		// 	console.log("Connected");
		// 	Tabelas.init();
		// });
	}

	private routerConfig() {
		this.app.use('/', rootRoutes);
		
		// this.app.use(routerUser);
		// this.app.use(routerContas);
		
		// this.app.use(apiErrorHandler);
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
