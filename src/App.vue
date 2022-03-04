<template>
  <main>
    <Header />
  </main>
  <Table />
</template>

<script>
import Header from '@/components/Header'
import Table from './components/Table.vue'

export default {
  name: 'App',
  components: {
    Header,
    Table
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
