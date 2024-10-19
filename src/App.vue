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
        <div v-if="weatherData" class="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8">
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
  data() {
    return {
      city: '',
      weatherData: null,
      loading: false,
      error: null,
      isRaining: false,
      isThundering: false,
      isHot: false,
      isCold: false,
      localTime: '', // Store the local time of the city
    }
  },
  computed: {
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

<style>
/* Background gradients for different times */
.bg-dawn {
  background: linear-gradient(to bottom, #493364, #22315b);
}

.bg-morning {
  background: linear-gradient(to bottom, #62ddff, #5a99ff);
}

.bg-noon {
  background: linear-gradient(to bottom, #309efe, #04f2ff);
}

.bg-sunset {
  background: linear-gradient(to bottom, #ff6d99, #ff9f21);
}

.bg-night {
  background: linear-gradient(to bottom, #000c2b, #040b25);
}

/* Rain Animation */
.rain {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
  pointer-events: none;
}

.drop {
  position: absolute;
  width: 3px; /* Wider drop */
  height: 40px; /* Taller raindrop */
  background: rgba(255, 255, 255, 0.6);
  transform-origin: top;
  animation: rain-fall 1s linear infinite;
  left: calc(var(--d) * 5%); /* Random horizontal positioning */
  opacity: calc(var(--d) * 0.05); /* Varying opacity for realism */
}

@keyframes rain-fall {
  0% {
    transform: translateY(-150px) scaleY(1); /* Drops start off-screen */
  }
  70% {
    transform: translateY(calc(100vh - 140px)) scaleY(1); /* Drops fall to near bottom */
  }
  100% {
    transform: translateY(calc(100vh - 120px)) scaleY(0.3); /* Shrinking and disappearing effect */
    opacity: 0;
  }
}

/* Add more raindrops */
.rain .drop {
  --d: calc(1 + var(--n) * 1.2); /* Vary the timing for each drop */
}

/* Cloud and Rain Effect */
.weather-icon {
  position: relative;
  width: 100px;
  height: 100px;
  margin-left: 10px; /* Tambahkan margin kanan jika ingin memberi jarak ekstra */
}

.cloud {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 60px;
  height: 30px;
  background: #b8c6db;
  border-radius: 20px;
  animation: float 3s ease-in-out infinite;
}

.cloud:before {
  content: '';
  position: absolute;
  top: -15px;
  left: 12px;
  width: 30px;
  height: 30px;
  background: inherit;
  border-radius: 50%;
}

.cloud:after {
  content: '';
  position: absolute;
  top: -10px;
  left: -5px;
  width: 20px;
  height: 20px;
  background: inherit;
  border-radius: 50%;
}

.rain-drops {
  position: absolute;
  top: 60px;
  left: 30px;
  width: 40px;
  height: 20px;
}

.rain-drops:before,
.rain-drops:after {
  content: '';
  position: absolute;
  width: 3px;
  height: 10px;
  background: #b8c6db;
  border-radius: 2px;
  animation: rain-drop 1.5s infinite;
}

.rain-drops:before {
  left: 10px;
}

.rain-drops:after {
  left: 25px;
  animation-delay: 0.2s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

@keyframes rain-drop {
  0% {
    transform: translateY(0) scaleY(1);
    opacity: 1;
  }
  70% {
    transform: translateY(20px) scaleY(1);
    opacity: 1;
  }
  100% {
    transform: translateY(30px) scaleY(0.3);
    opacity: 0;
  }
}

/* Thunder Animation */
.thunder {
  position: absolute;
  width: 100%;
  height: 100%;
  background: transparent;
  animation: thunder-flash 6s infinite;
}

@keyframes thunder-flash {
  0%, 95%, 98% {
    background: transparent;
  }
  96%, 99% {
    background: rgba(255, 255, 255, 0.2);
  }
  97% {
    background: rgba(255, 255, 255, 0.4);
  }
}

/* Heat Waves Animation */
.heat-waves {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(0deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%);
  animation: heat-wave 2s ease-in-out infinite;
  transform-origin: bottom;
}

@keyframes heat-wave {
  0%, 100% {
    transform: scaleY(1);
    opacity: 0.3;
  }
  50% {
    transform: scaleY(1.2);
    opacity: 0.7;
  }
}

/* Snowflake Animation */
.snowflakes {
  position: absolute;
  width: 100%;
  height: 100%;
}

.snowflake {
  position: absolute;
  color: white;
  font-size: 1.5em;
  left: calc(var(--d) * 5%);
  animation: snowfall 10s linear infinite;
  animation-delay: calc(var(--d) * -0.5s);
}

@keyframes snowfall {
  0% {
    transform: translateY(-20px) rotate(0deg);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  100% {
    transform: translateY(calc(100vh + 20px)) rotate(360deg);
    opacity: 0;
  }
}
</style>
