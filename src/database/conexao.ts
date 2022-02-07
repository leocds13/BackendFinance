import Sequelize from "sequelize";
import sequelizeConnection from "../config/database";
// import User from "./models/user.model";
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
		await Categoria.sync({ alter: isDev, force: isTest });
		await Receita.sync({ alter: isDev, force: isTest });
		await Despesa.sync({ alter: isDev, force: isTest });
		// await User.sync({ alter: isDev });
		!isTest && console.log("=========  Tabelas Criadas  =========");

		await this.insertValoresIniciais();
	}

	async createRelations() {
		Categoria.hasMany(Receita, {
			sourceKey: "id",
			foreignKey: "categoria_id",
		});
		Receita.belongsTo(Categoria);

		Categoria.hasOne(Despesa, {
			sourceKey: "id",
			foreignKey: "categoria_id",
		});
		Despesa.belongsTo(Categoria);

		// User.hasMany(Categoria, {
		// 	sourceKey: "id",
		// 	foreignKey: "user_id",
		// 	as: "Categorias",
		// });
	}

	async insertValoresIniciais() {
		await Categoria.findOrCreate({
			where: { nome: "Alimentação" },
			defaults: {
				nome: "Alimentação",
				descricao:
					"Use esta Categoria para suas receitas e despesas de Alimentação",
			},
		});

		await Categoria.findOrCreate({
			where: { nome: "Saúde" },
			defaults: {
				nome: "Saúde",
				descricao:
					"Use esta Categoria para suas receitas e despesas de Saúde",
			},
		});

		await Categoria.findOrCreate({
			where: { nome: "Moradia" },
			defaults: {
				nome: "Moradia",
				descricao:
					"Use esta Categoria para suas receitas e despesas de Moradia",
			},
		});

		await Categoria.findOrCreate({
			where: { nome: "Transporte" },
			defaults: {
				nome: "Transporte",
				descricao:
					"Use esta Categoria para suas receitas e despesas de Transporte",
			},
		});

		await Categoria.findOrCreate({
			where: { nome: "Educação" },
			defaults: {
				nome: "Educação",
				descricao:
					"Use esta Categoria para suas receitas e despesas de Educação",
			},
		});

		await Categoria.findOrCreate({
			where: { nome: "Lazer" },
			defaults: {
				nome: "Lazer",
				descricao:
					"Use esta Categoria para suas receitas e despesas de Lazer",
			},
		});

		await Categoria.findOrCreate({
			where: { nome: "Imprevistos" },
			defaults: {
				nome: "Imprevistos",
				descricao:
					"Use esta Categoria para suas receitas e despesas de Imprevistos",
			},
		});
	}
}

export default Database;
