<template>
    <div class="tarefaapp">
      <OCabecalho />
      <router-view></router-view>
    </div>
</template>

<script>
import OCabecalho from './components/Cabecalho.vue'

export default {
  name: 'App',
  components: {
    OCabecalho
  }
}
</script>

<style>
.tarefaapp {
  max-width: var(--max-width-sm);
  margin: 130px auto 40px;
  padding: var(--size-base-x-3);
  background: #fff;
  box-shadow: var(--box-shadow);
}
</style>
