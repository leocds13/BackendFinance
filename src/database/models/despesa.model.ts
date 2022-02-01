import moment from "moment";
import Sequelize, { Model, Optional } from "sequelize";
import sequelizeConnection from "../../config/database";

interface DespesaAttributes {
	// conta_id: string;
	id: string;
	descricao: string;
	valor: number;
	data: Date;

	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date;
}

export interface DespesaInput extends Optional<DespesaAttributes, "id"> {}
export interface DespesaOutput extends Required<DespesaAttributes> {}

class Despesa
	extends Model<DespesaAttributes, DespesaInput>
	implements DespesaAttributes
{
	// public conta_id: string;
	public id: string;
	public descricao: string;
	public valor: number;
	public data: Date;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
	public readonly deletedAt!: Date;
}

Despesa.init(
	{
		// conta_id: {
		// 	type: Sequelize.UUID,
		// 	primaryKey: true,
		// 	unique: true,
		// },
		id: {
			type: Sequelize.UUID,
			primaryKey: true,
			unique: true,
			defaultValue: Sequelize.UUIDV4,
		},
		descricao: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				notNull: { msg: "Descrição é Obrigatória" },
			},
		},
		valor: {
			type: Sequelize.FLOAT,
			allowNull: false,
			validate: {
				notNull: { msg: "Valor é Obrigatório" },
				min: {
					args: [0],
					msg: "Valor não pode ser negativo!",
				},
			},
		},
		data: {
			type: Sequelize.DATE,
			allowNull: false,
			set(val) {
				console.log(val);
				this.setDataValue(
					"data",
					moment(val, "DD/MM/YYYY hh:mm").toDate()
				);
			},
			validate: {
				notNull: {
					msg: "Data precisa ser informada!",
				},
				isDate: {
					args: true,
					msg: "Informe uma data válida!",
				},
			},
		},
	},
	{
		modelName: "despesa",
		timestamps: true,
		sequelize: sequelizeConnection,
		paranoid: true,
	}
);

export default Despesa;