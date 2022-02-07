import Sequelize, {
	HasManyAddAssociationMixin,
	HasManyCountAssociationsMixin,
	HasManyCreateAssociationMixin,
	HasManyGetAssociationsMixin,
	HasManyHasAssociationMixin,
	Model,
	Optional,
} from "sequelize";
import sequelizeConnection from "../../config/database";
import Despesa from "./despesa.model";
import Receita from "./receita.model";

interface CategoriaAttributes {
	// user_id: string;
	id: string;
	nome: string;
	descricao: string;
	vlr_em_categoria: number;

	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date;
}

export interface CategoriaInput
	extends Optional<
		CategoriaAttributes,
		"id" | "descricao" | "vlr_em_categoria"
	> {}
export interface CategoriaOutput extends Required<CategoriaAttributes> {}

class Categoria
	extends Model<CategoriaAttributes, CategoriaInput>
	implements CategoriaAttributes
{
	// public user_id!: string;
	public id: string;
	public nome!: string;
	public descricao!: string;
	public vlr_em_categoria: number;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
	public readonly deletedAt!: Date;

	declare getReceitas: HasManyGetAssociationsMixin<Receita>; // Note the null assertions!
	declare addReceita: HasManyAddAssociationMixin<Receita, string>;
	declare hasReceita: HasManyHasAssociationMixin<Receita, string>;
	declare countReceitas: HasManyCountAssociationsMixin;
	declare createReceita: HasManyCreateAssociationMixin<Receita>;

	declare getDespesas: HasManyGetAssociationsMixin<Despesa>; // Note the null assertions!
	declare addDespesa: HasManyAddAssociationMixin<Despesa, string>;
	declare hasDespesa: HasManyHasAssociationMixin<Despesa, string>;
	declare countDespesas: HasManyCountAssociationsMixin;
	declare createDespesa: HasManyCreateAssociationMixin<Despesa>;
}

Categoria.init(
	{
		// user_id: {
		// 	type: Sequelize.UUID,
		// 	allowNull: false,
		// 	primaryKey: true,
		// },
		id: {
			type: Sequelize.UUID,
			allowNull: false,
			primaryKey: true,
			defaultValue: Sequelize.UUIDV4,
			validate: {
				isUUID: {
					args: 4,
					msg: "Informe um ID valido!",
				},
			},
		},
		nome: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "Informe um nome da Categoria!",
				},
				notNull: {
					msg: "Nome é obrigatório!",
				},
			},
		},
		descricao: {
			type: Sequelize.STRING,
			defaultValue: "",
		},
		vlr_em_categoria: {
			type: Sequelize.FLOAT(10, 2),
			defaultValue: 0,
		},
	},
	{
		timestamps: true,
		sequelize: sequelizeConnection,
		paranoid: true,
		freezeTableName: true,
		modelName: "categoria",
	}
);

export default Categoria;
