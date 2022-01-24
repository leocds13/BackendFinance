import { Router } from "express";
import despesasRoutes from "./despesas/despesas.routes";
import entradasRoutes from "./entradas/entradas.routes";

const apiRoutes = Router();

apiRoutes.use('/entradas', entradasRoutes)
apiRoutes.use('/despesas', despesasRoutes)

export default apiRoutes;