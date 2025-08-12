<template>
    <v-container>
        <v-card class="mx-auto pt-10 pb-10 rounded-xl" width="1080px" style="background-color: rgba(255, 255, 255, 0.6)">
            <v-row justify="center" class="text-center text-body-2" v-if="weatherData" style="white-space: pre-wrap;">
              <v-col cols="10"> 
    {{ weatherData.text }}
    <br><br>
      情報取得日時：{{ weatherData && weatherData.reportDatetime }}
              </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<script>
  export default {
    name: 'TargetWeatherView',
    computed: {
    weatherData() {
      return this.$store.getters['product/weatherData'];
    },
    // targetNumber() {
    //   return this.$store.params.targetNumber;
    // }
    },
    mounted() {
      const targetNumber = this.$route.params.targetNumber;
      this.$store.commit('product/clearWeatherData');
      this.$store.dispatch('product/getWeather', {value: targetNumber});
    }
  };
</script>