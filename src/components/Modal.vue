<template>
  <div v-if="isOpen" id="static-modal"
       class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="relative p-4 w-full max-w-2xl max-h-full">
      <div class="relative bg-white rounded-lg shadow dark:bg-[#dadada]">
        <div class="flex items-center justify-between rounded-t dark:border-gray-600">
          <button @click="closeModal" type="button" 
              class="text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto  justify-center items-center ">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
          </button>
        </div>
        <div class="p-4 md:p-5 space-y-4">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    openModal() {
      this.isOpen = true;
    },
    closeModal() {
      this.isOpen = false;
    }
  }
};
</script>

<style>

</style>
