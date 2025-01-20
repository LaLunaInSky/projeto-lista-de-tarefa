"use strict"

const barraMenuTarefasAdicionadas = document.querySelector("aside")
const registroAlteraçãoTarefas = document.querySelector(".registro_AlteraçãoTarefas")
const menuComTarefasAdicionadas = document.querySelector(".menuComTarefasAdicionadas")

barraMenuTarefasAdicionadas.addEventListener("click", ()=>{
    if (menuComTarefasAdicionadas.style.display != "block") {
        registroAlteraçãoTarefas.style.display = 'none'
        menuComTarefasAdicionadas.style.display = 'block'
    } else {
        registroAlteraçãoTarefas.style.display = 'block'
        menuComTarefasAdicionadas.style.display = 'none'
    }
    
})

class ModeloTarefa{
    nome
    dataDeConclusão
    dataDeCriação
    pr
}