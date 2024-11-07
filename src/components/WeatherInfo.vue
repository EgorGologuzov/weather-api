<template>
  <div class="weather-info">
    <div class="weather-item" title="Скорость ветра">
      <windIcon size="1.1x"></windIcon>
      <span class="value">{{getWeatherInfo.wind}} м/с</span>
    </div>
    <div class="weather-item" title="Направление ветра">
      <ArrowRightIcon size="1.1x"></ArrowRightIcon>
      <span class="value">{{getWeatherInfo.windDirection}}<b>&deg;</b></span>
    </div>
    <div class="weather-item" title="Влажность">
      <DropletIcon size="1.1x"></DropletIcon>
      <span class="value">{{getWeatherInfo.humidity}}%</span>
    </div>
    <div class="weather-item" title="Облачность">
      <CloudIcon size="1.1x"></CloudIcon>
      <span class="value">{{getWeatherInfo.clouds}}%</span>
    </div>
    <div class="weather-item" title="Давление">
      <DownloadCloudIcon size="1.1x"></DownloadCloudIcon>
      <span class="value">{{getWeatherInfo.pressure}} мм. рт. ст.</span>
    </div>
  </div>
</template>

<script>
import { DropletIcon, WindIcon, CloudIcon, DownloadCloudIcon, ArrowRightIcon } from "vue-feather-icons";
import { mapGetters } from "vuex";

export default {
  components: {
    WindIcon,
    DropletIcon,
    CloudIcon,
    DownloadCloudIcon,
    ArrowRightIcon
  },
  computed:{
    ...mapGetters(["getWeatherInfo"])
  }
};
</script>

<style lang="less" scoped>
.weather-info {
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  border-top: 2px solid fade(black, 10);
  padding-top: 20px;
  .weather-item {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--darkColor);
    width: 50%;
    margin-top: 10px;
    .value {
      margin-left: 5px;
      font-weight: 500;
    }
  }
}
</style>
