// public/app.js

// ================================================================
// MISSÃO 1: BUSCAR TAREFAS (GET)
// ================================================================
async function buscarTarefas() {
    try {
        // Faz a chamada para o nosso Back-end na rota '/tarefas'
        const response = await fetch('/tarefas');

        // Verifica se a resposta foi OK (Status 200-299)
        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        // Converte a resposta (que vem como texto) para JSON (Objeto JS)
        const data = await response.json();

        // Chama a função de desenhar na tela passando a lista recebida
        renderizarTarefa(data);

    } catch (error) {
        console.error('Houve um problema com as tarefas', error);
    }
}

// ================================================================
// MISSÃO 2: RENDERIZAR NA TELA (DOM)
// ================================================================
function renderizarTarefa(lista) {
    // 1. Seleciona a lista UL do HTML
    const ul = document.getElementById('task-list');
    
    // 2. Limpa o HTML atual para não duplicar itens ao atualizar
    ul.innerHTML = ''; 

    // 3. Percorre cada tarefa da lista recebida
    lista.forEach(tarefa => {
        
        // Cria o HTML dinâmico usando Template Strings (crase)
        const htmlDaTarefa = `
            <li class="${tarefa.concluida ? 'completed' : ''}">
                <div>
                    <span class="tag tag-${tarefa.categoria}">${tarefa.categoria}</span>
                    <span>${tarefa.titulo}</span>
                </div>

                <div class="actions">
                    <button class="btn-action btn-check" onclick="concluirTarefa(${tarefa.id})">✔</button>
                    <button class="btn-action btn-edit">✎</button>
                    <button class="btn-action btn-delete" onclick="deletarTarefa(${tarefa.id})">✖</button>
                </div>
            </li>
        `;

        // Injeta o novo HTML dentro da UL
        ul.innerHTML += htmlDaTarefa;
    });
}

// ================================================================
// MISSÃO 3: ADICIONAR NOVA TAREFA (POST)
// ================================================================
// Atenção: O nome da função deve ser igual ao do 'onclick' no HTML (singular)
async function adicionarTarefa() {
    // 1. Captura os elementos do HTML
    const inputTitulo = document.getElementById("task-input");
    const inputCategoria = document.getElementById("task-category");

    // 2. Extrai os valores digitados
    const valorTitulo = inputTitulo.value;
    const valorCategoria = inputCategoria.value;

    // Validação simples: não deixa criar tarefa vazia
    if (!valorTitulo) return alert("Digite uma tarefa!");

    // 3. Monta o objeto que será enviado para a API
    const novaTarefa = {
        titulo: valorTitulo,
        categoria: valorCategoria
    };

    try {
        // 4. Faz o envio (POST) para o servidor
        const response = await fetch('/tarefas', {
            method: "POST", 
            headers: {
                "Content-Type": "application/json" // Avisa o back-end que estamos mandando JSON
            },
            body: JSON.stringify(novaTarefa) // Converte o objeto JS para String
        });

        // 5. Se o servidor aceitou (Status 201 Created)
        if (response.ok) {
            // Limpa o campo de texto para o usuário digitar a próxima
            inputTitulo.value = "";
            
            // PULO DO GATO: Chama a busca novamente para atualizar a lista na tela!
            buscarTarefas();
        }

    } catch (erro) {
        console.error("Erro ao adicionar:", erro);
    }
}

// ================================================================
// INICIALIZAÇÃO
// ================================================================
// Chama a função de busca assim que o arquivo carrega para mostrar o que já tem no banco
buscarTarefas();