import { NextFunction, Request, Response } from "express";
import ApiError from "../../../error/ApiError";
import { CategoriaInput } from "../../../database/models/categoria.model";
import * as CategoriaServices from "./categoria.service";

class CategoriaController {
	public async createCategoria(
		req: Request<{}, {}, CategoriaInput>,
		res: Response,
		next: NextFunction
	) {
		try {
			const categoria = await CategoriaServices.create(req.body);
			res.status(200).json(categoria);
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
			const categoria = await CategoriaServices.getAll({
				includeDeleted: false,
				isDeleted: false,
			});
			res.status(200).json(categoria);
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
			const categoria = await CategoriaServices.getById(req.params.id);
			res.status(200).json(categoria);
		} catch (e) {
			next(e);
		}
	}

	public async updateById(
		req: Request<{ id: string }, {}, CategoriaInput>,
		res: Response,
		next: NextFunction
	) {
		try {
			if (!req.params.id) {
				throw new ApiError({
					code: 400,
					err: "Id precisa ser informado no formato: /Categorias/{ID}",
				});
			}

			const categoria = await CategoriaServices.update(
				req.params.id,
				req.body
			);
			res.status(200).json(categoria);
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
					err: "Id precisa ser informado no formato: /Categorias/{ID}",
				});
			}

			const categoria = await CategoriaServices.deleteById(
				req.params.id,
			);
			res.status(200).json(categoria);
		} catch (e) {
			next(e);
		}
	}
}

export default new CategoriaController();
