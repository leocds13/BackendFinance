import Sequelize from "sequelize";
import sequelizeConnection from "../config/database";
import User from "./models/user.model";
import Categoria from "./models/categoria.model";
import Receita from "./models/receita.model";
import Despesa from "./models/despesa.model";

class Database {
	public connection: Sequelize.Sequelize;

	constructor() {
		this.connection = sequelizeConnection;
	}

	async sync(): Promise<void> {
		const isTest = process.env.NODE_ENV === "test";
		const isDev = process.env.NODE_ENV === "development";
		await this.createRelations();

		!isTest && console.log("=========  Criando Tabelas  =========");
		await User.sync({ alter: isDev, force: true });
		await Categoria.sync({ alter: isDev, force: true });
		await Receita.sync({ alter: isDev, force: true });
		await Despesa.sync({ alter: isDev, force: true });
		!isTest && console.log("=========  Tabelas Criadas  =========");

		// await this.insertValoresIniciais();
	}

	async createRelations() {
		User.hasMany(Categoria, {
			sourceKey: "id",
			foreignKey: "user_id",
		});
		Categoria.belongsTo(User);

		Categoria.hasMany(Receita, {
			sourceKey: "id",
			foreignKey: "categoria_id",
		});
		Receita.belongsTo(Categoria);

		Categoria.hasMany(Despesa, {
			sourceKey: "id",
			foreignKey: "categoria_id",
		});
		Despesa.belongsTo(Categoria);
	}
}

export default Database;
