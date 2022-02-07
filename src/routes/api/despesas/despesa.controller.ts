import { NextFunction, Request, Response } from "express";
import ApiError from "../../../error/ApiError";
import { DespesaInput } from "../../../database/models/Despesa.model";
import * as DespesaServices from "./despesa.service";
import { Op } from "sequelize";
import moment from "moment";

class DespesaController {
	public async createDespesa(
		req: Request<{}, {}, DespesaInput>,
		res: Response,
		next: NextFunction
	) {
		try {
			const Despesa = await DespesaServices.create(req.body);
			res.status(200).json(Despesa);
		} catch (e) {
			next(e);
		}
	}

	public async getByQuery(
		req: Request<{}, {}, {}, { descricao: string }>,
		res: Response,
		next: NextFunction
	) {
		if (!req.query.descricao) {
			next();
			return;
		}

		try {
			const Despesa = await DespesaServices.getAll(
				{
					includeDeleted: false,
					isDeleted: false,
				},
				{
					descricao: {
						[Op.iLike]: `%${req.query.descricao}%`
					}
				}
			);
			res.status(200).json(Despesa);
		} catch (e) {
			next(e);
		}
	}

	public async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const Despesa = await DespesaServices.getAll(
				{
					includeDeleted: false,
					isDeleted: false,
				}
			);
			res.status(200).json(Despesa);
		} catch (e) {
			next(e);
		}
	}

	public async getById(
		req: Request<{ id: string }>,
		res: Response,
		next: NextFunction
	) {
		try {
			const Despesa = await DespesaServices.getById(req.params.id);
			res.status(200).json(Despesa);
		} catch (e) {
			next(e);
		}
	}

	public async getByAnoMes(
		req: Request<{ ano: number, mes: number }>,
		res: Response,
		next: NextFunction
	) {
		if (!req.params.ano || !req.params.mes) {
			next(
				new ApiError({
					code: 400,
					err: "Requisição inválida para /receitas/{ano}/{mes}!",
				})
			);
			return;
		}

		if(req.params.ano < 1000) {
			next(
				new ApiError({
					code: 400,
					err: `Ano: ${req.params.ano} Inválido!`,
				})
			);
			return;
		}

		if(req.params.mes <= 0 || req.params.mes > 12) {
			next(
				new ApiError({
					code: 400,
					err: `Mes: ${req.params.mes} Inválido!`,
				})
			);
			return;
		}

		try {
			const Despesa = await DespesaServices.getAll(
				{
					includeDeleted: false,
					isDeleted: false,
				},
				{
					data: {
						[Op.between]: [
							moment({ day: 1, month: req.params.mes -1, year: req.params.ano }).toDate(),
							moment({ day: 1, month: req.params.mes -1, year: req.params.ano }).endOf(`M`).toDate(),
						]
					}
				}
			);
			res.status(200).json(Despesa);
		} catch (e) {
			next(e);
		}
	}

	public async updateById(
		req: Request<{ id: string }, {}, DespesaInput>,
		res: Response,
		next: NextFunction
	) {
		try {
			if (!req.params.id) {
				throw new ApiError({
					code: 400,
					err: "Id precisa ser informado no formato: /despesas/ID",
				});
			}

			const Despesa = await DespesaServices.update(
				req.params.id,
				req.body
			);
			res.status(200).json(Despesa);
		} catch (e) {
			next(e);
		}
	}

	public async deleteById(
		req: Request<{ id: string }>,
		res: Response,
		next: NextFunction
	) {
		try {
			if (!req.params.id) {
				throw new ApiError({
					code: 400,
					err: "Id precisa ser informado no formato: /despesas/ID",
				});
			}

			const Despesa = await DespesaServices.deleteById(req.params.id);
			res.status(200).json(Despesa);
		} catch (e) {
			next(e);
		}
	}
}

export default new DespesaController();
