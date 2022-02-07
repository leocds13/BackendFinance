import { Op, ValidationError, WhereOptions } from "sequelize";
import { GetAllFilters } from "./types";
import Despesa, { DespesaInput, DespesaOutput } from "../models/Despesa.model";
import ApiError from "../../error/ApiError";
import Categoria from "../models/categoria.model";

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
		.update({ vlr_em_categoria: categoria.vlr_em_categoria + vlrAntigo })
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
		.update({ vlr_em_categoria: categoria.vlr_em_categoria - vlrNovo })
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

	atualizaVlrEmCategoria(despesa.categoria_id, 0, despesa.categoria_id, despesa.valor);

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
			err: "Despesa não encontrada!",
		});
	}

	const categoriaAntiga = despesa.categoria_id;
	const valorAntigo = despesa.valor;

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

	atualizaVlrEmCategoria(
		categoriaAntiga,
		valorAntigo,
		updatedDespesa.categoria_id,
		updatedDespesa.valor
	);

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

	const categoria = despesa.categoria_id
	const valor = despesa.valor

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

	atualizaVlrEmCategoria(categoria, valor, categoria, 0)

	return !!deletedDespesaCount;
};

export const getAll = async (
	filters?: GetAllFilters,
	where?: WhereOptions<Despesa>
): Promise<DespesaOutput[]> => {
	return Despesa.findAll({
		where: {
			...(filters?.isDeleted && { deletedAt: { [Op.not]: null } }),
			...where
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
