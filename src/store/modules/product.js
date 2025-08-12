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
    targetNumber: {}, // 2つ目のセレクトボックスの選択結果を格納
    toggle: false,
    logData:[], // 検索履歴を格納
    deleteLog:[], //削除結果を格納
    insertLog:[], //検索履歴の追加結果を格納
    headers: [ //検索履歴一覧のヘッダー
      {
        text: '検索エリア',
        value: 'RegionArea'
      },
      {
        text: '詳細エリア',
        value: 'TargetArea'
      },
      {
        text: '天気情報',
        value: 'weatherButton',
        sortable:false
      },
      {
        text: '削除',
        value: 'delete',
        sortable:false
      }
    ]
  },
  getters: {
    areaInfo: state => state.areaInfo,
    targetArea: state => state.targetArea,
    targetNumber: state => state.targetNumber,
    targetAreaInfo: state => state.targetAreaInfo,
    selectArea: state => state.selectArea,
    weatherData: state => state.weatherData,
    headers: state => state.headers,
    logData: state => state.logData
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
    setLog(state, response) {
      state.logData = response.data.List;
      console.log(state.logData); 
    },
    getTargetNumber: function(state, targetNumber) {
      state.targetNumber = targetNumber;
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
    },
    setDeleteLog (state, response) {
      state.deleteLog = response.data;
      console.log('検索履歴を削除:' , state.deleteLog);
    },
    setInsertLog (state, response) {
      state.insertLog = response.data;
      console.log('検索履歴へ追加:' , state.insertLog);
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
    setTargetNumber: function({ commit }, targetNumber) {
      commit('getTargetNumber', targetNumber)
    },

    async getWeather({ commit }, targetNumber) {
      console.log('天気情報の取得を開始');
    try { 
      const url = 'https://www.jma.go.jp/bosai/forecast/data/overview_forecast/';
      const response = await axios.get(url + targetNumber.value + '.json');
      commit('setWeatherInfo', response);
    } catch (error) {
      console.error("エラー:" , error.message);
    }
    },
    async getLog({ commit }) { //検索履歴を取得
      console.log('検索履歴の取得を開始');
      try { 
      const url = 'https://m3h-suzuki-20250801.azurewebsites.net/api/SELECT?';
      const response = await axios.get(url);
      commit('setLog', response);
      } catch(error) {
        console.error("エラー:" , error.message);
      }
    },
    async deleteLog({ commit }, item) { //選択された検索履歴の削除フラグを変更
      console.log('検索履歴の削除を開始');
      try { 
      const url = 'https://m3h-suzuki-20250801.azurewebsites.net/api/UPDATE?';
      const response = await axios.get(url + 'ID=' + item.ID);
      commit('setDeleteLog', response);
      } catch(error) {
        console.error("エラー:" , error.message);
      }
    },
    async saveLog({ commit }, data) { //検索履歴を追加
      console.log('検索履歴を追加');
      try { 
      const url = 'https://m3h-suzuki-20250801.azurewebsites.net/api/INSERT?';
      const response = await axios.get(
        url + 'RegionNumber=' + data.RegionNumber + '&RegionArea=' + data.RegionArea +
        '&TargetNumber=' + data.TargetNumber + '&TargetArea=' + data.TargetArea
      );
      commit('setInsertLog', response);
      } catch(error) {
        console.error("エラー:" , error.message);
      }
    }
  }
}