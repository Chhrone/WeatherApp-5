<template>
    <div class="bg-white/60 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8">
      <div class="flex justify-between items-start">
        <div>
          <h2 class="text-3xl font-bold text-gray-800 mb-2">{{ weatherData.location.name }}</h2>
          <p class="text-gray-500 text-lg">{{ weatherData.location.country }}</p>
          <p class="text-gray-500 mt-1">{{ localTime }}</p>
        </div>
        <div class="flex items-center">
          <div class="text-right mr-10 mb-5">
            <p class="text-4xl font-bold text-gray-800">{{ weatherData.current.temp_c }}°C</p>
            <p class="text-lg text-gray-600 mt-2">{{ weatherData.current.condition.text }}</p>
          </div>
          <div class="weather-icon">
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
  </template>
  
  <script>
  export default {
    props: {
      weatherData: Object,
      localTime: String,
    },
  };
  </script>
  