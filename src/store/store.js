import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
// import ruDesc from "./weatherDescriptions";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    apiBase: "https://api.openweathermap.org/data/2.5/",
    apiKey: "6ae66b5a75956d04b2bab4de20cb2225",   // Create Api Key from https://openweathermap.org
    defaultSearch: "Нижний Тагил",
    search: "",
    isError: false,
    isBusy: false,
    dailyData: [
      {
          day: "Нет",
          temp: 0,
          icon: null
      },
      {
          day: "Нет",
          temp: 0,
          icon: null
      },
      {
          day: "Нет",
          temp: 0,
          icon: null
      },
  ],
    weatherData: {
      name: "Нет",
      temp: 0,
      tempMin: 0,
      tempMax: 0,
      feelsLike: 0,
      description: "Нет",
      icon: null,
      info: "Rain",
      wind: 0,
      humidity: 0,
      clouds: 0,
      country: "NO",
      pressure: 0,
      windDirection: 0,
      city: "Нет"
    },
  },
  getters: {
    getWeatherMain(state) {
      const { temp, feelsLike, description, icon, info, city } = state.weatherData;
      return {
        temp,
        feelsLike,
        description,
        info,
        icon,
        city
      };
    },
    getWeatherInfo(state) {
      const { wind, clouds, humidity, pressure, windDirection } = state.weatherData;
      return {
        wind,
        clouds,
        humidity,
        pressure,
        windDirection,
      };
    },
    getWeatherDaily(state) {
      return state.dailyData;
  },
  getWeatherCountry(state) {
    return state.weatherData.country;
  },
  isSearched(state) {
    return state.search !== "";
  },
  getError(state) {
    return state.isError;
  },
  getBusy(state) {
    return state.isBusy;
  },
  isFirstLoad(state) {
    state.weather.name === "Нет";
  }
  },
  mutations: {
    ["SET_SEARCH"](state, search) {
      state.search = search.toLowerCase();
    },
    ["SET_WEATHER_DATA"](state, data) {
      state.weatherData = data;
    },
    ["SET_DAILY_DATA"](state, data) {
      state.dailyData = data;
    },
    ["SET_ERROR"](state, value) {
      state.isError = value;
    },
    ["SET_BUSY"](state, value) {
      state.isBusy = value;
    },
  },
  actions: {
    async fetchWeatherData({ commit, state }, search) {
      try {
        commit("SET_SEARCH", search);
        commit("SET_BUSY", true);

        const response = await axios({
          method: "get",
          url: `${state.apiBase}weather?q=${search}&units=metric&APPID=${state.apiKey}&lang=ru`,
          timeout: 5000
        });

        const response2 = await axios({
          method: "get",
          url: `${state.apiBase}forecast?q=${search}&units=metric&APPID=${state.apiKey}&lang=ru`,
          timeout: 5000
        });

        if (response.status !== 200 || response2.status !== 200) {
          console.log(response);
          throw new Error();
        }

        const newWeatherData = {
          name: response.data.name,
          temp: response.data.main.temp,
          tempMin: response.data.main.temp_min,
          tempMax: response.data.main.temp_max,
          feelsLike: response.data.main.feels_like,
          description: response.data.weather[0].description,
          icon: response.data.weather[0].icon.substring(0, 2),
          info: response.data.weather[0].main,
          wind: response.data.wind.speed,
          humidity: response.data.main.humidity,
          clouds: response.data.clouds.all,
          country: response.data.sys.country,
          pressure: (response.data.main.pressure / 1.333).toFixed(0),
          windDirection: response.data.wind.deg,
          city: search
        };

        const filterSet = new Set();
        console.log(response2);
        const newDailyData = response2.data.list?.map((day) => { return {
          day: day.dt_txt,
          temp: day.main.temp,
          icon: day.weather[0].icon.substring(0, 2)
        }}).filter((day) => {
          console.log(day, day.day);
          const date = day.day.substring(0, 10);
          const hour = Number(day.day.substring(11, 13));

          if (filterSet.has(date)) {
            return false;
          }

          if (hour >= 15) {
            filterSet.add(date);
            return true;
          }
          
          return false;
        }).filter((day, index) => {
          if (index == 0) {
            return false;
          }

          if (index == 1) {
            day.day = "Завтра";
          } else if (index == 2) {
            day.day = "Послезавтра";
          } else {
            const date = day.day.substring(0, 10);
            day.day = date;
          }
          
          return true;
        })

        
        console.log(newDailyData);

        commit("SET_WEATHER_DATA", newWeatherData);
        commit("SET_DAILY_DATA", newDailyData);
        commit("SET_ERROR", false);
      } catch (error) {
        console.log(error);
        commit("SET_ERROR", true);
      } finally {
        commit("SET_BUSY", false);
      }
    },
    async fetchHints({ state }, search) {
      try {
        const response = await axios({
          method: "get",
          url: `https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=1&appid=${state.apiKey}`,
          timeout: 5000
        });

        if (response.status !== 200) {
          console.log(response);
          throw new Error();
        }

        const data = await response.data;
        return {
          success: true,
          hints: data ?? []
        };
      } catch (error) {
        console.log(error);
        return [];
      }
    },
  },
});

export default store;
