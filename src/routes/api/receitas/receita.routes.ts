import { Router } from "express"
import receitaController from "./receita.controller";

const entradasRoutes = Router()

entradasRoutes.post('/', receitaController.createReceita)

entradasRoutes.get('/', receitaController.getAll)
entradasRoutes.get('/:id', receitaController.getById)

entradasRoutes.put('/', receitaController.updateById)
entradasRoutes.put('/:id', receitaController.updateById)
entradasRoutes.patch('/', receitaController.updateById)
entradasRoutes.patch('/:id', receitaController.updateById)

entradasRoutes.delete('/:id', receitaController.deleteById)

export default entradasRoutes;