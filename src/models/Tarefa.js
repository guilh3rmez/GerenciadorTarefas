class Tarefa {
    static lista = [];
    static findAll() {
        return this.lista;
    }
    static create(dados) {
        const novaTarefa = {
            id: Date.now(),
            titulo: dados.titulo,
            categoria: dados.categoria,
            concluida: false
        };
        this.lista.push(novaTarefa);
        return novaTarefa;
    }

    static update(id, dadosNovos) {
        const index = this.lista.findIndex(t => t.id == id);
        if (index === -1) return null;
        this.lista[index] = { 
            ...this.lista[index], 
            ...dadosNovos 
        };

        return this.lista[index];
    }

    static delete(idDeletar) {
        const novaListaFiltrada = this.lista.filter((tarefa) => {
            if (tarefa.id != idDeletar) {
                return true;
            } else {
                return false;
            }
            
        });

        this.lista = novaListaFiltrada;
        return true;
    }
}

export default Tarefa;