let tarefas = []

const listasTarefas = document.getElementById("listaTarefas");

$('#novaTarefa').on("keydown", function (event) {
    if (event.key === "Enter") {
        adicionarTarefa();
    }
})

function adicionarTarefa() {


    let mensagemSucesso = "Tarefa adicionada com sucesso!";
    let mensagemErro = "Escreva o nome da tarefa";
    const mensagem = document.getElementById("mensagem");


    const inputTarefa = document.getElementById("novaTarefa");
    let novaTarefa = inputTarefa.value.trim();

    if (novaTarefa === "") {
        mensagem.style.color = "#8B0000"; 
        mensagem.textContent = mensagemErro;
        return; 
    }

    mensagem.style.color = "green";
    mensagem.textContent = mensagemSucesso;

    tarefas.push(novaTarefa)

    if (tarefas.length !== 0) {
        mensagem.style.display = "flex"
    }

    renderizarTarefas()

    inputTarefa.value = "";
}

function apagarTudo() {
    let apagar = document.getElementById("apagar-tarefas")

    if (tarefas.length !== 0) {
        apagar.style.display = "flex"
    } else {
        apagar.style.display = "none"
    }
}

function renderizarTarefas() {

    apagarTudo()

        listasTarefas.innerHTML = ""

        for (let i = 0; i < tarefas.length; i++) {
            let tarefaNova = document.createElement("li");
            
            const criandoCheckbox = document.createElement("input");
            criandoCheckbox.type = "checkbox";
            
            const textoTarefa = document.createElement("span");
            textoTarefa.textContent = " " + tarefas[i];
            
            criandoCheckbox.addEventListener("change", function () {
                if (this.checked) {
                    tarefaNova.classList.add("concluida")
                    
                    apagarBotao.style.backgroundColor = "gray"
                    
                    apagarBotao.onmouseout = function() {
                        this.style.backgroundColor = "gray"
                    }
                    
                    apagarBotao.onmouseover = function() {
                        this.style.backgroundColor = "#A34743"
                    }
                } else {
                    tarefaNova.classList.remove("concluida")
                    
                    apagarBotao.style.backgroundColor = "#60041A"
                    
                    apagarBotao.onmouseout = function() {
                        this.style.backgroundColor = "#60041A"
                    }
                    apagarBotao.onmouseover = function() {
                        this.style.backgroundColor = "#A34743"
                    }
                }
            })

            const apagarBotao = document.createElement("button");
            apagarBotao.className = "remover-lista"
            apagarBotao.textContent = "Remover"
            apagarBotao.onclick = () => removerTarefa(i)

            const editarBotao = document.createElement("button");
            editarBotao.className = "editar-lista"
            editarBotao.textContent = "Editar"
            editarBotao.onclick = () => editarTarefa(i)
        
            $(criandoCheckbox).appendTo(tarefaNova);
            $(textoTarefa).appendTo(tarefaNova);
            $(apagarBotao).appendTo(tarefaNova);
            $(editarBotao).appendTo(tarefaNova)
        
            $(tarefaNova).appendTo(listasTarefas)
    }
}

function removerTarefa (i) {
    let tarefaApagada = "Tarefa apagada!"
    tarefas.splice(i, 1)

    mensagem.textContent = tarefaApagada
    renderizarTarefas()
    }

function editarTarefa (i) {
    let tarefaEditada = prompt("Editar tarefa:")

    let mensagemEditada = "Tarefa editada com sucesso!"

    if (tarefaEditada.trim() !== "") {
        tarefas[i] = tarefaEditada
        mensagem.textContent = mensagemEditada
        renderizarTarefas()
    }
}

function remover() {
    listasTarefas.innerHTML = " "
    tarefas.length = 0
    renderizarTarefas()
    mensagem.style.display = "none"
}