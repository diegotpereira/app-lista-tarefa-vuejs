<template>
    <div class="tarefa-item">
        <div class="tarefa-item-checkbox">
            <input type="checkbox" v-model="ehCompleta" data-test="tarefa-item-checkbox" @change="$emit('na-alteracao', ehCompleta)">
        </div>
        <div>
            <div v-if="!ehAtivo" data-test="tarefa-item-label" v-text="entradaValor" @dblclick="onDbClick" />
                <input type="text" v-else data-test="tarefa-item-input" ref="entradaElemento" v-model="entradaValor" @blur="onBlur" @keydown="onKeyDown">
        </div>
        <a href="#" class="tarefa-item-limpar" data-test="tarefa-item-limpar" @click.prevent="$emit('na-limpeza')">X</a>
    </div>
</template>
<script>
import { nextTick, reactive, ref, toRefs, watch}  from 'vue'

export default {
    name: 'TarefaItem',
    data() {
        return {
            
        }
    },
    props: {
        modeloValor: {
            type: Object,
            default: () => ({})
        }
    },
    emits: ['update:modeloValor', 'na-alteracao', 'na-limpeza'],
    setup(props, {emit}) {

        const entradaElemento = ref(null)
        const estado = reactive({
            ehAtivo: false,
            entradaValor: '',
            ehCompleta: false
        })
        watch(
            () => props.modeloValor,
            () => {
                estado.entradaValor = props.modeloValor.titulo
                estado.ehCompleta = props.modeloValor.completa 
            },
            { immediate: true}
        )
        const onBlur = () => {
            estado.ehAtivo = false
            emit('update:modelo-valor', estado.entradaValor)
        }
        const onDbClick = () => {
            estado.ehAtivo = true
            nextTick(() => entradaElemento.value.focus())
        }
        const onKeyDown = event => {

            if (event.keyCode === 27) {
                estado.entradaValor = props.modeloValor.titulo
                estado.ehAtivo = false
            }
            if (event.keyCode === 13) estado.ehAtivo = false
        }
        return {...toRefs(estado), entradaElemento, onBlur, onDbClick, onKeyDown}
    }
}
</script>
<style>
.tarefa-item {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    padding: var(--size-base);
    border-bottom: 1px solid var(--clor-main);
}
.tarefa-item-limpar {
    position: absolute;
    top: 50%;
    right: var(--size-base);
    transform: translate(0, -50%);
    color: var(--color-link);
    text-decoration: none;
    opacity: 0;
}
.tarefa-item:hover .tarefa-item-limpar {
    opacity: 1;
}
.tarefa-item-checkbox {
    margin-right: var(--size-base);
}
</style>