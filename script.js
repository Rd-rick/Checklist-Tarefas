let tarefas = []

const listasTarefas = document.getElementById("listaTarefas");

$('novaTarefa').addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        adicionarTarefa();
    }
})

function adicionarTarefa() {

    // Mensagens
    let mensagemSucesso = "Tarefa adicionada com sucesso!";
    let mensagemErro = "Escreva o nome da tarefa";
    const mensagem = document.getElementById("mensagem");

    // Pegando o valor do input e adicionando a uma variável
    const inputTarefa = document.getElementById("novaTarefa");
    let novaTarefa = inputTarefa.value.trim();

    if (novaTarefa === "") {
        mensagem.style.color = "#8B0000"; // Cor vermelha para erro
        mensagem.textContent = mensagemErro;
        return; // Sai da função se o campo estiver vazio
    }

    // Mensagem de sucesso
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

        // Pegando o elemento UL e criando uma LI
        listasTarefas.innerHTML = ""

        for (let i = 0; i < tarefas.length; i++) {
            let tarefaNova = document.createElement("li");
            
            // Criando um checkbox
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

            //criando um botão apagar
            const apagarBotao = document.createElement("button");
            apagarBotao.className = "remover-lista"
            apagarBotao.textContent = "Remover"
            apagarBotao.onclick = () => removerTarefa(i)

            //botãi editar

            const editarBotao = document.createElement("button");
            editarBotao.className = "editar-lista"
            editarBotao.textContent = "Editar"
            editarBotao.onclick = () => editarTarefa(i)
        
            // Adicionando checkbox e texto da tarefa na li
            $(criandoCheckbox).appendTo(tarefaNova);
            $(textoTarefa).appendTo(tarefaNova);
            $(apagarBotao).appendTo(tarefaNova);
            $(editarBotao).appendTo(tarefaNova)
        
            // Adicionando a li ao elemento pai ul
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