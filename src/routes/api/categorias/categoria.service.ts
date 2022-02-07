import { CategoriaInput, CategoriaOutput } from "../../../database/models/categoria.model";
import * as CategoriaDal from "../../../database/dal/categoria.dal";
import { GetAllFilters } from "../../../database/dal/types";

export const create = (payload: CategoriaInput): Promise<CategoriaOutput> => {
	return CategoriaDal.create(payload);
};

export const update = (
	id: string,
	payload: Partial<CategoriaInput>
): Promise<CategoriaOutput> => {
	return CategoriaDal.update(id, payload);
};

export const getById = (id: string): Promise<CategoriaOutput> => {
	return CategoriaDal.getById(id);
};

export const deleteById = (id: string): Promise<boolean> => {
	return CategoriaDal.deleteById(id);
};

export const getAll = (filters: GetAllFilters): Promise<CategoriaOutput[]> => {
	return CategoriaDal.getAll(filters);
};
