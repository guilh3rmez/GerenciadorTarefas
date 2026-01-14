import express from "express";
// Importa o roteador que criamos (tarefasRouter.js)
import router from "./routes/tarefasRouter.js";

// Cria a aplicação
const app = express();

// Middleware: Habilita o servidor para interpretar JSON no corpo das requisições
app.use(express.json());

// Liga o roteador à aplicação
// Agora todas as rotas definidas no 'router' (como /tarefas) fazem parte do app.
app.use(router);

// Exporta para o server.js ligar
export default app;