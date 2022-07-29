<template>
    <div class="tarefa-item">
        <div class="tarefa-item-checkbox">
            <input type="checkbox" name="" id="">
        </div>
        <div>
            <div></div>
            <input type="text" name="" id="">
        </div>
        <a href="#" class="tarefa-item-limpar">X</a>
    </div>
</template>
<script>
export default {
    
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
.tarefa-item .tarefa-item-limpar {
    opacity: 1;
}
.tarefa-item-checkbox {
    margin-right: var(--size-base);
}
</style>