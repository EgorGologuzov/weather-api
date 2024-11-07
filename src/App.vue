<template>
  <div id="app" class="app">
    <div class="layout-card">
      <div class="card">
        <WeatherSearch />
        <div class="download" v-if="getBusy"><strong>Загрузка...</strong></div>
        <div class="error" v-if="getError && !getBusy">Не удалось получить ответ от API. Попробуйте позже.</div>
        <WeatherMain />
        <WeatherInfo v-if="true" />
        <WeatherFuture v-if="true" />
      </div>
      <div class="spliter"><img /></div>
    </div>
  </div>
</template>

<script>
import WeatherSearch from "@/components/WeatherSearch";
import WeatherMain from "@/components/WeatherMain";
import WeatherInfo from "@/components/WeatherInfo";
import WeatherFuture from "@/components/WeatherFuture";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "App",
  components: {
    WeatherSearch,
    WeatherMain,
    WeatherInfo,
    WeatherFuture,
  },
  computed: {
    ...mapGetters(["getBusy", "getError"])
  },
  methods: {
    ...mapActions(["fetchWeatherData"]),
    initData() {
      this.fetchWeatherData(this.$store.state.defaultSearch);
    }
  },
  created() {
    this.initData();
  }
};
</script>

<style lang="less">
@import url("https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,400;0,700;0,800;0,900;1,300;1,500&display=swap");
:root {
  --cardWidth: 360px;
  --darkColor: #666;
  --grayColor: #999;
  --cardBgColor: #f1f1f1;
  --cloudAnimateTime: 150s;
  --clearAnimationTime: 120s;
  --snowAnimateTime: 15s;
  --rainAnimateTime: 70s;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.5);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Jost", sans-serif;
}

html,
body {
    height: 100%;
    margin: 0;
    padding: 0;
}

body {
    display: flex;
    flex-direction: column;
    position: relative;
    background-image: url("./assets/images/clear.jpg");
}

.app {
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1;
  overflow-y: auto;
}

.layout-card {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    min-height: 100vh;
    padding: 10px;
}

.spliter {
  width: 100%;
  height: 20px;
}

.card {
  max-width: var(--cardWidth);
  width: 100%;
  padding: 40px;
  margin: 20px;
  border-radius: 20px;
  box-shadow: 0 0 70px fade(black, 30);
  z-index: 9999;
  background-color: var(--cardBgColor);

  @media (max-height: 767px) {
    padding: 30px;
  } 
}

.download {
    text-align: center;
    margin-top: 40px;
}

.error {
    text-align: center;
    color: red;
    margin-top: 40px;
}

@media (max-width: 480px) {
  .card {
    padding: 30px;
  }
}
</style>
