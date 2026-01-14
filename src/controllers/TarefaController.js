import Tarefa from "../models/Tarefa.js"; // Garanta que o nome do arquivo bate com o import!

class TarefaController {

    static listar = (req, res) => {
        try {
            const listaResultado = Tarefa.findAll();
            res.status(200).json(listaResultado);
        } catch (erro) {
            res.status(500).json({ message: "Erro interno no servidor" });
        }
    }

    static adicionar = (req, res) => {
        try {
            const tarefaCriada = req.body;
            
            // Chama a fábrica
            const tarefaSalva = Tarefa.create(tarefaCriada);

            // Retorna 201 (Criado) e o JSON do objeto
            res.status(201).json(tarefaSalva);

        } catch (erro) {
            // Se algo explodir, cai aqui (Erro 500 = Erro do Servidor)
            res.status(500).json({ message: `${erro.message} - Falha ao cadastrar tarefa.` });
        }
    }
}

export default TarefaController;