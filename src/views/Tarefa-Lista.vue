<template>
    <main class="tarefa-lista">
        <div class="tarefa-lista-cabecalho">
            <input type="checkbox" class="tarefa-lista-cabecalho-checkbox" v-model="principalCheckbox" @change="naAlteracaoPrincipalCheckbox">
            <input type="text" class="tarefa-lista-cabecalho-input" v-model="novaTarefa" autofocus @keydown="naEntradaChave">
        </div>
        <tarefa-item v-for="(tarefa, index) in tarefaLista" :key="index" :modeloValor="tarefa" 
        @update:modeloValor="value => naAtualizacaoTarefaItem(value, index)"
                    @na-alteracao="value => naAlteracaoTarefaItem(value, index)"
                    @na-limpeza="naLimpeza(index)"/>

        <div class="tarefa-lista-footer" v-if="tarefaLista.length || filtro">
            <div>
                <strong>{{ tarefaLista.length }}</strong>
                <span>{{ marcadorContador }}</span>
            </div>
            <nav class="tarefa-lista-nav">
                    <router-link :to="{ name: 'home' }" class="tarefa-lista-nav-item">Todas</router-link>
                    <router-link :to="{ name: 'ativo' }" class="tarefa-lista-nav-item">Ativo</router-link>
                    <router-link :to="{ name: 'completa' }" class="tarefa-lista-nav-item">Completa</router-link>
            </nav>
            <div class="tarefa-lista-limpar" :class="{'tarefa-lista-limpar-show': exibirBotaoConcluido && !filtro}">
                <a href="#" @click.prevent="limparCompletaItens">Limpeza completa</a>
            </div>
        </div>
    </main>
</template>
<script>
import TarefaItem from '@/components/Tarefa-Item.vue'
import { computed, reactive, toRefs, watch } from 'vue'
import { getTarefaLista, setTarefaItem, setTarefaLista, marcarTodasTarefas } from '@/models/TarefaLista'

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
            exibirBotaoConcluido: false,
            marcadorContador: computed(() => {

                const label = estado.tarefaLista.length === 1 ? 'item' : 'itens'

                return `${ label } restante`
            })
        })

        watch(
            () => estado.tarefaLista,
            lista => {
                estado.exibirBotaoConcluido = lista.some(({ completa }) => completa)
                estado.principalCheckbox = lista.every(({ completa }) => completa)
            },
            { deep: true}
        )
        watch(
            () => props.filtro,
            () => { filtroTarefaLista }
        )

        const naLimpeza = index => estado.tarefaLista.splice(index, 1)
        
        const naEntradaChave = event => {

            if (event.keyCode === 13 && estado.novaTarefa) {
                
                setTarefaItem({ titulo: estado.novaTarefa, completa: false})
                estado.tarefaLista = getTarefaLista()
                estado.novaTarefa = ''
                filtroTarefaLista()

            }
        }
        const naAlteracaoTarefaItem = (value, index) => {
            estado.tarefaLista[index].completa = value 
            setTarefaLista(estado.tarefaLista)
            filtroTarefaLista()
        }

        const naAtualizacaoTarefaItem = (value, index) => {

            if(!value) estado.tarefaLista.splice(index, 1)
            else estado.tarefaLista[index].titulo = value 

            setTarefaLista(estado.tarefaLista)
        }
        const filtroTarefaLista = () => {
            
            if (!props.filtro) return estado.tarefaLista = getTarefaLista()

            estado.tarefaLista = getTarefaLista().filter(({ completa }) => {
                return props.filtro === 'ativo' ? !completa: completa
            })
        }

        const limparCompletaItens = () => {
            estado.tarefaLista = getTarefaLista().filter(({ completa }) => !completa)
        }
        const naAlteracaoPrincipalCheckbox = () => {
            marcarTodasTarefas(estado.principalCheckbox)
            estado.tarefaLista = getTarefaLista()
        }

        return { ...toRefs(estado), naLimpeza, naEntradaChave, naAlteracaoTarefaItem, naAtualizacaoTarefaItem, naAlteracaoPrincipalCheckbox, limparCompletaItens}
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