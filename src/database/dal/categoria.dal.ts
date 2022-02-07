import { Op, ValidationError } from "sequelize";
import { GetAllFilters } from "./types";
import Categoria, {
	CategoriaInput,
	CategoriaOutput,
} from "../models/categoria.model";
import ApiError from "../../error/ApiError";
import { Validator } from "validator.ts/Validator";

export const create = async (
	payload: CategoriaInput
): Promise<CategoriaOutput> => {
	const categoria = await Categoria.create(payload)
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
	return categoria;
};

export const update = async (
	id: string,
	payload: Partial<CategoriaInput>
): Promise<CategoriaOutput> => {
	const categoria = await Categoria.findByPk(id)
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

	if (!categoria) {
		// @todo throw custom error
		throw new ApiError({
			code: 400,
			err: "Categoria não encontrada!",
		});
	}

	const updatedCategoria = await (categoria as Categoria)
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
	return updatedCategoria;
};

export const getById = async (id: string): Promise<CategoriaOutput> => {
	const valid = new Validator();
	
	if (!valid.isUUID(id)) {
		throw new ApiError ({
			code: 400,
			err: 'Informe um ID Válido'
		})
	}

	const categoria = await Categoria.findByPk(id)
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
	if (!categoria) {
		// @todo throw custom error
		throw new ApiError({
			code: 400,
			err: "Categoria não encontrada!",
		});
	}
	return categoria;
};

export const deleteById = async (id: string): Promise<boolean> => {
	const deletedCategoriaCount = await Categoria.destroy({
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
	return !!deletedCategoriaCount;
};

export const getAll = async (
	filters?: GetAllFilters
): Promise<CategoriaOutput[]> => {
	return Categoria.findAll({
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
