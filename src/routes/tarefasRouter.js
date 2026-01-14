import express from "express";
import TarefaController from "../controllers/TarefaController.js";

const router = express.Router();

router

    .get("/tarefas", TarefaController.listar)

    .post("/tarefas", TarefaController.adicionar);


export default router;