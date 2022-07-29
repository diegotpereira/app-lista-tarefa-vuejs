import { reactive } from "vue";

const estado = reactive({
    tarefaLista: []
})

export const getTarefaLista = () => estado.tarefaLista
export const setTarefaItem = tarefaLista => { estado.tarefaLista = tarefaLista}