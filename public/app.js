let listaGlobal = []; 
let filtroAtual = 'todas';

// ================================================================
// BUSCAR (GET)
// ================================================================
async function buscarTarefas() {
    try {
        const response = await fetch('/tarefas');
        const data = await response.json();
        listaGlobal = data;
        atualizarTela();

    } catch (error) {
        console.error('Erro:', error);
    }
}

// ================================================================
// LÓGICA DE FILTRO E RENDERIZAÇÃO
// ================================================================

function filtrar(tipo) {
    filtroAtual = tipo;
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    if(tipo === 'todas') document.querySelector('button[onclick="filtrar(\'todas\')"]').classList.add('active');
    if(tipo === 'pendentes') document.querySelector('button[onclick="filtrar(\'pendentes\')"]').classList.add('active');
    if(tipo === 'concluidas') document.querySelector('button[onclick="filtrar(\'concluidas\')"]').classList.add('active');
    atualizarTela();
}
function atualizarTela() {
    let listaFiltrada = listaGlobal;

    if (filtroAtual === 'pendentes') {
        listaFiltrada = listaGlobal.filter(t => !t.concluida);
    } else if (filtroAtual === 'concluidas') {
        listaFiltrada = listaGlobal.filter(t => t.concluida);
    }

    const pendentesCount = listaGlobal.filter(t => !t.concluida).length;
    document.getElementById('count-pending').innerText = pendentesCount;
    renderizarHTML(listaFiltrada);
}
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
        buscarTarefas();
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