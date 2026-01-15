// src/routes/tarefasRouter.js

// 1. IMPORTAÇÕES
// Importamos o Express para ter acesso ao Router()
import express from "express";
// Importamos o Controller, que é quem tem as funções (a lógica) que as rotas vão chamar
import TarefaController from "../controllers/TarefaController.js";

// 2. INSTÂNCIA DO ROTEADOR
// O Router funciona como um "mini-aplicativo". Ele agrupa rotas parecidas.
// Isso ajuda a não deixar o app.js gigante e bagunçado.
const router = express.Router();

// 3. DEFINIÇÃO DAS ROTAS
// A sintaxe é sempre: .verboHTTP('caminho', FunçãoDoController)

router
    // GET: Usado para buscar/ler dados
    // Quando o usuário acessar 'localhost:3000/tarefas', chama o método listar
    .get("/tarefas", TarefaController.listar)

    // POST: Usado para enviar/criar dados
    // Quando o usuário enviar dados para 'localhost:3000/tarefas', chama o método adicionar
    .post("/tarefas", TarefaController.adicionar)

    // DELETE: Usado para remover dados
    // O trecho "/:id" é um PARÂMETRO DE ROTA. 
    // Diz ao Express: "Capture qualquer coisa que vier depois da barra e chame de 'id'".
    // Ex: /tarefas/123 -> id = 123
    .delete("/tarefas/:id", TarefaController.deletar)

    .put("/tarefas/:id", TarefaController.atualizar);

// 4. EXPORTAÇÃO
// Exportamos essa variável 'router' para ser usada no app.js (app.use(router))
export default router;