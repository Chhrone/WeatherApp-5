<template>
  <div :class="weatherBackgroundClass">
    <p>Current CSS Class: {{ weatherBackgroundClass }}</p>
    <div
      :class="[ 'min-h-screen transition-all duration-1000 relative overflow-hidden', timeOfDayClass ]"
    >
      <!-- Weather Effects Overlay -->
      <WeatherEffects
        :is-raining="isRaining"
        :is-thundering="isThundering"
        :is-hot="isHot"
        :is-cold="isCold"
      />

      <div class="relative py-3 sm:max-w-2xl sm:mx-auto w-full px-4 z-10">
        <!-- Search Box -->
        <WeatherSearch
          v-model="city"
          @search="getWeather"
        />

        <!-- Weather Card -->
        <WeatherCard v-if="weatherData" :weather-data="weatherData" :local-time="localTime" />
      </div>

      <div v-if="error" class="error-message">{{ error }}</div>
    </div>
  </div>
</template>

<script>
import WeatherCard from './views/WeatherCard.vue';
import WeatherSearch from './views/WeatherSearch.vue';
import WeatherEffects from './views/WeatherEffects.vue';
import { getConditionByTime } from './utils/weatherUtils';  // Import the function

const API_KEY = 'c89eba638b2447f9ac3134234240311';

export default {
  components: {
    WeatherCard,
    WeatherSearch,
    WeatherEffects,
  },
  data() {
    return {
      city: '',
      weatherData: null,
      localTime: '',
      error: null,
      isRaining: false,
      isThundering: false,
      isHot: false,
      isCold: false,
      timeOfDayClass: ''
    };
  },
  computed: {
    weatherBackgroundClass() {
      if (!this.weatherData) return 'default-background';
      const condition = this.weatherData.current.condition.text.toLowerCase();
      const currentHour = this.getLocalHour();

      // Use the separated utility function
      return getConditionByTime(condition, currentHour);
    }
  },
  methods: {
    async getWeather() {
      if (!this.city) {
        this.error = 'Please enter a city';
        return;
      }
      this.error = null;

      try {
        const response = await fetch(
          `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${this.city}&aqi=no`
        );
        if (!response.ok) throw new Error('City not found');

        this.weatherData = await response.json();
        this.localTime = this.weatherData.location.localtime;
        this.updateWeatherConditions(this.weatherData.current.condition.text.toLowerCase());

        // Update timeOfDayClass setelah cuaca didapatkan
        this.updateTimeOfDayClass();
        console.log('Time of Day Class:', this.timeOfDayClass);  // Tambahkan log ini
      } catch (err) {
        this.error = err.message;
      }
    },

    updateTimeOfDayClass() {
      if (this.weatherData) {
        const condition = this.weatherData.current.condition.text.toLowerCase();  // Ambil kondisi cuaca dari API
        const hour = new Date(this.localTime).getHours();  // Gunakan waktu lokal dari API
        this.timeOfDayClass = getConditionByTime(condition, hour);  // Update kelas berdasarkan kondisi cuaca dan jam
        console.log('Updated timeOfDayClass:', this.timeOfDayClass);  // Log untuk memeriksa apakah kelas diubah
      }
    },

    updateWeatherConditions(condition) {
      this.isRaining = condition.includes('rain');
      this.isThundering = condition.includes('thunder');
      this.isHot = this.weatherData.current.temp_c > 30;
      this.isCold = this.weatherData.current.temp_c < 5;
    },
    getLocalHour() {
      return new Date(this.localTime).getHours();
    },
  },
};
</script>

<style>
@import "./assets/css/animation.css";
@import "./assets/css/background.css";
</style>
