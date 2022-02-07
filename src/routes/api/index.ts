import { Router } from "express";
import despesasRoutes from "./despesas/despesa.routes";
import receitasRoutes from "./receitas/receita.routes";
import categoriasRoutes from "./categorias/categoria.routes";
import resumoRoutes from "./resumo/resumo.routes";

const apiRoutes = Router();

apiRoutes.use('/receitas', receitasRoutes)
apiRoutes.use('/despesas', despesasRoutes)
apiRoutes.use('/categorias', categoriasRoutes)
apiRoutes.use('/resumo', resumoRoutes)

export default apiRoutes;