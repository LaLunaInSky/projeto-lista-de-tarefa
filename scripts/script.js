"use strict"

const barraMenuTarefasAdicionadas = document.querySelector("aside")
const registroTarefas = document.querySelector(".registroTarefas")
const menuComTarefasAdicionadas = document.querySelector(".menuComTarefasAdicionadas")
const H1menuComTarefasAdicionadas = document.querySelector(".menuComTarefasAdicionadas>h1")
const tarefasAdicionadas = document.querySelector(".tarefasAdicionadas")
const btnSalvar = document.querySelector("#btnSalvar")
const btnFechar = document.querySelector(".info_EditarTarefa>section>img")
const infoEditarTarefa = document.querySelector(".info_EditarTarefa")
let listaTarefasAdicionadas = []

barraMenuTarefasAdicionadas.addEventListener("click", ()=>{
    if (menuComTarefasAdicionadas.style.display != "flex") {
        registroTarefas.style.display = 'none'
        menuComTarefasAdicionadas.style.display = 'flex'
    } else {
        registroTarefas.style.display = 'block'
        menuComTarefasAdicionadas.style.display = 'none'
    }
    
})

const redistribuirIDs = ()=>{
    if (tarefasAdicionadas.children[0].id != 'tarefa0' || tarefasAdicionadas.lastChild.id == '') {
        [...tarefasAdicionadas.children].map((e, p)=>{
            e.setAttribute('id', `tarefa${p}`)

            if (p == (listaTarefasAdicionadas.length)) {
                distribuirEventos(e)
            }
        })
    }
}

const distribuirEventos = (e)=>{
    const divIcone1 = e.children[0]
    const divsIcone2 = e.children[2]

    divIcone1.addEventListener("click", ()=>{
        concluirOuDesconcluirTarefa(divIcone1.children[0])
    })

    divsIcone2.children[2].addEventListener("click", ()=>{
        deletarTarefa(divsIcone2.children[2])
    })

    divsIcone2.children[0].addEventListener("click", ()=>{
        abrirMenuinfoEditarTarefa(divsIcone2.children[0])
    })

    divsIcone2.children[1].addEventListener("click", ()=>{
        abrirMenuinfoEditarTarefa(divsIcone2.children[1])
    })

    console.log(divsIcone2.children[1])
    
}

const abrirMenuinfoEditarTarefa = (elemento)=>{
    const index = elemento.parentElement.parentElement.id.slice(6)
    const infoMenu = document.querySelector(".info")
    const editarMenu = document.querySelector(".editar")

    infoEditarTarefa.style.display = 'flex'
    tarefasAdicionadas.style.display = 'none'

    console.log(listaTarefasAdicionadas[index].info())

    //editar tarefa
    //visualizar tarefa

    if (elemento.children[0].title == "visualizar tarefa") {
        infoMenu.style.display = 'flex'
        editarMenu.style.display = 'none'    
    }
    
    //console.log(elemento.parentElement.parentElement)
}

const atribuirInfosDaTarefa = (array)=>{
    const tarefa = array
    const infoMenu = document.querySelector(".info")
    const datas = document.querySelector(".datas")
    const prioridadeEConclusão = document.querySelector(".prioridadeEConclusão")
    const descriçãoT = document.querySelector(".descriçãoT")

    infoMenu.children[1].innerText = tarefa[0]
    datas.children[0].children[1].innerText = tarefa[1]
    datas.children[1].children[1].innerText = tarefa[2]

    prioridadeEConclusão.children[0].children[1].innerText = tarefa[3]
    prioridadeEConclusão.children[0].children[1].style.color = tarefa[6]

    prioridadeEConclusão.children[1].children[1].innerText = tarefa[5] ? "Sim" : "Não"
    
    descriçãoT.children[1].innerText = tarefa[4]
}

const deletarTarefa = (elemento)=>{
    const index = elemento.parentElement.parentElement.id.slice(6)
    elemento.parentElement.parentElement.remove()
    listaTarefasAdicionadas.splice(index)
    redistribuirIDs()
}

const concluirOuDesconcluirTarefa = (elemento)=>{
    const index = elemento.parentElement.parentElement.id.slice(6)
    if (elemento.title != "concluida") {
        elemento.title = 'concluida'
        elemento.children[0].setAttribute('src', 'imagens/icone_concluido.png')
        listaTarefasAdicionadas[index].concluido = true
    } else {
        elemento.setAttribute("title", 'não concluida')
        elemento.children[0].setAttribute('src', 'imagens/icone_não_concluido.png')
        listaTarefasAdicionadas[index].concluido = false
    }
}

class ModeloTarefa{
    nome
    dataDeConclusão
    dataDeCriação
    prioridade
    descrição
    concluido
    cor

    constructor(nome, dataDeConclusão, prioridade, descrição){
        this.nome = nome
        this.dataDeConclusão = dataDeConclusão
        this.dataDeCriação = this.obterDataAtual()
        this.prioridade = prioridade
        this.descrição = descrição
        this.concluido = false
        this.obterCor()
        criarDesignerTarefa(this.nome, this.cor)
    }

    obterDataAtual = ()=>{
        const data = new Date()
        const dataAtual = `${data.getFullYear()}-${(data.getMonth()+1 > 10) ? (data.getMonth()+1) : "0" + (data.getMonth()+1)}-${data.getDate()}`
        return dataAtual
    }

    obterCor = ()=>{
        if (this.prioridade == "Baixa") {
            this.cor = "#013f01"
        } else if (this.prioridade == 'Média') {
            this.cor = "#a0a001"
        } else if (this.prioridade == "Alta") {
            this.cor = "#850303"
        }
    }

    info = ()=>{
        const atributos = [
            this.nome, this.dataDeConclusão, this.dataDeCriação, this.prioridade, this.descrição, this.concluido, this.cor
        ]

        return atributos
    }
}

const criarDesignerTarefa = (nome, cor)=>{
    const novaTarefa = document.createElement("article")
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
                                <div class="icone">
                                    <abbr title="deletar tarefa">
                                        <img src="imagens/icone_deletar.png" alt="icone_deletar">
                                    </abbr>
                                </div>
                            </div>`
    novaTarefa.addEventListener("mouseover", ()=>{
        novaTarefa.style.backgroundColor = cor
    })

    novaTarefa.addEventListener("mouseout", ()=>{
        novaTarefa.style.backgroundColor = "transparent"
    })

    tarefasAdicionadas.appendChild(novaTarefa)
    redistribuirIDs()
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

btnFechar.addEventListener("click", ()=>{
    infoEditarTarefa.style.display = 'none'
    tarefasAdicionadas.style.display = 'flex'
})

//criar tarefa dev teste
listaTarefasAdicionadas.push(
    new ModeloTarefa("Tarefa Teste", '2025-01-31', 'Alta', 'Tarefa teste....')
)
listaTarefasAdicionadas.push(
    new ModeloTarefa("Tarefa Teste", '2025-01-31', 'Média', 'Tarefa teste....')
)
listaTarefasAdicionadas.push(
    new ModeloTarefa("Tarefa Teste", '2025-01-31', 'Baixa', 'Tarefa teste....')
)
// if (listaTarefasAdicionadas.length > 0) {
//     H1menuComTarefasAdicionadas.style.display ='none'
//     tarefasAdicionadas.style.display = 'flex'
// }

atribuirInfosDaTarefa(listaTarefasAdicionadas[0].info())