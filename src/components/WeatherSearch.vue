<template>
    <div class="weather-search">
      <div class="combo-box">
        <input
          type="text"
          placeholder="Найти город"
          class="search-control"
          v-model.trim="search"
          @input="debounceGetHints"
					@keydown.enter="getData"
					@blur="clearHints"
        />
        <ul v-if="hints.length > 0" class="hints-list">
          <li
            v-for="(hint, index) in hints"
            :key="index"
            @click="selectHint(hint?.local_names['ru'] ?? hint.name)"
            class="hint-item"
          >
            {{ `${hint?.local_names['ru'] ?? hint.name} (${hint.country})` }}
          </li>
        </ul>
      </div>
      <span class="country" v-if="isSearched">({{ getWeatherCountry }})</span>
    </div>
  </template>
  
  <script>
	import { mapActions, mapGetters } from "vuex";

  export default {
    data() {
      return {
        search: '',
        hints: [],
        timeout: null
      };
    },
		computed: {
			...mapGetters(["isSearched", "getWeatherCountry", "getError"])
		},
    methods: {
      ...mapActions(["fetchWeatherData", "fetchHints"]),
      async getHints() {
        try {
          const result = await this.fetchHints(this.search);
					this.hints = result.hints;
        } catch (error) {
          console.error(error);
        }
      },
      debounceGetHints() {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          if (this.search) {
            this.getHints(this.search);
          } else {
            this.hints = [];
          }
        }, 500);
      },
      selectHint(hint) {
        this.search = hint;
				this.clearHints();
        this.getData(); 
      },
      getData() {
        this.fetchWeatherData(this.search);
      },
			clearHints() {
				setTimeout(() => { this.hints = [] }, 200);
			}
    },
  };
  </script>
  
  <style>
  .combo-box {
    position: relative;
  }
  
  .hints-list {
    position: absolute;
    background: white;
    border: 1px solid #ccc;
    list-style-type: none;
    padding: 0;
    margin: 0;
    width: 100%;
    z-index: 10;
  }
  
  .hint-item {
    padding: 8px;
    cursor: pointer;
  }
  
  .hint-item:hover {
    background-color: #f0f0f0;
  }

	.weather-search {
  position: relative;
  .search-control {
    width: 100%;
    height: 50px;
    border: 2px solid fade(black, 10);
    border-radius: 100px;
    outline: none;
    background-color: transparent;
    font-size: 16px;
    padding-left: 25px;
    padding-right: 25px;
    transition: all 0.4s;
    &::placeholder {
      color: fade(black, 60);
    }
    &:focus {
      background-color: #fff;
      box-shadow: 0 8px 16px fade(black, 25);
      border-color: fade(black, 5);
      font-weight: 600;
      &::placeholder {
        font-weight: 400;
      }
    }
  }
  .error {
    position: absolute;
    color: red;
    text-align: center;
    bottom: -35px;
    left: 0;
    right: 0;
    margin: auto;
    font-size: 14px;
  }
  .country {
    position: absolute;
    top: 50%;
    right: 30px;
    transform: translateY(-50%);
    color: var(--grayColor);
  }
}
  </style>
  

	<!-- <template>
    <div class="weather-search">
      <div class="combo-box">
        <select class="search-control" @change="onChange($event)">
					<option>Москва</option>
					<option>Нью-Йорк</option>
					<option>Нижний Тагил</option>
				</select>
      </div>
      <span class="country" v-if="isSearched">({{ getWeatherCountry }})</span>
    </div>
  </template>
  
  <script>
	import { mapActions, mapGetters } from "vuex";

  export default {
    data() {
      return {
        search: '',
        hints: [],
        timeout: null
      };
    },
		computed: {
			...mapGetters(["isSearched", "getWeatherCountry", "getError"])
		},
    methods: {
      ...mapActions(["fetchWeatherData", "fetchHints"]),
      onChange(event) {
				console.log(event.target.value);
			}
    },
  };
  </script>
  
  <style>
  .combo-box {
    position: relative;
  }
  
  .hints-list {
    position: absolute;
    background: white;
    border: 1px solid #ccc;
    list-style-type: none;
    padding: 0;
    margin: 0;
    width: 100%;
    z-index: 10;
  }
  
  .hint-item {
    padding: 8px;
    cursor: pointer;
  }
  
  .hint-item:hover {
    background-color: #f0f0f0;
  }

	.weather-search {
  position: relative;
  .search-control {
    width: 100%;
    height: 50px;
    border: 2px solid fade(black, 10);
    /* border-radius: 100px; */
    outline: none;
    background-color: transparent;
    font-size: 16px;
    padding-left: 25px;
    padding-right: 25px;
    transition: all 0.4s;
    &::placeholder {
      color: fade(black, 60);
    }
    &:focus {
      background-color: #fff;
      box-shadow: 0 8px 16px fade(black, 25);
      border-color: fade(black, 5);
      font-weight: 600;
      &::placeholder {
        font-weight: 400;
      }
    }
  }
  .error {
    position: absolute;
    color: red;
    text-align: center;
    bottom: -35px;
    left: 0;
    right: 0;
    margin: auto;
    font-size: 14px;
  }
  .country {
    position: absolute;
    top: 50%;
    right: 30px;
    transform: translateY(-50%);
    color: var(--grayColor);
  }
}
</style> -->
  