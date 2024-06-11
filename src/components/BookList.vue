<template>
  <div class="mx-4">
    <h2 class="text-lg font-semibold mb-4">Список книг</h2>
    <div v-if="books && books.length === 0" class="text-gray-500">
      Книги не найдены
    </div>
    <ul v-else-if="books">
      <li
        v-for="book in books"
        :key="book.id"
        class="mb-4 p-4 border border-gray-200 rounded"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div>
              <img  src="../assets/book.webp" class="w-24 h-32 object-cover mr-4" />
            </div>
            <div>
              <h3 class="text-lg">Название: {{ book.name }}</h3>
              <p>Описание: {{ book.description }}</p>
              <p>Цена: {{ book.price }}</p>
              <p>Категория: {{ getCategoryName(book.category) }}</p>
              <div v-if="book.authors && book.authors.length" class="flex-1">
                <p class="inline">Авторы:</p>
                <ul class="inline">
                  <li
                    v-for="author in book.authors"
                    :key="author"
                    class="inline"
                  >
                    {{ author }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="flex">
            <CustomBtn
              @click="openModal(book)"
              class="text-indigo-600 hover:text-indigo-800 mr-2"
            >
              Редактировать
            </CustomBtn>
            <CustomBtn type="danger"
              @click="deleteBook(book.id)"
              class="text-red-600 hover:text-red-800"
            >
              Удалить
            </CustomBtn>
          </div>
        </div>
      </li>
    </ul>
    <div v-else class="text-gray-500">Загрузка...</div>
    <Modal ref="modal">
      <div>
        <h2 class="text-2xl text-black font-bold mb-4">
          {{ selectedBook ? "Редактировать книгу" : "Добавить новую книгу" }}
        </h2>
        <form @submit.prevent="selectedBook ? updateBook() : addBook()">
          <div class="mb-4">
            <label class="block text-black text-sm font-bold mb-2" for="title"
              >Название книги:</label
            >
            <input
              v-model="selectedBook.name"
              class="rounded w-full py-2 px-3 text-black"
              type="text"
              placeholder="Название"
            />
          </div>
          <div class="mb-4">
            <label class="block text-black text-sm font-bold mb-2" for="title"
              >Название автора:</label
            >
            <input
              v-model="selectedBook.authors"
              class="rounded w-full py-2 px-3 text-black"
              type="text"
              placeholder="Название"
            />
          </div>
          <div class="mb-4">
            <label class="block text-black text-sm font-bold mb-2" for="price"
              >Цена:</label
            >
            <input
              v-model="selectedBook.price"
              class="rounded w-full py-2 px-3 text-black"
              type="number"
              placeholder="Цена"
            />
          </div>
          <div class="mb-4">
            <label class="block text-black text-sm font-bold mb-2" for="price"
              >Описание:</label
            >
            <input
              v-model="selectedBook.description"
              class="rounded w-full py-2 px-3 text-black"
              type="text"
              placeholder="Описание"
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-black text-sm font-bold mb-2"
              for="category"
              >Категория:</label
            >
            <select
              v-model="selectedBook.category"
              class="rounded w-full py-2 px-3 text-black"
            >
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </select>
          </div>
          <div class="flex items-center justify-between">
            <button
              class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {{ selectedBook ? "Сохранить изменения" : "Добавить" }}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  </div>
</template>

<script>
import { db } from "../firebase.js";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import Modal from "../components/Modal.vue";
import CustomBtn from './CustomBtn.vue';

export default {
  components: {
    Modal,
    CustomBtn
  },
  data() {
    return {
      books: [],
      categories: [],
      isLoading: true,
      selectedBook: {
        name: "",
        authors: "",
        price: "",
        description: "",
        category: "",
      },
    };
  },
  methods: {
    openModal(book) {
      if (book) {
        this.selectedBook = { ...book };
      } else {
        this.selectedBook = {
          name: "",
          authors: "",
          price: "",
          description: "",
          category: "",
        };
      }
      this.$refs.modal.openModal();
    },
    async fetchBooks() {
      try {
        const querySnapshot = await getDocs(collection(db, "books"));
        this.books = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      } finally {
        this.isLoading = false;
      }
    },
    async fetchCategories() {
      try {
        const querySnapshot = await getDocs(collection(db, "categories"));
        this.categories = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      } catch (error) {
        console.error("Ошибка при получении категорий:", error);
      }
    },
    getCategoryName(categoryId) {
      const category = this.categories.find((cat) => cat.id === categoryId);
      return category ? category.name : "Без категории";
    },
    //удаление
    async deleteBook(bookId) {
      try {
        await deleteDoc(doc(db, "books", bookId));
        this.books = this.books.filter((book) => book.id !== bookId);
        console.log("Книга успешно удалена");
      } catch (error) {
        console.error("Ошибка при удалении книги:", error);
      }
    },
    async addBook() {
      try {
        const newBook = {
          name: this.selectedBook.name,
          authors: this.selectedBook.authors,
          price: this.selectedBook.price,
          description: this.selectedBook.description,
          category: this.selectedBook.category,
        };
        await addDoc(collection(db, "books"), newBook);
        this.books.push({ ...newBook });
        console.log("Книга успешно добавлена");
        this.$refs.modal.closeModal();
      } catch (error) {
        console.error("Ошибка при добавлении книги:", error);
      }
    },
    //измененике
    async updateBook() {
      if (this.selectedBook) {
        try {
          const bookRef = doc(db, "books", this.selectedBook.id);
          await updateDoc(bookRef, {
            name: this.selectedBook.name,
            authors: this.selectedBook.authors,
            price: this.selectedBook.price,
            description: this.selectedBook.description,
            category: this.selectedBook.category,
          });
          this.books = this.books.map((book) =>
            book.id === this.selectedBook.id ? { ...this.selectedBook } : book
          );
          console.log("Книга успешно обновлена");
          this.$refs.modal.closeModal();
        } catch (error) {
          console.error("Ошибка при обновлении книги:", error);
        }
      }
    },
  },
  created() {
    this.fetchBooks();
    this.fetchCategories(); 
  },
};
</script>

<style>

</style>
