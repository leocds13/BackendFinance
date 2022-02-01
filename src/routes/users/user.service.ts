import { UserInput, UserOutput } from "../../database/models/user.model";
import * as UserDal from "../../database/dal/user.dal";
import { GetAllFilters } from "../../database/dal/types";

export const create = (payload: UserInput): Promise<UserOutput> => {
	return UserDal.create(payload);
};

export const update = (
	id: string,
	payload: Partial<UserInput>
): Promise<UserOutput> => {
	return UserDal.update(id, payload);
};

export const getById = (id: string): Promise<UserOutput> => {
	return UserDal.getById(id);
};

export const deleteById = (id: string): Promise<boolean> => {
	return UserDal.deleteById(id);
};

export const getAll = (filters: GetAllFilters): Promise<UserOutput[]> => {
	return UserDal.getAll(filters);
};
