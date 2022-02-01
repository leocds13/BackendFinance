import { NextFunction, Request, Response } from "express";
import ApiError from "../../../error/ApiError";
import { DespesaInput } from "../../../database/models/Despesa.model";
import * as DespesaServices from "./despesa.service";

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

	public async getAll(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			const Despesa = await DespesaServices.getAll({
				includeDeleted: false,
				isDeleted: false,
			});
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

	public async updateById(
		req: Request<{ id: string }, {}, DespesaInput>,
		res: Response,
		next: NextFunction
	) {
		try {
			if (!req.params.id) {
				throw new ApiError({
					code: 400,
					err: "Id precisa ser informado no formato: /Despesas/ID",
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
					err: "Id precisa ser informado no formato: /Despesas/ID",
				});
			}

			const Despesa = await DespesaServices.deleteById(
				req.params.id,
			);
			res.status(200).json(Despesa);
		} catch (e) {
			next(e);
		}
	}
}

export default new DespesaController();
