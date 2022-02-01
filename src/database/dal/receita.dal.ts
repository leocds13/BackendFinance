import { Op, ValidationError } from "sequelize";
import { GetAllFilters } from "./types";
import Receita, { ReceitaInput, ReceitaOutput } from "../models/Receita.model";
import ApiError from "../../error/ApiError";

export const create = async (payload: ReceitaInput): Promise<ReceitaOutput> => {
	const receita = await Receita.create(payload)
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
	return receita;
};

export const update = async (
	id: string,
	payload: Partial<ReceitaInput>
): Promise<ReceitaOutput> => {
	const receita = await Receita.findByPk(id)
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

	if (!receita) {
		// @todo throw custom error
		throw new ApiError({
			code: 400,
			err: "Receuta não encontrada!"
		});
	}
	
	const updatedReceita = await (receita as Receita)
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
	return updatedReceita;
};

export const getById = async (id: string): Promise<ReceitaOutput> => {
	const receita = await Receita.findByPk(id)
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
	if (!receita) {
		// @todo throw custom error
		throw new ApiError({
			code: 400,
			err: "Receita não encontrada!"
		});
	}
	return receita;
};

export const deleteById = async (id: string): Promise<boolean> => {
	const deletedReceitaCount = await Receita.destroy({
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
	return !!deletedReceitaCount;
};

export const getAll = async (
	filters?: GetAllFilters
): Promise<ReceitaOutput[]> => {
	return Receita.findAll({
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
