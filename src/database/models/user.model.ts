import Sequelize, {
	HasManyAddAssociationMixin,
	HasManyCountAssociationsMixin,
	HasManyCreateAssociationMixin,
	HasManyGetAssociationsMixin,
	HasManyHasAssociationMixin,
	Model,
	Optional,
} from "sequelize";
import bcrypt from "bcryptjs";
import sequelizeConnection from "../../config/database";
import Categoria from "./categoria.model";

interface UserAttributes {
	id: string;
	nome: string;
	email: string;
	senha: string;
	telefone: string;
	token: string;

	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date;
}

export interface UserInput extends Optional<UserAttributes, "id" | "token"> {}
export interface UserOutput extends Required<Omit<UserAttributes, "senha">> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
	public id!: string;
	public nome!: string;
	public email!: string;
	public senha: string;
	public telefone!: string;
	public token!: string;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
	public readonly deletedAt!: Date;

	public async checkPassword(senha: string): Promise<boolean> {
		return bcrypt.compare(senha, this.senha);
	}

	declare getCategorias: HasManyGetAssociationsMixin<Categoria>; // Note the null assertions!
	declare addCategoria: HasManyAddAssociationMixin<Categoria, string>;
	declare hasCategoria: HasManyHasAssociationMixin<Categoria, string>;
	declare countCategorias: HasManyCountAssociationsMixin;
	declare createCategoria: HasManyCreateAssociationMixin<Categoria>;
}

User.init(
	{
		id: {
			type: Sequelize.UUID,
			primaryKey: true,
			unique: true,
			defaultValue: Sequelize.UUIDV4,
		},
		nome: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				isAlpha: { msg: "Informe um valor válido" },
			},
		},
		email: {
			type: Sequelize.STRING,
			unique: {
				name: "email",
				msg: "Email já cadastrado",
			},
			allowNull: false,
			validate: {
				isEmail: { msg: "Informe um email válido" },
				notNull: { msg: "Email é Obrigatório" },
			},
		},
		senha: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				notNull: { msg: "Senha é Obrigatório" },
				is: {
					args: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z])/,
					msg: "Senha precisa ter\n1 Letra Mauscula\n1 Caracter Especial\n2 Numeros\n2 Letras minusculas",
				},
				len: {
					args: [8, 255],
					msg: "A Senha precisa ter no minimo 8 caracteres.",
				},
			},
			get() {
				return undefined;
			},
		},
		telefone: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				notNull: { msg: "Telefone é Obrigatório" },
				len: {
					args: [10, 11],
					msg: "Telefone inválido",
				},
				is: {
					args: /^([0-9]*)$/,
					msg: "Telefone aceita apenas números.",
				},
			},
		},
		token: {
			type: Sequelize.UUID,
			unique: true,
			defaultValue: Sequelize.UUIDV4,
		},
	},
	{
		modelName: "user",
		freezeTableName: true,
		timestamps: true,
		sequelize: sequelizeConnection,
		paranoid: true,
		defaultScope: {
			attributes: {
				exclude: ["senha"],
			},
		},
	}
);



User.addHook("beforeSave", async (user: User): Promise<void> => {
	console.log('hook', user)
	if (user.senha) {
		user.senha = await bcrypt.hash(user.senha, 8);
	}
	console.log('hook', user)
});

export default User;
