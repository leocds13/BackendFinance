import { Router } from "express";
import apiRoutes from "./api";
import usersRoutes from "./users/user.routes";

const rootRoutes = Router();

rootRoutes.use('/user', usersRoutes)
rootRoutes.use('/api', apiRoutes)

export default rootRoutes;