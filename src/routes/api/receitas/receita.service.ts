import {
	ReceitaInput,
	ReceitaOutput,
} from "../../../database/models/Receita.model";
import * as ReceitaDal from "../../../database/dal/Receita.dal";
import { GetAllFilters } from "../../../database/dal/types";
import { WhereOptions } from "sequelize";

export const create = (payload: ReceitaInput): Promise<ReceitaOutput> => {
	return ReceitaDal.create(payload);
};

export const update = (
	id: string,
	payload: Partial<ReceitaInput>
): Promise<ReceitaOutput> => {
	return ReceitaDal.update(id, payload);
};

export const getById = (id: string): Promise<ReceitaOutput> => {
	return ReceitaDal.getById(id);
};

export const deleteById = (id: string): Promise<boolean> => {
	return ReceitaDal.deleteById(id);
};

export const getAll = (
	filters: GetAllFilters,
	where?: WhereOptions<ReceitaInput>
): Promise<ReceitaOutput[]> => {
	return ReceitaDal.getAll(filters, where);
};
