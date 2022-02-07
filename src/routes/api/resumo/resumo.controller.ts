import { NextFunction, Request, Response } from "express";
import ApiError from "../../../error/ApiError";
import * as ResumoServices from "./resumo.service";
import { Op } from "sequelize";
import moment from "moment";

class ResumoController {
	public async getByAnoMes(
		req: Request<{ ano: number; mes: number }>,
		res: Response,
		next: NextFunction
	) {
		try {
			const where = {
				data: {
					[Op.between]: [
						moment({
							day: 1,
							month: req.params.mes - 1,
							year: req.params.ano,
						}).toDate(),
						moment({
							day: 1,
							month: req.params.mes - 1,
							year: req.params.ano,
						})
							.endOf("M")
							.toDate(),
					],
				},
			};

			const receitas = ResumoServices.getReceitas(where);
			const despesas = ResumoServices.getDespesas(where);
			const despesasOfEachCateg =
				ResumoServices.getDespesasByCategoria(where);

			const totalOfEachCateg = (await despesasOfEachCateg).reduce(
				(anterior: any, atual: any) => {
					return {
						...anterior,
						[atual.categoria_nome
							? atual.categoria_nome
							: atual.categoria_id]: {
							id: atual.categoria_id,
							valor: atual.valor,
						},
					};
				},
				{}
			);

			const results = {
				totalReceitas: await receitas,
				totalDespesas: await despesas,
				saldo: (await receitas) - (await despesas),
				categorias: totalOfEachCateg,
			};

			res.status(200).json(results);
		} catch (e) {
			next(e);
		}
	}
}

export default new ResumoController();
