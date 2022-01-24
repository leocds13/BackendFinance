import { Router } from "express"

const despesasRoutes = Router()

despesasRoutes.get('/', (req, res, next) => { res.json('Funfo') })

export default despesasRoutes;