import { Op, ValidationError } from "sequelize";
import { GetAllFilters } from "./types";
import User, { UserInput, UserOutput } from "../models/user.model";
import ApiError from "../../error/ApiError";
import Categoria from "../models/categoria.model";
import { isUUID } from "../../utils/validator";

export const create = async (payload: UserInput): Promise<UserOutput> => {
	const user = await User.create(payload)
		.then((value) => value)
		.catch((e) => {
			if (!(e instanceof ValidationError)) {
				throw e;
			}

			throw new ApiError({
				code: 400,
				err: e,
			});
		});

	await Categoria.findOrCreate({
		where: { nome: "Alimentação" },
		defaults: {
			user_id: user.id,
			nome: "Alimentação",
			descricao:
				"Use esta Categoria para suas receitas e despesas de Alimentação",
		},
	});

	await Categoria.findOrCreate({
		where: { nome: "Saúde" },
		defaults: {
			user_id: user.id,
			nome: "Saúde",
			descricao:
				"Use esta Categoria para suas receitas e despesas de Saúde",
		},
	});

	await Categoria.findOrCreate({
		where: { nome: "Moradia" },
		defaults: {
			user_id: user.id,
			nome: "Moradia",
			descricao:
				"Use esta Categoria para suas receitas e despesas de Moradia",
		},
	});

	await Categoria.findOrCreate({
		where: { nome: "Transporte" },
		defaults: {
			user_id: user.id,
			nome: "Transporte",
			descricao:
				"Use esta Categoria para suas receitas e despesas de Transporte",
		},
	});

	await Categoria.findOrCreate({
		where: { nome: "Educação" },
		defaults: {
			user_id: user.id,
			nome: "Educação",
			descricao:
				"Use esta Categoria para suas receitas e despesas de Educação",
		},
	});

	await Categoria.findOrCreate({
		where: { nome: "Lazer" },
		defaults: {
			user_id: user.id,
			nome: "Lazer",
			descricao:
				"Use esta Categoria para suas receitas e despesas de Lazer",
		},
	});

	await Categoria.findOrCreate({
		where: { nome: "Imprevistos" },
		defaults: {
			user_id: user.id,
			nome: "Imprevistos",
			descricao:
				"Use esta Categoria para suas receitas e despesas de Imprevistos",
		},
	});

	return user;
};

export const update = async (
	id: string,
	payload: Partial<UserInput>
): Promise<UserOutput> => {
	if (!isUUID(id)) {
		throw new ApiError({
			code: 400,
			err: "Informe um ID Válido",
		});
	}

	const user = await User.findByPk(id)
		.then((value) => value)
		.catch((e) => {
			if (!(e instanceof ValidationError)) {
				throw e;
			}

			throw new ApiError({
				code: 400,
				err: e,
			});
		});

	if (!user) {
		// @todo throw custom error
		throw new ApiError({
			code: 400,
			err: "Usuario não encontrado!",
		});
	}

	const updatedUser = await (user as User)
		.update(payload)
		.then((value) => value)
		.catch((e) => {
			if (!(e instanceof ValidationError)) {
				throw e;
			}

			throw new ApiError({
				code: 400,
				err: e,
			});
		});
	return updatedUser;
};

export const getById = async (id: string): Promise<UserOutput> => {
	if (!isUUID(id)) {
		throw new ApiError({
			code: 400,
			err: "Informe um ID Válido",
		});
	}

	const user = await User.findByPk(id)
		.then((value) => value)
		.catch((e) => {
			if (!(e instanceof ValidationError)) {
				throw e;
			}

			throw new ApiError({
				code: 400,
				err: e,
			});
		});
	if (!user) {
		// @todo throw custom error
		throw new ApiError({
			code: 400,
			err: "Usuario não encontrado!",
		});
	}
	return user;
};

export const deleteById = async (id: string): Promise<boolean> => {
	if (!isUUID(id)) {
		throw new ApiError({
			code: 400,
			err: "Informe um ID Válido",
		});
	}

	const deletedUserCount = await User.destroy({
		where: { id },
	})
		.then((value) => value)
		.catch((e) => {
			if (!(e instanceof ValidationError)) {
				throw e;
			}

			throw new ApiError({
				code: 400,
				err: e,
			});
		});
	return !!deletedUserCount;
};

export const getAll = async (
	filters?: GetAllFilters
): Promise<UserOutput[]> => {
	return User.findAll({
		where: {
			...(filters?.isDeleted && { deletedAt: { [Op.not]: null } }),
		},
		...((filters?.isDeleted || filters?.includeDeleted) && {
			paranoid: true,
		}),
	})
		.then((value) => value)
		.catch((e) => {
			if (!(e instanceof ValidationError)) {
				throw e;
			}

			throw new ApiError({
				code: 400,
				err: e,
			});
		});
};
