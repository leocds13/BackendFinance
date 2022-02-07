import moment from "moment";
import Sequelize, { Model, Optional } from "sequelize";
import sequelizeConnection from "../../config/database";
import Categoria from "./categoria.model";

interface DespesaAttributes {
	categoria_id: string;
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
	public categoria_id: string;
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
		categoria_id: {
			type: Sequelize.UUID,
			allowNull: false,
			validate: {
				notNull: { msg: "Categoria é Obrigatória!" },
				async isInCategoria(value: string) {
					let achou: boolean = await Categoria.findByPk(value).then(
						(categoria) => {
							return !!categoria;
						}
					);
					if (!achou) {
						throw "Categoria não encontrada";
					}
				},
			},
		},
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
				notNull: { msg: "Descrição é Obrigatória!" },
				notEmpty: { msg: "Descrição não pode ficar vazia!" },
			},
		},
		valor: {
			type: Sequelize.FLOAT(10, 2),
			allowNull: false,
			validate: {
				notNull: { msg: "Valor é Obrigatório!" },
				min: {
					args: [0.01],
					msg: "Valor tem que ser maior que zero!",
				},
			},
		},
		data: {
			type: Sequelize.DATE,
			allowNull: false,
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
		timestamps: true,
		sequelize: sequelizeConnection,
		paranoid: true,
		freezeTableName: true,
		modelName: "despesa",
	}
);

export default Despesa;
