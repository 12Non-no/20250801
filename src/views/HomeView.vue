<template>
  <v-container>

  <WeatherView />
  
  </v-container>
</template>

<script>
import WeatherView from '@/components/WeatherView.vue' //WeatherView.vueをインポート
  export default {
    name: 'HomeView',

    components: {
      WeatherView
    },
  }
</script>