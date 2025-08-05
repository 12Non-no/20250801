<template>
  <v-app>
    <v-app-bar
      app
      color="grey lighten-5"
    >
      <div class="text-h4 text-center blue--text text--darken-4">
        天気予報
      </div>
      <div class="ml-5">
      <router-link to="/searchLog" class="mr-5">検索履歴</router-link>
      <router-link to="/">TOPへ戻る</router-link>
      </div>
    </v-app-bar>

    <v-main>
      <v-parallax src="https://i.gyazo.com/a67cc7bd39b59ae45c5d6ca19ec306b4.webp" cover height="700">
        <router-view/>
      </v-parallax>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
