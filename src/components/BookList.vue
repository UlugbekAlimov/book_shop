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
              <h3 class="text-lg font-semibold">{{ book.title }}</h3>
              <p class="text-gray-600">{{ book.author }}</p>
              <p class="text-gray-600">{{ book.price }}</p>
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
export default {
  props: {
    books: {
      type: Array,
      required: true
    }
  },
  methods: {

  }
};
</script>

<style>

</style>
