import Sequelize, { Model, Optional } from "sequelize";
import sequelizeConnection from "../../config/database";
import moment from "moment";
import Categoria from "./categoria.model";
import ApiError from "../../error/ApiError";

interface ReceitaAttributes {
	categoria_id: string;
	id: string;
	descricao: string;
	valor: number;
	data: Date;

	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date;
}

export interface ReceitaInput extends Optional<ReceitaAttributes, "id"> {}
export interface ReceitaOutput extends Required<ReceitaAttributes> {}

class Receita
	extends Model<ReceitaAttributes, ReceitaInput>
	implements ReceitaAttributes
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

Receita.init(
	{
		categoria_id: {
			type: Sequelize.UUID,
			allowNull: false,
			validate: {
				notNull: { msg: "Categoria é Obrigatória!" },
				async isInCategoria(value: string) {
					let achou: boolean = await Categoria.findByPk(value).then(
						(categoria) => {
							return !!categoria
						}
					);
					if (!(achou)) {
						throw "Categoria não encontrada"
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
				notEmpty: { msg: "Descrição não pode ser vazia!" },
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
		modelName: "receita",
	}
);

export default Receita;
