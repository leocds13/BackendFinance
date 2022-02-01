import { Router } from "express";
import despesasRoutes from "./despesas/despesa.routes";
import entradasRoutes from "./receitas/receita.routes";

const apiRoutes = Router();

apiRoutes.use('/receitas', entradasRoutes)
apiRoutes.use('/despesas', despesasRoutes)

export default apiRoutes;