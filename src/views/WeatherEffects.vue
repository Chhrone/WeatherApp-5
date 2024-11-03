<template>
    <div class="absolute inset-0 pointer-events-none">
      <template v-if="isRaining">
        <div class="rain">
          <div v-for="n in 60" :key="n" class="drop" :style="`--d: ${n}`"></div>
        </div>
      </template>
      <template v-if="isThundering"><div class="thunder"></div></template>
      <template v-if="isHot"><div class="heat-waves"></div></template>
      <template v-if="isCold">
        <div class="snowflakes">
          <div v-for="n in 60" :key="n" class="snowflake" :style="`--d: ${n}`">❄</div>
        </div>
      </template>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isRaining: Boolean,
      isThundering: Boolean,
      isHot: Boolean,
      isCold: Boolean,
    },
  };
  </script>
  