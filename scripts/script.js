"use strict"

const barraMenuTarefasAdicionadas = document.querySelector("aside")
const registroAlteraçãoTarefas = document.querySelector(".registro_AlteraçãoTarefas")
const menuComTarefasAdicionadas = document.querySelector(".menuComTarefasAdicionadas")
const H1menuComTarefasAdicionadas = document.querySelector(".menuComTarefasAdicionadas>h1")
const tarefasAdicionadas = document.querySelector(".tarefasAdicionadas")
const btnSalvar = document.querySelector("#btnSalvar")
let listaTarefasAdicionadas = []

barraMenuTarefasAdicionadas.addEventListener("click", ()=>{
    if (menuComTarefasAdicionadas.style.display != "flex") {
        registroAlteraçãoTarefas.style.display = 'none'
        menuComTarefasAdicionadas.style.display = 'flex'
    } else {
        registroAlteraçãoTarefas.style.display = 'block'
        menuComTarefasAdicionadas.style.display = 'none'
    }
    
})

const deletarTarefa = (htmlElemento)=>{
    const elemento = htmlElemento
    const index = elemento.id.slice(6)
    htmlElemento.remove()
    listaTarefasAdicionadas.splice(index)
}

const visualizarInfoTarefa = (htmlElemento)=>{
    const elemento = htmlElemento
    const index = elemento.id.slice(6)
}

class ModeloTarefa{
    nome
    dataDeConclusão
    dataDeCriação
    prioridade
    descrição
    concluido
    objHtml

    constructor(nome, dataDeConclusão, prioridade, descrição){
        this.nome = nome
        this.dataDeConclusão = dataDeConclusão
        this.dataDeCriação = this.obterDataAtual()
        this.prioridade = prioridade
        this.descrição = descrição
        this.concluido = false

        criarDesignerTarefa(this.nome)
    }

    obterDataAtual = ()=>{
        const data = new Date()
        const dataAtual = `${data.getFullYear()}-${(data.getMonth()+1 > 10) ? (data.getMonth()+1) : "0" + (data.getMonth()+1)}-${data.getDate()}`
        return dataAtual
    }
}

const criarDesignerTarefa = (nome)=>{
    const novaTarefa = document.createElement("article")
    novaTarefa.setAttribute('id', `tarefa${tarefasAdicionadas.children.length}`)
    novaTarefa.innerHTML = `<div class="icone conclusão">
                                <abbr title="não concluida">
                                    <img src="imagens/icone_não_concluido.png" alt="icone conclusão">
                                </abbr>
                            </div>
                            <h2>${nome}</h2>
                            <div>
                                <div class="icone">
                                    <abbr title="visualizar tarefa">
                                        <img src="imagens/icone_info.png" alt="icone info">
                                    </abbr>
                                </div>
                                <div class="icone">
                                    <abbr title="editar tarefa">
                                        <img src="imagens/icone_editar.png" alt="icone editar">
                                    </abbr>
                                </div>
                                <div onclick="deletarTarefa(${novaTarefa.id})" class="icone">
                                    <abbr title="deletar tarefa">
                                        <img src="imagens/icone_deletar.png" alt="icone_deletar">
                                    </abbr>
                                </div>
                            </div>`
    tarefasAdicionadas.appendChild(novaTarefa)
}

const verificarInputs = ()=>{
    const nomeTarefa = document.querySelector("#nomeTarefa")
    const dataDeConclusão = document.querySelector("#dataDeConclusão")
    const nivelPrioridade = document.querySelector("#nivelPrioridade")
    const descriçãoTarefa = document.querySelector("#descriçãoTarefa")

    if (nomeTarefa.value != '' && dataDeConclusão.value != '' && nivelPrioridade.value != '' && descriçãoTarefa.value != ''){
        const listaDeInfos = [
            nomeTarefa.value, dataDeConclusão.value, nivelPrioridade.value, descriçãoTarefa.value
        ]
        
        nomeTarefa.value = ''
        dataDeConclusão.value = ''
        nivelPrioridade.value = ''
        descriçãoTarefa.value = ''
        
        return listaDeInfos
    } else {
        return undefined
    }
}

btnSalvar.addEventListener("click", ()=>{
    const infoTarefa = verificarInputs()
    if (infoTarefa == undefined) {
        alert('Informações sobre a nova tarefa incompleta!')
    } else {
        listaTarefasAdicionadas.push(
            new ModeloTarefa(infoTarefa[0], infoTarefa[1], infoTarefa[2], infoTarefa[3])
        )
    }

    if (listaTarefasAdicionadas.length > 0) {
        H1menuComTarefasAdicionadas.style.display ='none'
        tarefasAdicionadas.style.display = 'flex'
    }

    console.log(listaTarefasAdicionadas)
})



//criar tarefa dev teste
listaTarefasAdicionadas.push(
    new ModeloTarefa("Tarefa Teste", '2025-01-31', 'Alta', 'Tarefa teste....')
)
listaTarefasAdicionadas.push(
    new ModeloTarefa("Tarefa Teste", '2025-01-31', 'Alta', 'Tarefa teste....')
)
if (listaTarefasAdicionadas.length > 0) {
    H1menuComTarefasAdicionadas.style.display ='none'
    tarefasAdicionadas.style.display = 'flex'
}