import { NextFunction, Request, Response } from "express";
import ApiError from "../../../error/ApiError";
import { ReceitaInput } from "../../../database/models/Receita.model";
import * as ReceitaServices from "./receita.service";

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

	public async getAll(
		req: Request<{ id: string }>,
		res: Response,
		next: NextFunction
	) {
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

			const Receita = await ReceitaServices.deleteById(
				req.params.id,
			);
			res.status(200).json(Receita);
		} catch (e) {
			next(e);
		}
	}
}

export default new ReceitaController();
