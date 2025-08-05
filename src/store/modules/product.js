import axios from 'axios';
export default {
  namespaced: true, // モジュール名でアクセスするための設定
  state: { // 初期値を設定
    targetArea: [],
    weatherData: {}, // 天気情報を格納
    areaInfo: [], // 地方情報を格納
    targetAreaInfo: {}, // 都道府県情報を格納
    items: [], // 2つ目のセレクトボックスの選択肢が格納される配列
    selectArea: {}, // 1つ目のセレクトボックスの選択結果を格納
    selectTA: {}, // 2つ目のセレクトボックスの選択結果を格納
    toggle: false
  },
  getters: {
    areaInfo: state => state.areaInfo,
    targetArea: state => state.targetArea,
    selectTA: state => state.selectTA,
    targetAreaInfo: state => state.targetAreaInfo,
    selectArea: state => state.selectArea,
    weatherData: state => state.weatherData
  },
  mutations: {
    clearWeatherData(state){
      state.weatherData = {};
    },
    setAreaInfo(state, response) {
      state.areaInfo = Object.entries(response.data.centers); 
                        state.areaInfo = state.areaInfo.map((items) => {return{
                          text: items[1].name,
                          value: items[0],
                          children: items[1].children
                        };});
                        state.targetAreaInfo = response.data.offices;
                        console.log('地域情報を取得:' , JSON.stringify((state.areaInfo), null, 2)); 
                        console.log('詳細情報を取得:' ,JSON.stringify((state.targetAreaInfo), null, 2));
    },
    getSelectTA: function(state, selectTA) {
      state.selectTA = selectTA;
    },
    getTargetArea(state, selectArea){ //1つ目のセレクトボックスで選択された情報をもとに詳細なエリアコードを取得
      state.weatherData = {};
      state.targetArea = [];
      console.log('対象エリアの詳細情報の取得を開始');
      state.selectArea = selectArea;
      selectArea.children.forEach((code) => {
       if (state.targetAreaInfo[code]) {
         state.targetArea.push({
           text: state.targetAreaInfo[code].name,
           value: code
         });
       }
     }
     );
     console.log('対象エリアのエリア:', JSON.stringify((state.targetArea), null, 2));
    },

    setWeatherInfo(state, response) {
      state.weatherData = response.data;
      console.log('天気情報を取得:' , response);
    }
    },
    
  actions: {
    async getArea({ commit }) { //地域情報を取得
      console.log('地域情報の取得を開始');
      try { 
      const url = 'https://www.jma.go.jp/bosai/common/const/area.json';
      const response = await axios.get(url);
      commit('setAreaInfo', response);
      } catch(error) {
        console.error("エラー:" , error.message);
      }
    },
    setTargetArea: function({ commit }, targetArea) {
      commit('getTargetArea', targetArea)
    },
    setSelectTA: function({ commit }, selectTA) {
      commit('getSelectTA', selectTA)
    },

    async getWeather({ commit }, selectTA) {
      commit('clearWeatherData');
      console.log('天気情報の取得を開始');
    try { 
      const url = 'https://www.jma.go.jp/bosai/forecast/data/overview_forecast/';
      const response = await axios.get(url + selectTA.value + '.json');
      commit('setWeatherInfo', response);
    } catch (error) {
      console.error("エラー:" , error.message);
    }
    }
  }
}