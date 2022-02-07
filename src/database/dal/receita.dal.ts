import { Op, ValidationError, WhereOptions } from "sequelize";
import { GetAllFilters } from "./types";
import Receita, { ReceitaInput, ReceitaOutput } from "../models/Receita.model";
import ApiError from "../../error/ApiError";
import Categoria from "../models/categoria.model";
import { isUUID } from "../../utils/validator";

async function atualizaVlrEmCategoria(
	categoriaAntiga: string,
	vlrAntigo: number,
	categoriaNova: string,
	vlrNovo: number
) {
	let categoria = await Categoria.findByPk(categoriaAntiga)
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

	await (categoria as Categoria)
		.update({ vlr_em_categoria: categoria.vlr_em_categoria - vlrAntigo })
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

	categoria = await Categoria.findByPk(categoriaNova)
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

	await (categoria as Categoria)
		.update({ vlr_em_categoria: categoria.vlr_em_categoria + vlrNovo })
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
}

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

	atualizaVlrEmCategoria(
		receita.categoria_id,
		0,
		receita.categoria_id,
		receita.valor
	);

	return receita;
};

export const update = async (
	id: string,
	payload: Partial<ReceitaInput>
): Promise<ReceitaOutput> => {
	if (!isUUID(id)) {
		throw new ApiError({
			code: 400,
			err: "Informe um ID Válido",
		});
	}

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
			err: "Receita não encontrada!",
		});
	}

	const categoriaAntiga = receita.categoria_id;
	const valorAntigo = receita.valor;

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

	atualizaVlrEmCategoria(
		categoriaAntiga,
		valorAntigo,
		updatedReceita.categoria_id,
		updatedReceita.valor
	);

	return updatedReceita;
};

export const getById = async (id: string): Promise<ReceitaOutput> => {
	if (!isUUID(id)) {
		throw new ApiError({
			code: 400,
			err: "Informe um ID Válido",
		});
	}

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
			err: "Receita não encontrada!",
		});
	}

	return receita;
};

export const deleteById = async (id: string): Promise<boolean> => {
	if (!isUUID(id)) {
		throw new ApiError({
			code: 400,
			err: "Informe um ID Válido",
		});
	}

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
			err: "Receita não encontrada!",
		});
	}

	const categoria = receita.categoria_id;
	const valor = receita.valor;

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

	atualizaVlrEmCategoria(categoria, valor, categoria, 0);

	return !!deletedReceitaCount;
};

export const getAll = async (
	filters?: GetAllFilters,
	where?: WhereOptions<Receita>
): Promise<ReceitaOutput[]> => {
	return Receita.findAll({
		where: {
			...(filters?.isDeleted && { deletedAt: { [Op.not]: null } }),
			...(where && where),
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
