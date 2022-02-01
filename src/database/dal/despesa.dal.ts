import { Op, ValidationError } from "sequelize";
import { GetAllFilters } from "./types";
import Despesa, { DespesaInput, DespesaOutput } from "../models/Despesa.model";
import ApiError from "../../error/ApiError";

export const create = async (payload: DespesaInput): Promise<DespesaOutput> => {
	const despesa = await Despesa.create(payload)
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
	return despesa;
};

export const update = async (
	id: string,
	payload: Partial<DespesaInput>
): Promise<DespesaOutput> => {
	const despesa = await Despesa.findByPk(id)
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

	if (!despesa) {
		// @todo throw custom error
		throw new ApiError({
			code: 400,
			err: "Receuta não encontrada!",
		});
	}

	const updatedDespesa = await (despesa as Despesa)
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
	return updatedDespesa;
};

export const getById = async (id: string): Promise<DespesaOutput> => {
	const despesa = await Despesa.findByPk(id)
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
	if (!despesa) {
		// @todo throw custom error
		throw new ApiError({
			code: 400,
			err: "Despesa não encontrada!",
		});
	}
	return despesa;
};

export const deleteById = async (id: string): Promise<boolean> => {
	const deletedDespesaCount = await Despesa.destroy({
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
	return !!deletedDespesaCount;
};

export const getAll = async (
	filters?: GetAllFilters
): Promise<DespesaOutput[]> => {
	return Despesa.findAll({
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
