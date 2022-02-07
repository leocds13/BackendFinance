import { Router } from "express"
import categoriaController from "./categoria.controller";

const entradasRoutes = Router()

entradasRoutes.post('/', categoriaController.createCategoria)

entradasRoutes.get('/', categoriaController.getAll)
entradasRoutes.get('/:id', categoriaController.getById)

entradasRoutes.put('/', categoriaController.updateById)
entradasRoutes.put('/:id', categoriaController.updateById)
entradasRoutes.patch('/', categoriaController.updateById)
entradasRoutes.patch('/:id', categoriaController.updateById)

entradasRoutes.delete('/:id', categoriaController.deleteById)

export default entradasRoutes;