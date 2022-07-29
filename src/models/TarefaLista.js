import { reactive } from "vue";

const estado = reactive({
    tarefaLista: []
})

export const getTarefaLista = () => estado.tarefaLista
export const setTarefaLista = tarefaLista => { estado.tarefaLista = tarefaLista}
export const setTarefaItem = tarefa => { estado.tarefaLista.push(tarefa)}
export const marcarTodasTarefas = status => {
    setTarefaLista(estado.tarefaLista.map(item => ({ ...item, completo: status})))
}