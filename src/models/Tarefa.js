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

    // Atualiza uma tarefa existente
    static update(id, dadosNovos) {
        // Encontra o índice da tarefa na lista (0, 1, 2...)
        const index = this.lista.findIndex(t => t.id == id);
        
        // Se não achou (index -1), retorna null
        if (index === -1) return null;

        // Atualiza a tarefa mantendo o ID original e sobrescrevendo o resto
        // O operador ... (spread) mistura os dados velhos com os novos
        this.lista[index] = { 
            ...this.lista[index], 
            ...dadosNovos 
        };

        return this.lista[index];
    }

    static delete(idDeletar) {
        //verifica se o ID difere da que quero apagar
        const novaListaFiltrada = this.lista.filter((tarefa) => {
            if (tarefa.id != idDeletar) {
                //não excluir
                return true;
            } else {
                //exclui
                return false;
            }
            
        });

        this.lista = novaListaFiltrada;
        return true;
    }
}

export default Tarefa;