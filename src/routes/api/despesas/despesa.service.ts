import {
	DespesaInput,
	DespesaOutput,
} from "../../../database/models/Despesa.model";
import * as DespesaDal from "../../../database/dal/Despesa.dal";
import { GetAllFilters } from "../../../database/dal/types";
import { WhereOptions } from "sequelize";

export const create = (payload: DespesaInput): Promise<DespesaOutput> => {
	return DespesaDal.create(payload);
};

export const update = (
	id: string,
	payload: Partial<DespesaInput>
): Promise<DespesaOutput> => {
	return DespesaDal.update(id, payload);
};

export const getById = (id: string): Promise<DespesaOutput> => {
	return DespesaDal.getById(id);
};

export const deleteById = (id: string): Promise<boolean> => {
	return DespesaDal.deleteById(id);
};

export const getAll = (
	filters: GetAllFilters,
	where?: WhereOptions<DespesaInput>
): Promise<DespesaOutput[]> => {
	return DespesaDal.getAll(filters, where);
};
