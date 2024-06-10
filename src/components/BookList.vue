<template>
  <div class="mx-4">
    <h2 class="text-lg font-semibold mb-4">Список книг</h2>
    <div v-if="books && books.length === 0" class="text-gray-500">Книги не найдены</div>
    <ul v-else-if="books">
      <li v-for="book in books" :key="book.id" class="mb-4 p-4 border border-gray-200 rounded">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <img :src="book.image" class="w-24 h-32 object-cover mr-4">
            <div>
              <h3 class="text-lg">Название: {{ book.name }}</h3>
              <p >Описание: {{ book.description }}</p>
              <p >Цена : {{ book.price }}</p>
              <div v-if="book.authors && book.authors.length" class="flex-1">
                <p class=" inline">Авторы: </p>
                <ul class="inline">
                  <li v-for="author in book.authors" :key="author" class="inline">{{ author }}, </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="flex">
            <button class="text-indigo-600 hover:text-indigo-800 mr-2">Редактировать</button>
            <button class="text-red-600 hover:text-red-800">Удалить</button>
          </div>
        </div>
      </li>
    </ul>
    <div v-else class="text-gray-500">Загрузка...</div>
  </div>
</template>

<script>
import { db } from '../firebase.js'; 
import { collection, getDocs } from 'firebase/firestore';

export default {
  data() {
    return {
      books: [], 
      isLoading: true 
    };
  },
  methods: {
    async fetchBooks() {
      try {
        const querySnapshot = await getDocs(collection(db, 'books'));
        this.books = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      } finally {
        this.isLoading = false;
      }
    }
  },
  created() {
    this.fetchBooks();
  }
};
</script>


<style>

</style>
