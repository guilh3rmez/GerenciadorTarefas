class Tarefa {
    // Nosso "Banco de Dados" na memória
    static lista = [];

    // Método para listar tudo (SELECT * FROM tarefas)
    static findAll() {
        return this.lista;
    }

    // Método para criar (INSERT INTO tarefas ...)
    static create(dados) {
        // Cria o objeto da nova tarefa
        const novaTarefa = {
            id: Date.now(), // Gera ID único baseado no tempo
            titulo: dados.titulo,
            categoria: dados.categoria,
            concluida: false // Padrão: começa não concluída
        };

        // Salva na lista
        this.lista.push(novaTarefa);

        // Retorna o objeto criado para o Controller mandar de volta
        return novaTarefa;
    }
}

export default Tarefa;