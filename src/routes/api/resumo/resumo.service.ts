import Receita, { ReceitaInput } from "../../../database/models/Receita.model";
import { col, fn, Sequelize, WhereOptions } from "sequelize";
import Despesa, { DespesaInput } from "../../../database/models/despesa.model";
import Categoria from "../../../database/models/categoria.model";

export const getReceitas = (
	where?: WhereOptions<ReceitaInput>
): Promise<number> => {
	return Receita.sum("valor", {
		where: where,
	});
};

export const getDespesas = (
	where?: WhereOptions<DespesaInput>
): Promise<number> => {
	return Despesa.sum("valor", {
		where: where,
	});
};

export const getDespesasByCategoria = async (
	where?: WhereOptions<DespesaInput>
): Promise<any> => {
	return Despesa.findAll({
		attributes: [
			"categoria_id",
			[col("categ.nome"), "categoria_nome"],
			[fn("sum", col("valor")), "valor"],
		],
		include: [
			{
				model: Categoria,
				as: "categ",
				attributes: [],
			},
		],
		group: ["categoria_id", "categ.nome"],
		where: where,
		raw: true,
		nest: true,
	});
};
