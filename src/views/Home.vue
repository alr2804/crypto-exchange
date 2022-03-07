<template>
    <div p-6>
        <PulseLoader :loading="isLoading" :color="'#68d391'" ></PulseLoader>
        <AssetsTable v-if="!isLoading" :assets="assets" />

    </div>
  
</template>

<script>
import api from '../api'
import AssetsTable from '../components/AssetsTable.vue'
import PulseLoader from "vue-spinner/src/PulseLoader.vue" 

export default {
  
  name: "Home",
  components: { AssetsTable, PulseLoader },
  data(){
      return {
          isLoading: false,
          assets: []
      }
  },
  
  created() {
      this.isLoading = true
      api.getAssets()
      .then(assets => (this.assets = assets))
      .finally(()=> this.isLoading=false)
  }


};
</script>

<style>

</style>