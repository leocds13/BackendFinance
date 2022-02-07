import { Router } from "express"
import despesaController from "./despesa.controller";

const entradasRoutes = Router()

entradasRoutes.post('/', despesaController.createDespesa)

entradasRoutes.get('/',  despesaController.getByQuery, despesaController.getAll)
entradasRoutes.get('/:id', despesaController.getById)
entradasRoutes.get('/:ano/:mes', despesaController.getByAnoMes)

entradasRoutes.put('/', despesaController.updateById)
entradasRoutes.put('/:id', despesaController.updateById)
entradasRoutes.patch('/', despesaController.updateById)
entradasRoutes.patch('/:id', despesaController.updateById)

entradasRoutes.delete('/:id', despesaController.deleteById)

export default entradasRoutes;