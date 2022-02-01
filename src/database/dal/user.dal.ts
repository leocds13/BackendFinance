import { Op, ValidationError } from "sequelize";
import { GetAllFilters } from "./types";
import User, { UserInput, UserOutput } from "../models/user.model";
import ApiError from "../../error/ApiError";

export const create = async (payload: UserInput): Promise<UserOutput> => {
	const user = await User.create(payload)
		.then((value) => value)
		.catch((e) => {
			if (!(e instanceof ValidationError)) {
				throw e;
			}

			throw new ApiError({
				code: 400,
				err: e,
			});
		});
	return user;
};

export const update = async (
	id: string,
	payload: Partial<UserInput>
): Promise<UserOutput> => {
	const user = await User.findByPk(id)
		.then((value) => value)
		.catch((e) => {
			if (!(e instanceof ValidationError)) {
				throw e;
			}

			throw new ApiError({
				code: 400,
				err: e,
			});
		});

	if (!user) {
		// @todo throw custom error
		throw new ApiError({
			code: 400,
			err: "Usuario não encontrado!"
		});
	}
	
	const updatedUser = await (user as User)
		.update(payload)
		.then((value) => value)
		.catch((e) => {
			if (!(e instanceof ValidationError)) {
				throw e;
			}

			throw new ApiError({
				code: 400,
				err: e,
			});
		});
	return updatedUser;
};

export const getById = async (id: string): Promise<UserOutput> => {
	const user = await User.findByPk(id)
		.then((value) => value)
		.catch((e) => {
			if (!(e instanceof ValidationError)) {
				throw e;
			}

			throw new ApiError({
				code: 400,
				err: e,
			});
		});
	if (!user) {
		// @todo throw custom error
		throw new ApiError({
			code: 400,
			err: "Usuario não encontrado!"
		});
	}
	return user;
};

export const deleteById = async (id: string): Promise<boolean> => {
	const deletedUserCount = await User.destroy({
		where: { id },
	})
		.then((value) => value)
		.catch((e) => {
			if (!(e instanceof ValidationError)) {
				throw e;
			}

			throw new ApiError({
				code: 400,
				err: e,
			});
		});
	return !!deletedUserCount;
};

export const getAll = async (
	filters?: GetAllFilters
): Promise<UserOutput[]> => {
	return User.findAll({
		where: {
			...(filters?.isDeleted && { deletedAt: { [Op.not]: null } }),
		},
		...((filters?.isDeleted || filters?.includeDeleted) && {
			paranoid: true,
		}),
	})
		.then((value) => value)
		.catch((e) => {
			if (!(e instanceof ValidationError)) {
				throw e;
			}

			throw new ApiError({
				code: 400,
				err: e,
			});
		});
};
