import express from "express";
import TarefaController from "../controllers/TarefaController.js";
const router = express.Router();

router
    .get("/tarefas", TarefaController.listar)
    .post("/tarefas", TarefaController.adicionar)
    .delete("/tarefas/:id", TarefaController.deletar)
    .put("/tarefas/:id", TarefaController.atualizar);

export default router;