<template>
  <button :class="buttonClass" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'success'
    }
  },
  computed: {
    buttonClass() {
      switch (this.type) {
        case 'success':
          return 'bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline';
        case 'danger':
          return 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline';
        default:
          return 'bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline';
      }
    }
  }
};
</script>

<style scoped>

</style>
