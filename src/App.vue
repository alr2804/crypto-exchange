<template>
  <main>
    <Header />
    <router-view class="container px-5 sm:px-20 py-20 flex justify-center" />

  </main>
</template>

<script>
import Header from '@/components/Header'

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>