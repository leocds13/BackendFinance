import { Router } from "express"
import receitaController from "./receita.controller";

const receitasRoutes = Router()

receitasRoutes.post('/', receitaController.createReceita)

receitasRoutes.get('/', receitaController.getByQuery, receitaController.getAll)
receitasRoutes.get('/:id', receitaController.getById)
receitasRoutes.get('/:ano/:mes', receitaController.getByAnoMes)

receitasRoutes.put('/', receitaController.updateById)
receitasRoutes.put('/:id', receitaController.updateById)
receitasRoutes.patch('/', receitaController.updateById)
receitasRoutes.patch('/:id', receitaController.updateById)

receitasRoutes.delete('/:id', receitaController.deleteById)

export default receitasRoutes;