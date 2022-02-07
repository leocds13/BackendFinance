import { Router } from "express"
import receitaController from "./resumo.controller";

const resumoRoutes = Router()

resumoRoutes.get('/:ano/:mes', receitaController.getByAnoMes)

export default resumoRoutes;