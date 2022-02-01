import Sequelize from "sequelize";
import sequelizeConnection from "../config/database";
// import User from "./models/user.model";
// import Conta from "./models/conta.model";
import Receita from "./models/receita.model";
import Despesa from "./models/despesa.model";

class Database {
	public connection: Sequelize.Sequelize;

	constructor() {
		this.connection = sequelizeConnection;
	}

	async sync(): Promise<void> {
		const isDev = process.env.NODE_ENV === "development";

		console.log('Criando Receita')
		await Receita.sync({ alter: isDev });
		console.log('Criando Despesa')
		await Despesa.sync({ alter: isDev });
		// await User.sync({ alter: isDev });
		// await Conta.sync({ alter: isDev });
	}
}

export default new Database();
