<template>
    <v-container>
        <v-card class="mx-auto pt-10 pb-10 rounded-xl" width="1080px" style="background-color: rgba(255, 255, 255, 0.6)">
            <v-row justify="center" class="text-center text-body-2" v-if="weatherData" cols="8" style="white-space: pre-wrap;">
              検索履歴
    <!-- {{ weatherData.text }} -->
    <br><br>
      情報取得日時：{{ weatherData && weatherData.reportDatetime }}
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
    }
    },
    mounted() {
      this.$store.dispatch('product/getWeather', this.$store.getters['product/selectTA']);
    }
  };
</script>