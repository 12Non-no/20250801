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
                            v-model="targetNumber"
                            variant="outlined"
                            style="max-width: 225px;"
                            return-object
                            solo>
                        </v-select>
                    </div>
                    <div class="mb-2 mt-3" align="center" justify="center">
                        <v-btn  elevation="2" class="white"
                        @click="goToWeather"
                        >
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
        targetNumber: {
            get() {
            return this.$store.getters['product/targetNumber'];
            },
            set(value) {
                this.$store.dispatch('product/setTargetNumber', value);
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
   },
   goToWeather: function() { // 天気詳細画面への遷移および検索履歴をAPIでDBへ保存
    this.$store.dispatch('product/saveLog' , { // APIでDBへ保存
        RegionArea: this.selectArea.text,
        RegionNumber: this.selectArea.value,
        TargetArea: this.targetNumber.text,
        TargetNumber: this.targetNumber.value
    });
    
    this.$router.push({ // 画面遷移
        name: 'weather',
        params: {targetNumber: this.targetNumber.value}
    });
   }
  }
}
</script>