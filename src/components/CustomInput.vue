<template>
  <div>
    <label :for="id" class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <div class="mt-1 relative rounded-md shadow-sm">
      <input
        :id="id"
        v-bind="$attrs"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="form-input block w-full sm:text-sm sm:leading-5"
        :class="{ 'border-red-500': showError }"
      />
      <div v-if="showError" class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <svg class="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v4a1 1 0 102 0v-4z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>
    <p v-if="showError" class="mt-2 text-sm text-red-600" id="email-error">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    modelValue: [String, Number],
    showError: {
      type: Boolean,
      default: false,
    },
    errorMessage: String,
  },
};
</script>

<style scoped>

</style>
