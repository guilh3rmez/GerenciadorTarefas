// public/app.js

// 1. ESTADO GLOBAL
// Guardamos a lista completa aqui para não perder dados ao filtrar
let listaGlobal = []; 
let filtroAtual = 'todas'; // 'todas', 'pendentes' ou 'concluidas'

// ================================================================
// BUSCAR (GET)
// ================================================================
async function buscarTarefas() {
    try {
        const response = await fetch('/tarefas');
        const data = await response.json();

        // Salva na memória global antes de qualquer coisa
        listaGlobal = data;

        // Manda desenhar (respeitando o filtro que estiver ativo)
        atualizarTela();

    } catch (error) {
        console.error('Erro:', error);
    }
}

// ================================================================
// LÓGICA DE FILTRO E RENDERIZAÇÃO
// ================================================================

// Função chamada pelos botões de filtro no HTML
function filtrar(tipo) {
    filtroAtual = tipo; // Atualiza o estado ('todas', 'pendentes'...)
    
    // Atualiza visual dos botões (para ficar roxinho o ativo)
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    
    // O truque: procura o botão que foi clicado baseando-se no texto ou onclick
    // Mas para facilitar, vamos assumir que o CSS resolve o .active se gerarmos via JS,
    // ou simplificamos buscando pelo texto do botão.
    // Vamos fazer o jeito simples:
    if(tipo === 'todas') document.querySelector('button[onclick="filtrar(\'todas\')"]').classList.add('active');
    if(tipo === 'pendentes') document.querySelector('button[onclick="filtrar(\'pendentes\')"]').classList.add('active');
    if(tipo === 'concluidas') document.querySelector('button[onclick="filtrar(\'concluidas\')"]').classList.add('active');

    // Redesenha a lista
    atualizarTela();
}

// Função que prepara os dados para serem desenhados
function atualizarTela() {
    // 1. Aplica o Filtro na lista global
    let listaFiltrada = listaGlobal;

    if (filtroAtual === 'pendentes') {
        listaFiltrada = listaGlobal.filter(t => !t.concluida);
    } else if (filtroAtual === 'concluidas') {
        listaFiltrada = listaGlobal.filter(t => t.concluida);
    }

    // 2. Atualiza o Contador de Pendentes (Sempre conta da lista global, independente do filtro visual)
    const pendentesCount = listaGlobal.filter(t => !t.concluida).length;
    document.getElementById('count-pending').innerText = pendentesCount;

    // 3. Chama o desenhista
    renderizarHTML(listaFiltrada);
}

// O antigo "renderizarTarefa" agora só se preocupa com HTML
function renderizarHTML(lista) {
    const ul = document.getElementById('task-list');
    ul.innerHTML = ''; 

    lista.forEach(tarefa => {
        const htmlDaTarefa = `
            <li class="${tarefa.concluida ? 'completed' : ''}">
                <div>
                    <span class="tag tag-${tarefa.categoria}">${tarefa.categoria}</span>
                    <span>${tarefa.titulo}</span>
                </div>
                <div class="actions">
                    <button class="btn-action btn-check" onclick="concluirTarefa(${tarefa.id}, ${tarefa.concluida})">✔</button>
                    <button class="btn-action btn-edit" onclick="editarTarefa(${tarefa.id}, '${tarefa.titulo}')">✎</button>
                    <button class="btn-action btn-delete" onclick="deletarTarefa(${tarefa.id})">✖</button>
                </div>
            </li>
        `;
        ul.innerHTML += htmlDaTarefa;
    });
}

// ================================================================
// AÇÕES (POST, PUT, DELETE)
// ================================================================

async function adicionarTarefa() {
    const inputTitulo = document.getElementById("task-input");
    const inputCategoria = document.getElementById("task-category");

    if (!inputTitulo.value) return alert("Digite uma tarefa!");

    const novaTarefa = {
        titulo: inputTitulo.value,
        categoria: inputCategoria.value
    };

    try {
        await fetch('/tarefas', {
            method: "POST", 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novaTarefa)
        });
        
        inputTitulo.value = "";
        buscarTarefas(); // Recarrega tudo
    } catch (erro) {
        console.error("Erro:", erro);
    }
}

async function deletarTarefa(id) {
    if(!confirm("Tem certeza?")) return;
    try {
        await fetch(`/tarefas/${id}`, { method: "DELETE" });
        buscarTarefas();
    } catch (erro) { console.error(erro); }
}

async function concluirTarefa(id, statusAtual) {
    try {
        await fetch(`/tarefas/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ concluida: !statusAtual })
        });
        buscarTarefas();
    } catch (erro) { console.error(erro); }
}

async function editarTarefa(id, tituloAtual) {
    const novoTitulo = prompt("Novo nome:", tituloAtual);
    if (!novoTitulo || novoTitulo === tituloAtual) return;

    try {
        await fetch(`/tarefas/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ titulo: novoTitulo })
        });
        buscarTarefas();
    } catch (erro) { console.error(erro); }
}

// Start
buscarTarefas();