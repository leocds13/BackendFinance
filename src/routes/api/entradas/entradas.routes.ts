import { Router } from "express"

const entradasRoutes = Router()

entradasRoutes.get('/', (req, res, next) => { res.json('Funfo') })

export default entradasRoutes;