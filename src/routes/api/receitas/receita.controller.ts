import { NextFunction, Request, Response } from "express";
import ApiError from "../../../error/ApiError";
import { ReceitaInput } from "../../../database/models/Receita.model";
import * as ReceitaServices from "./receita.service";
import { Op } from "sequelize";
import moment from "moment";

class ReceitaController {
	public async createReceita(
		req: Request<{}, {}, ReceitaInput>,
		res: Response,
		next: NextFunction
	) {
		try {
			const Receita = await ReceitaServices.create(req.body);
			res.status(200).json(Receita);
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
			const Receita = await ReceitaServices.getAll(
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
			res.status(200).json(Receita);
		} catch (e) {
			next(e);
		}
	}

	public async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const Receita = await ReceitaServices.getAll({
				includeDeleted: false,
				isDeleted: false,
			});
			res.status(200).json(Receita);
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
			const Receita = await ReceitaServices.getById(req.params.id);
			res.status(200).json(Receita);
		} catch (e) {
			next(e);
		}
	}

	public async getByAnoMes(
		req: Request<{ ano: number; mes: number }>,
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
			const receita = await ReceitaServices.getAll(
				{
					includeDeleted: false,
					isDeleted: false,
				},
				{
					data: {
						[Op.between]: [
							moment({day: 1, month: req.params.mes - 1, year: req.params.ano}).toDate(),
							moment({day: 1, month: req.params.mes - 1, year: req.params.ano}).endOf('month').toDate()
						]
					}
				}
			);
			res.status(200).json(receita);
		} catch (e) {
			next(e);
		}
	}

	public async updateById(
		req: Request<{ id: string }, {}, ReceitaInput>,
		res: Response,
		next: NextFunction
	) {
		try {
			if (!req.params.id) {
				throw new ApiError({
					code: 400,
					err: "Id precisa ser informado no formato: /receitas/ID",
				});
			}

			const Receita = await ReceitaServices.update(
				req.params.id,
				req.body
			);
			res.status(200).json(Receita);
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
					err: "Id precisa ser informado no formato: /receitas/ID",
				});
			}

			const Receita = await ReceitaServices.deleteById(req.params.id);
			res.status(200).json(Receita);
		} catch (e) {
			next(e);
		}
	}
}

export default new ReceitaController();
