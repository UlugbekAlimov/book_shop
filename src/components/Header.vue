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
            <input v-model="name" class="rounded w-full py-2 px-3 text-black" type="text" placeholder="Название">
          </div>
          <div class="mb-4">
            <label class="block text-black text-sm font-bold mb-2" for="authors">Название автора:</label>
            <input v-model="authors" class="rounded w-full py-2 px-3 text-black" type="text" placeholder="Название">
          </div>
          <div class="mb-4">
            <label class="block text-black text-sm font-bold mb-2" for="price">Цена:</label>
            <input v-model="price" class="rounded w-full py-2 px-3 text-black" type="number" placeholder="Цена">
          </div>
          <div class="mb-4">
            <label class="block text-black text-sm font-bold mb-2" for="description">Описание:</label>
            <input v-model="description" class="rounded w-full py-2 px-3 text-black" type="text" placeholder="Описание">
          </div>
          <div class="mb-4">
            <label class="block text-black text-sm font-bold mb-2" for="category">Категория:</label>
            <select v-model="category" class="rounded w-full py-2 px-3 text-black">
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-black text-sm font-bold mb-2" for="image">Изображение:</label>
            <input @change="handleImageUpload" class="rounded w-full py-2 px-3 text-black" type="file" placeholder="Изображение">
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
import { ref } from 'vue';
import { db, storage } from '../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { ref as storageRef, uploadBytes } from 'firebase/storage';
import Modal from '../components/Modal.vue';

export default {
  components: {
    Modal
  },
  data() {
    return {
      name: '',
      authors: '',
      price: '',
      image: null,
      description: '',
      category: '', 
      categories: [] 
    };
  },
  methods: {
    openModal() {
      this.$refs.modal.openModal();
    },
    handleImageUpload(event) {
      const image = event.target.files[0];
      this.$emit('imageUploaded', image); 
    },
    async fetchCategories() {
      try {
        const querySnapshot = await getDocs(collection(db, 'categories'));
        this.categories = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
      } catch (error) {
        console.error('Ошибка при получении категорий:', error);
      }
    },
    async addBook() {
      try {
        // Добавление книги
        const bookRef = await addDoc(collection(db, 'books'), {
          name: this.name,
          authors: this.authors,
          price: this.price,
          description: this.description,
          category: this.category
        });
        
        if (this.image) {
          const imageRef = storageRef(storage, `images/${this.image.name}`);
          await uploadBytes(imageRef, this.image);
        }

        console.log('Книга успешно добавлена');
        this.$refs.modal.closeModal();
      } catch (error) {
        console.error('Ошибка при добавлении книги:', error);
      }
    }
  },
  created() {
    this.fetchCategories();
  }
};
</script>
