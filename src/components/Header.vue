<template>
  <header class="bg-blue-500 text-white p-4">
    <h1 class="text-3xl">Книжный магазин</h1> 
    <hr>
    <div class="mt-4">
      <button @click="openModal" class="border w-[140px] h-[30px] rounded-md">Добавить книгу</button>
    </div>
    <Modal ref="modal">
      <div>
        <h2 class="text-2xl text-black font-bold mb-4">Добавить новую книгу</h2>
        <form @submit.prevent="addBook">
          <div class="mb-4">
            <label class="block text-black text-sm font-bold mb-2" for="title">Название книги:</label>
            <input v-model="title" class="rounded w-full py-2 px-3 text-black" type="text" placeholder="Название">
          </div>
          <div class="mb-4">
            <label class="block text-black text-sm font-bold mb-2" for="author">Автор:</label>
            <input v-model="author" class="rounded w-full py-2 px-3 text-black" type="text" placeholder="Автор">
          </div>
          <div class="mb-4">
            <label class="block text-black text-sm font-bold mb-2" for="price">Цена:</label>
            <input v-model="price" class="rounded w-full py-2 px-3 text-black" type="number" placeholder="Цена">
          </div>
          <div class="mb-4">
            <label class="block text-black text-sm font-bold mb-2" for="price">Цена:</label>
            <input v-model="image" class="rounded w-full py-2 px-3 text-black" type="number" placeholder="Цена">
          </div>
          <div class="flex items-center justify-between">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Добавить
            </button>
          </div>
        </form>
      </div>
    </Modal>
  </header>
</template>

<script>
import Modal from '../components/Modal.vue';

export default {
  components: {
    Modal
  },
  data() {
    return {
      title: '',
      author: '',
      price: ''
    };
  },
  methods: {
    openModal() {
      this.$refs.modal.openModal();
    },
    addBook() {
      
      console.log('Добавлена книга:', this.title, this.author, this.price);
     
      this.$refs.modal.closeModal();
    }
  }
};
</script>
