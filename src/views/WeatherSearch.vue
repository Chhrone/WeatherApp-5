<template>
    <div class="relative mb-8">
      <input 
        v-model="localCity" 
        @keyup.enter="emitSearch"
        type="text" 
        placeholder="Search for cities..."
        class="w-full px-6 py-4 text-lg border-2 rounded-xl focus:outline-none focus:border-sky-500 shadow-lg placeholder-gray-400 bg-white/90 backdrop-blur-sm"
      />
      <button 
        @click="emitSearch"
        class="mt-4 w-full bg-sky-500 text-white px-6 py-4 rounded-xl hover:bg-sky-600 transition-colors text-lg font-semibold shadow-lg"
      >
        Search Weather
      </button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      modelValue: String,
    },
    computed: {
      localCity: {
        get() {
          return this.modelValue;
        },
        set(value) {
          this.$emit('update:modelValue', value);
        },
      },
    },
    methods: {
      emitSearch() {
        this.$emit('search');
      },
    },
  };
  </script>
  