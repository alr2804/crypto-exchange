<template>
    <div>
        <AssetsTable :assets="assets" />

    </div>
  
</template>

<script>
import api from '../api'
import AssetsTable from '../components/AssetsTable.vue';

export default {
  
  name: "Home",
  components: { AssetsTable },
  data(){
      return {
          assets: []
      }
  },
  
  created() {
      api.getAssets().then(assets => (this.assets = assets))
  }


};
</script>

<style>

</style>