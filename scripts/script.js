"use strict"

const barraMenuTarefasAdicionadas = document.querySelector("aside")
const registroAlteraçãoTarefas = document.querySelector(".registro_AlteraçãoTarefas")
const menuComTarefasAdicionadas = document.querySelector(".menuComTarefasAdicionadas")
const btnSalvar = document.querySelector("#btnSalvar")
let tarefasAdicionadas = []

barraMenuTarefasAdicionadas.addEventListener("click", ()=>{
    if (menuComTarefasAdicionadas.style.display != "flex") {
        registroAlteraçãoTarefas.style.display = 'none'
        menuComTarefasAdicionadas.style.display = 'flex'
    } else {
        registroAlteraçãoTarefas.style.display = 'block'
        menuComTarefasAdicionadas.style.display = 'none'
    }
    
})

class ModeloTarefa{
    nome
    dataDeConclusão
    dataDeCriação
    prioridade
    descrição
    concluido

    constructor(nome, dataDeConclusão, prioridade, descrição){
        this.nome = nome
        this.dataDeConclusão = dataDeConclusão
        this.dataDeCriação = this.obterDataAtual()
        this.prioridade = prioridade
        this.descrição = descrição
        this.concluido = false
    }

    obterDataAtual = ()=>{
        const data = new Date()
        const dataAtual = `${data.getFullYear()}-${(data.getMonth()+1 > 10) ? (data.getMonth()+1) : "0" + (data.getMonth()+1)}-${data.getDate()}`
        return dataAtual
    }

    info = ()=>{
        console.log(`nome da tarefa: ${this.nome}\ndata de conclusão: ${this.dataDeConclusão}\ndata de criação: ${this.dataDeCriação}\nprioridade: ${this.prioridade}\ndescrição: ${this.descrição}\nconcluido: ${this.concluido ? "Sim" : 'Não'}\n`)
    }
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
        tarefasAdicionadas.push(
            new ModeloTarefa(infoTarefa[0], infoTarefa[1], infoTarefa[2], infoTarefa[3])
        )
    }

    console.log(tarefasAdicionadas)
})

