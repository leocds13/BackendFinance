import { NextFunction, Request, Response } from "express";
import ApiError from "./ApiError";

export default function ErrorHandler(
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) {
	
	if (err instanceof ApiError) {
		res.status(err.code).json(err.err);
		return;
	}
	console.log(err);

	res.status(500).json(
		"Desculpe-nos por isso mas algo deu errado internamente"
	);
}
