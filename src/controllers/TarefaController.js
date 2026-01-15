import Tarefa from "../models/Tarefa.js";

class TarefaController {

    static listar = (req, res) => {
        try {
            const listaResultado = Tarefa.findAll();
            res.status(200).json(listaResultado);
        } catch (erro) {
            res.status(500).json({ message: "Erro interno no servidor" });
        }
    }

    static deletar = (req, res) => {
    try {
        // 1. Pegamos o ID que veio na URL
        const idParaDeletar = req.params.id;

        // 2. Chamamos o Model passando a variável certa
        Tarefa.delete(idParaDeletar);

        // 3. Devolvemos uma mensagem de sucesso
        res.status(200).json({ message: "Tarefa deletada com sucesso!" });

    } catch (erro) {
        res.status(500).json({ message: "Erro interno no servidor" });
    }
    }

    static atualizar = (req, res) => {
        const id = req.params.id;
        const dados = req.body;
        
        const tarefaAtualizada = Tarefa.update(id, dados);

        if (tarefaAtualizada) {
            res.status(200).json(tarefaAtualizada);
        } else {
            res.status(404).json({ message: "Tarefa não encontrada" });
        }
    }

    static adicionar = (req, res) => {
        try {
            const tarefaCriada = req.body;
            const tarefaSalva = Tarefa.create(tarefaCriada);
            res.status(201).json(tarefaSalva);

        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha ao cadastrar tarefa.` });
        }
    }
}

export default TarefaController;