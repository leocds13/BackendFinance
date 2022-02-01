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

interface ContaAttributes {
	user_id: string;
	id: string;
	nome: string;
	descricao: string;
	vlr_em_conta: number;

	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date;
}

export interface ContaInput
	extends Optional<ContaAttributes, "id" | "descricao" | "vlr_em_conta"> {}
export interface ContaOutput extends Required<ContaAttributes> {}

class Conta
	extends Model<ContaAttributes, ContaInput>
	implements ContaAttributes
{
	public user_id!: string;
	public id: string;
	public nome!: string;
	public descricao!: string;
	public vlr_em_conta: number;

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

Conta.init(
	{
		user_id: {
			type: Sequelize.UUID,
			allowNull: false,
			primaryKey: true,
		},
		id: {
			type: Sequelize.UUID,
			allowNull: false,
			primaryKey: true,
			defaultValue: Sequelize.UUIDV4,
		},
		nome: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		descricao: {
			type: Sequelize.STRING,
			defaultValue: "",
		},
		vlr_em_conta: {
			type: Sequelize.FLOAT,
			defaultValue: 0,
		},
	},
	{
		modelName: "conta",
		timestamps: true,
		sequelize: sequelizeConnection,
		paranoid: true,
	}
);

// Conta.hasMany(Receita, {
// 	sourceKey: "id",
// 	foreignKey: "conta_id",
// 	as: "receitas",
// });

// Conta.hasMany(Despesa, {
// 	sourceKey: "id",
// 	foreignKey: "conta_id",
// 	as: "despesas",
// });

export default Conta;
