import { NextFunction, Request, Response } from "express";
import { UserInput } from "../../database/models/user.model";
import * as UserServices from "./user.service";

class UserController {
	public async getById(
		req: Request<{ id: string }>,
		res: Response,
		next: NextFunction
	) {
		try {
			const user = await UserServices.getById(req.params.id);
			res.status(200).json(user);
		} catch (e) {
            next(e);
		}
	}

	public async createUser(
		req: Request<{}, {}, UserInput>,
		res: Response,
		next: NextFunction
	) {
		try {
			const user = await UserServices.create(req.body);
			res.status(200).json(user);
		} catch (e) {
			next(e);
		}
	}
}

export default new UserController();
