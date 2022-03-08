
<template >
  <div class="flex-col">
    <div class="flex justify-center p-6">
    <PulseLoader :loading="isLoading" :color="'#68d391'"> </PulseLoader>
    </div>

  </div>

  <div v-if="!isLoading">

      <div class="flex flex-col sm:flex-row justify-around items-center">
        <div class="flex flex-col items-center">
          <img
          :src="`https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`"
           class="w-20 h-20 mr-5"
           :alt="asset.name"
            />
          <h1 class="text-5xl">
              {{asset.name}}
            <small class="sm:mr-2 text-gray-500">{{asset.symbol}}</small>
          </h1>
        </div>

        <div class="my-10 flex flex-col">
          <ul>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Ranking</b>
              <span>{{asset.rank}}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Actual price</b>
              <span>{{dollarFilter(asset.priceUsd)}}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Lowest price</b>
              <span>{{dollarFilter(min ) }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Higher price</b>
              <span>{{dollarFilter(max)}}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Average price</b>
              <span>{{dollarFilter(avg)}}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Change 24Hr</b>
              <span>{{percentFilter(asset.changePercent24Hr)}}</span>  
            </li>
          </ul>
        </div>

        <div class="my-10 sm:mt-0 flex flex-col justify-center text-center">
          <button
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Cambiar
          </button>

          <div class="flex flex-row my-5">
            <label class="w-full" for="convertValue">
              <input
                id="convertValue"
                type="number"
                class="text-center bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
              />
            </label>
          </div>

          <span class="text-xl"></span>
        </div>
      </div>
      <div class="mx-20 my-20">

      <line-chart 
        
        :colors="['green']"
        :min="min"
        :max="max"
        :data="history.map(e=> [e.date, parseFloat(e.priceUsd).toFixed(2)] )"
      />


      <h3 class="text-xl my-10">Best exchange offers</h3>
      <table class="w-full">
        <tr v-for="m in markets" :key="`${m.exchangeId}-${m.priceUsd}`" class="border-b">
          <td>
            <b>{{m.exchangeId}}</b>
          </td>
          <td>{{ dollarFilter(m.priceUsd) }}</td>
          <td>{{ m.baseSymbol }} / {{m.quoteSymbol}}</td>
          <td>
            <Button
            v-if="!m.url"
             @custom-click="getWebsite(m)" >
            <span> Obtain link</span>
            </Button>
            <a v-else class="hover:underline text-green-600" :href="`${m.url}`" >{{m.url}}</a>

            <a class="hover:underline text-green-600" target="_blanck"></a>
          </td>
        </tr>
      </table>

      </div>


  </div>
</template>

<script>

import api from "../api"
import {dollarFilter, percentFilter } from "../filters"
import PulseLoader from "vue-spinner/src/MoonLoader.vue"
import Button from "../components/Button.vue"

export default {
    name: 'CoinDetail',
    data() {
        return {
          isLoading: false,
          asset:[],
          history:[],
          markets:[]
        }
    },
    components: {PulseLoader, Button},

    computed: {
        min() {
            return Math.min( ...this.history.map(element => parseFloat(element.priceUsd).toFixed(2)))

        },
        max() {
            return Math.max( ...this.history.map(element => parseFloat(element.priceUsd).toFixed(2)))
        },
        avg() {
            
            let total = 0;

            this.history.forEach(element => {
                const num = element.priceUsd;
                total += Number(num);
             })

            return (total/this.history.length).toFixed(2)
        }
    },


    created() {
      this.isLoading = true
      this.getCoin()

    },

    methods: {
      getWebsite(exchange){
        return api.getExchange(exchange.exchangeId)
        .then(res => {
          exchange.url = res.exchangeUrl
        })

      },

        getCoin(){
            const id = this.$route.params.id;
            
            Promise.all([
                api.getAsset(id),
                api.getAssetHistory(id),
                api.getMarkets(id)         
            ])
            .then(
                ([asset, history,markets]) => {
                    this.asset = asset;
                    this.history = history;
                    this.markets = markets;

                }
            )
            .finally( ()=> this.isLoading = false)
            
        },
        dollarFilter,
        percentFilter
    } 
}

</script>