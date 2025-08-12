<template>
    <v-container>
        <v-card class="mx-auto pt-10 pb-10 rounded-xl" width="1080px" style="background-color: rgba(255, 255, 255, 0.6)">
            <v-row justify="center" class="text-center text-body-2">
               <v-data-table
                :headers="headers"
                :items="logData"
                :items-per-page="5"
                class="elevation-1"
                style="width: 80%"
                >
                <template v-slot:[`item.weatherButton`]="{item}">
                  <v-btn
                    small
                    color="primary"
                    @click="() => $router.push({name: 'weather', params: {targetNumber: item.TargetNumber}})"
                  >
                    表示
                  </v-btn>
                </template>
                <template v-slot:[`item.delete`]="{item}">
                  <v-btn
                    small
                    color="error"
                    @click="deleteItem(item)"
                  >
                    削除
                  </v-btn>
                </template>
              </v-data-table>
            </v-row>
        </v-card>
    </v-container>
</template>

<script>
  export default {
    name: 'SearchLogView',
    computed: {
      headers() {
        return this.$store.getters['product/headers'];
      },
      logData() {
        return this.$store.getters['product/logData'];
      }
    },
    mounted() {
      this.$store.dispatch('product/getLog');
      
    },
    methods: {
      deleteItem: function(item){
        this.$store.dispatch('product/deleteLog', item);
        this.$router.go(0);
      },
    }
  };
</script>