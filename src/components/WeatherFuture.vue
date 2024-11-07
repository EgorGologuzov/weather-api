<template>
  <div class="future">
    <div v-for="(item, index) in getWeatherDaily" :key="index" class="future__item">
      <div>{{ item.day }}</div>
      <div class="future__right">
        <img
          class="future__icon"
          :style="[item.icon ? {'content': 'url(http://openweathermap.org/img/wn/'+item.icon+'d@2x.png)'}: {}]"
        />
        <div>{{ item.temp > 0 ? "+" : "" }}<strong>{{ item.temp }}</strong></div>
      </div>
    </div>
  </div>
</template>
  
<script>
import { mapGetters } from "vuex";

export default {
data() {
    return {};
},

computed: {
  ...mapGetters(["getWeatherDaily"])
  }
}
</script>
  
<style lang="less">
.future {
  margin-top: 20px;
}

.future__icon {
  height: 100%;
  filter: drop-shadow(1px 1px 0 fade(black, 3))
  drop-shadow(-5px -5px 0 fade(black, 8));
}

.future__item {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 50px;
}

.future__right {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: auto;
  height: 100%;
}

.future__icon {
    content: url("../assets/images/question.png");
}
</style>
  