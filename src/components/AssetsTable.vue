<template>
    <table>
    <thead>
      <tr class="bg-gray-100 border-b-2 border-gray-400">
        <th></th>
        <th>
          <span>Ranking</span>
        </th>
        <th>Name</th>
        <th>Price</th>
        <th>Market Cap.</th>
        <th>Change 24hs</th>
        <td class="hidden sm:block"></td>
      </tr>
    </thead>
    <tbody>
      <tr 
      v-for="element in assets"
      :key="element.id"
      class="border-b border-gray-200 hover:bg-gray-100 hover:bg-orange-100">
        <td>
          <img :src="`https://static.coincap.io/assets/icons/${element.symbol.toLowerCase()}@2x.png`" :alt="element.name">
        </td>
        <td>
          <b># {{element.rank}} </b>
        </td>
        <td>
          <router-link
          class="hover:underline text-green-600"
          :to="{name: 'CoinDetail', params: {id: element.id}}">
          {{element.name}}
          </router-link>
          <small class="ml-1 text-gray-500">{{ element.symbol }}</small>
          </td>
        <td>{{dollarFilter(element.priceUsd)}}</td>
        <td>{{dollarFilter(element.marketCapUsd)}}</td>
        <td :class="element.changePercent24Hr.includes('-') ? 'text-red-600': 'text-green-600'"
        >{{percentFilter(element.changePercent24Hr)}}</td>
        <td class="hidden sm:block">
          <Button @custom-click="goToCoin(element.id)" >
            <span>Details</span>
          </Button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import {dollarFilter, percentFilter} from "../filters"
import Button from "./Button.vue"

export default {
    name: "AssetsTable",

    components: {Button},

    props: {
        assets:{
            type: Array,
            default: ()=>[]
        }
    },
    methods: {
      dollarFilter,
      percentFilter,
      goToCoin(id){
        this.$router.push({name: 'CoinDetail', params: {id: id}}) 
      }
    }
};
</script>

<style scoped>
.up::before {
  content: "👆";
}

.down::before {
  content: "👇";
}

td {
  padding: 20px 0px;
  font-size: 0.6rem;
  text-align: center;
}

th {
  padding: 5px;
  font-size: 0.6rem;
}

@media (min-width: 640px) {
  td,
  th {
    padding: 20px;
    font-size: 1rem;
  }

  th {
    padding: 12px;
  }
}
</style>