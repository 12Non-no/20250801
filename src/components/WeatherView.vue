<template>
    <v-container>
        <v-card class="mx-auto pt-10 pb-10 rounded-xl" width="1080px" style="background-color: rgba(255, 255, 255, 0.6)">
            <v-row justify="center">
                <v-col class="d-flex flex-column align-center">
                    <div>
                        <v-select
                            @change="changeArea(selectArea)"
                            label="検索エリアを選択"
                            item-value="value"
                            item-text="text"
                            :items="areaInfo"
                            v-model="selectArea"
                            variant="outlined"
                            style="max-width: 225px;"
                            return-object
                            solo>
                        </v-select>
                        <v-select
                            label="詳細エリアを選択"
                            item-value="value"
                            item-text="text"
                            :items="targetArea"
                            v-model="selectTA"
                            variant="outlined"
                            style="max-width: 225px;"
                            return-object
                            solo>
                        </v-select>
                    </div>
                    <div class="mb-2 mt-3" align="center" justify="center">
                        <v-btn text to="/weather" tag="router-link" elevation="2" class="white">
                        ここをクリック！
                        </v-btn>
                    </div>
                </v-col> 
            </v-row>
        </v-card>
    </v-container>
</template>

<script>
  export default {
    computed: {
        selectTA: {
            get() {
            return this.$store.getters['product/selectTA'];
            },
            set(value) {
                this.$store.dispatch('product/setSelectTA', value);
            }
        },
        areaInfo() {
            return this.$store.getters['product/areaInfo'];
        },
        targetArea(){
            return this.$store.getters['product/targetArea'];
        },
        selectArea: {
            get() {
            return this.$store.getters['product/selectArea'];
            },
            set(value) {
                this.$store.dispatch('product/setTargetArea', value);
            }
        }
    },
    mounted() { //地域情報を取得
        this.$store.dispatch('product/getArea');
    },
    methods: {

   changeArea: function(selectArea) {
     // 1つ目のセレクトボックスで選択された情報をもとに詳細なエリアコードを取得
        this.$store.commit('product/getTargetArea', selectArea);
   }
  }
}
</script>