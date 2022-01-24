import { Router } from "express"

const usersRoutes = Router()

usersRoutes.get('/', (req, res, next) => { res.json('Funfo') })

export default usersRoutes;