import { Router } from "express";
import UserController from "./user.controller";

const usersRoutes = Router();

usersRoutes.get("/:id", UserController.getById);
usersRoutes.post("/", UserController.createUser);

export default usersRoutes;
