<template>
  <div 
    :class="[
      'min-h-screen transition-all duration-1000 relative overflow-hidden',
      timeOfDayClass
    ]"
  >
    <!-- Weather Effects Overlay -->
    <div class="absolute inset-0 pointer-events-none">
      <!-- Rain Effect -->
      <div v-if="isRaining" class="rain">
        <div v-for="n in 60" :key="n" class="drop" :style="`--d: ${n}`"></div>
      </div>
      <!-- Thunder Effect -->
      <div v-if="isThundering" class="thunder"></div>
      <!-- Hot Weather Effect -->
      <div v-if="isHot" class="heat-waves"></div>
      <!-- Cold Weather Effect -->
      <div v-if="isCold" class="snowflakes">
        <div v-for="n in 60" :key="n" class="snowflake" :style="`--d: ${n}`">❄</div>
      </div>
    </div>

    <div class="relative py-3 sm:max-w-2xl sm:mx-auto w-full px-4 z-10">
      <!-- Search Box -->
      <div class="relative mb-8">
        <input 
          v-model="city" 
          @keyup.enter="getWeather"
          type="text" 
          placeholder="Search for cities..."
          class="w-full px-6 py-4 text-lg border-2 rounded-xl focus:outline-none focus:border-sky-500 shadow-lg placeholder-gray-400 bg-white/90 backdrop-blur-sm"
        >
        <button 
          @click="getWeather"
          class="mt-4 w-full bg-sky-500 text-white px-6 py-4 rounded-xl hover:bg-sky-600 transition-colors text-lg font-semibold shadow-lg"
        >
          Search Weather
        </button>
      </div>

      <!-- Jakarta Weather Card -->
        <div v-if="weatherData" class="bg-white/60 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8">
  <div class="flex justify-between items-start">
    <div>
      <h2 class="text-3xl font-bold text-gray-800 mb-2">{{ weatherData.location.name }}</h2>
      <p class="text-gray-500 text-lg">{{ weatherData.location.country }}</p>
      <p class="text-gray-500 mt-1">{{ localTime }}</p>
    </div>
    <div class="flex items-center">
      <!-- Weather Icon on the left -->
      <div class="text-right mr-10 mb-5">
        <p class="text-4xl font-bold text-gray-800">{{ weatherData.current.temp_c }}°C</p>
        <p class="text-lg text-gray-600 mt-2">{{ weatherData.current.condition.text }}</p>
      </div>
      <div class="weather-icon ">
        <div class="cloud"></div>
        <div class="rain-drops"></div>
      </div>
    </div>
  </div>

  <div class="mt-8 grid grid-cols-3 gap-6">
    <div class="bg-sky-50/80 backdrop-blur-sm p-4 rounded-xl text-center">
      <p class="text-sky-500 text-sm mb-1">Humidity</p>
      <p class="text-xl font-semibold text-gray-800">{{ weatherData.current.humidity }}%</p>
    </div>
    <div class="bg-sky-50/80 backdrop-blur-sm p-4 rounded-xl text-center">
      <p class="text-sky-500 text-sm mb-1">Wind Speed</p>
      <p class="text-xl font-semibold text-gray-800">{{ weatherData.current.wind_kph }} km/h</p>
    </div>
    <div class="bg-sky-50/80 backdrop-blur-sm p-4 rounded-xl text-center">
      <p class="text-sky-500 text-sm mb-1">Pressure</p>
      <p class="text-xl font-semibold text-gray-800">{{ weatherData.current.pressure_mb }} hPa</p>
    </div>
    
  </div>

  
  
</div>

    </div>
  </div>
  
</template>

<script>
const API_KEY = 'bfb8c97e2fdf4ab588762712241910' // Replace with your WeatherAPI key

export default {

  computed: {
    weatherBackgroundClass() {
      // if (!this.weatherData || !this.weatherData.current || !this.weatherData.current.condition) {
      if (!this.weatherData.current.condition.text){
        return '';
      }

      console.log('Current condition:', currentCondition);

      // const currentCondition = new weather(this.weatherData).getText();
      const currentCondition = this.weatherData.current.condition.text.toLowerCase();

      if (currentCondition.includes('sunny')) return 'sunny';
      if (currentCondition.includes('partly cloudy')) {
        console.log('Assigned class: partly-cloudy');
        return 'partly-cloudy';
      }

      
      
      if (currentCondition.includes('cloudy')) return 'cloudy';
      if (currentCondition.includes('overcast')) return 'overcast';
      if (currentCondition.includes('mist')) return 'mist';
      if (currentCondition.includes('rain')) return 'rain';
      if (currentCondition.includes('snow')) return 'snow';
      if (currentCondition.includes('sleet')) return 'sleet';
      if (currentCondition.includes('drizzle')) return 'drizzle';
      if (currentCondition.includes('thunder')) return 'thunder';
      if (currentCondition.includes('blizzard')) return 'blizzard';
      if (currentCondition.includes('fog')) return 'fog';
      if (currentCondition.includes('ice')) return 'ice';
      if (currentCondition.includes('shower') || currentCondition.includes('showers')) return 'shower';
      if (currentCondition.includes('clear')) return 'clear';
      if (currentCondition.includes('spring')) return 'spring';
      if (currentCondition.includes('summer')) return 'summer';
      if (currentCondition.includes('fall')) return 'fall';
      if (currentCondition.includes('winter')) return 'winter';
      if (currentCondition.includes('haze')) return 'haze';
      if (currentCondition.includes('smoky')) return 'smoky';
      if (currentCondition.includes('wind')) return 'windy';
      if (currentCondition.includes('gale')) return 'gale';
      if (currentCondition.includes('tornado')) return 'tornado';
      if (currentCondition.includes('hurricane')) return 'hurricane';

      console.log('Assigned class:', this.weatherBackgroundClass);
      console.log('No specific class assigned, default background applied');


      return 'default-background';// Default to no background if no match
    },

    timeOfDayClass() {
      // Adjust the background class based on local time
      if (!this.localTime) return 'bg-night'; // Default to night if localTime isn't set
      const currentHour = new Date(this.localTime).getHours();

      if (currentHour >= 4 && currentHour < 6) return 'bg-dawn';   // Subuh
      if (currentHour >= 6 && currentHour < 11) return 'bg-morning'; // Pagi
      if (currentHour >= 11 && currentHour < 16) return 'bg-noon';   // Siang
      if (currentHour >= 16 && currentHour < 19) return 'bg-sunset'; // Magrib
      return 'bg-night';  // Malam
    }
    
  },

  data() {
    return {
      city: '',
      weatherData: '',
      loading: false,
      error: null,
      isRaining: false,
      isThundering: false,
      isHot: false,
      isCold: false,
      localTime: '', // Store the local time of the city
    }
  },
  
  methods: {
    async getWeather() {
      if (!this.city) return;
      this.loading = true;
      this.error = null;

      try {
        const response = await fetch(
          `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${this.city}&aqi=no`
        );

        if (!response.ok) {
          throw new Error('City not found');
        }

        this.weatherData = await response.json();

        console.log('Weather data:', this.weatherData);

        // Use localtime directly from the response
        this.localTime = this.weatherData.location.localtime;

        // Determine weather conditions for effects
        const mainWeather = this.weatherData.current.condition.text.toLowerCase();
        this.isRaining = mainWeather.includes('rain');
        this.isThundering = mainWeather.includes('thunder');
        this.isHot = this.weatherData.current.temp_c > 30;
        this.isCold = this.weatherData.current.temp_c < 5;

      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
@import "C:\Users\Oatse\Documents\KULIAH\TUGAS\SEMESTER 5\Pemrograman Web\Project Web\WeatherApp-5\src\css\animation.css"; 

</style>