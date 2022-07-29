<template>
    <main class="tarefa-lista">
        <div class="tarefa-lista-cabecalho">
            <input type="checkbox" name="" id="" class="tarefa-lista-cabecalho-checkbox">
            <input type="text" name="" id="" class="tarefa-lista-cabecalho-input" v-model="novaTarefa" autofocus @keydown="naEntradaChave">
        </div>
        <tarefa-item v-for="(tarefa, index) in tarefaLista" :key="index" :model-value="tarefa" />
        <div class="tarefa-lista-footer">
            <div>
                <strong></strong>
                <span></span>
            </div>
            <nav class="tarefa-lista-nav">
                    <router-link to="" class="tarefa-lista-nav-item">Todas</router-link>
                    <router-link to="" class="tarefa-lista-nav-item">Ativo</router-link>
                    <router-link to="" class="tarefa-lista-nav-item">Completa</router-link>
            </nav>
            <div class="tarefa-lista-limpar">
                <a href="#">Limpeza completa</a>
            </div>
        </div>
    </main>
</template>
<script>
import TarefaItem from '@/components/Tarefa-Item.vue'
import { computed, reactive, toRefs, watch } from 'vue'
import { getTarefaLista, setTarefaItem } from '@/models/TarefaLista'

export default {
    name: 'TarefaLista',
    data() {
        return {
            
        }
    },
    components: {
        TarefaItem
    },
    props: {
        filtro: {
            type: String,
            default: ''
        }
    },
    setup(props) {

        const estado = reactive({
            tarefaLista: [],
            principalCheckbox: false,
            novaTarefa: '',
            tarefaValor: '',
            exibirBotaoComcluido: false,
            marcadorContador: computed(() => {

                const label = estado.tarefaLista.length === 1 ? 'item' : 'itens'

                return `${label} left`
            })
        })
        watch(
            () => props.filtro,
            () => { filtroTarefaLista }
        )
        
        const naEntradaChave = event => {

            if (event.keyCode === 13 && estado.novaTarefa) {
                
                setTarefaItem({ titulo: estado.novaTarefa, completa: false})
                estado.tarefaLista = getTarefaLista()
                estado.novaTarefa = ''
                filtroTarefaLista()

            }
        }
        const filtroTarefaLista = () => {
            
            if (!props.filtro) return estado.tarefaLista = getTarefaLista()
        }

        return { ...toRefs(estado), naEntradaChave}
    }
}
</script>
<style>
.tarefa-lista {
    margin-top: var(--size-base-x-3);
}
.tarefa-lista-cabecalho {
    display: flex;
    margin-bottom: var(--size-base-x-3);
}
.tarefa-lista-cabecalho-checkbox {
    margin-right: var(--size-base);
}
.tarefa-lista-cabecalho-input {
    display: block;
    width: 100%;
}
.tarefa-lista-footer {
    display: flex;
    justify-content: space-between;
    margin-top: var(--size-base-x-3);
    font-size: var(--font-size-m);
}
.tarefa-lista-nav-item:nth-child(even) {
    margin: 0 8px;
}
.tarefa-lista-limpar {
    opacity: 0;
}
.tarefa-lista-limpar--show {
    opacity: 1;
}
</style>