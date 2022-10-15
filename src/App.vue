<template>
  <div class="container">
    <form class="form-inline" @submit.prevent="searchDatabase(searchText)">
      <label for="zitat">Suchbegriff:</label>
      <input
        type="text"
        class="form-control mb-2 mr-sm-2"
        v-model="searchText"
        id="zitat"
      />
      <button @click="searchDatabase(searchText)" class="btn btn-primary mb-2">
        Search
      </button>
    </form>
  </div>

  <div class="table-responsive">
    <table
      class="table table-fixed table-hover table-light"
      v-if="data.results"
    >
      <thead>
        <tr>
          <th scope="col">Display Label</th>
          <th scope="col">Stichwörter</th>
          <th scope="col">Jahr</th>
          <th scope="col">Autor</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="stelle in data.results" :key="stelle.legacy_pk">
          <th scope="row" class="mask" @click="infoDetailed(stelle.legacy_id)">
            <a class="nav-link" href="#">{{ stelle.display_label }}</a>
          </th>
          <td>
            <span
              v-for="stichwort in stelle.key_word"
              :key="stichwort.legacy_pk"
              >{{ stichwort.stichwort }};&nbsp;</span
            >
          </td>
          <td>
            <span
              >{{ stelle.text.start_date }}-{{ stelle.text.end_date }}
            </span>
          </td>
          <td>
            <span v-for="autor in stelle.text.autor" :key="autor.legacy_pk">
              {{ autor.name }};&nbsp;
            </span>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- <div v-for="stelle in data.results" :key="stelle.legacy_pk">
          <h3 @click="infoDetailed(stelle.legacy_id)">>Display Label: {{ stelle.display_label}} </h3>
          <div v-for="stichwort in stelle.key_word" :key="stichwort.legacy_pk">
            <h3>Stichwort: {{ stichwort.stichwort }} </h3>
            <h3>Jahresanfang - Jahresende</h3>
          </div>
        </div> -->
  </div>
</template>

<script lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

import { defineComponent } from "vue";
import { databaseSearch } from "./services/databaseSearch";
import { detailedInfo } from "./services/detailedInfo";

export default defineComponent({
  name: "App",
  components: {},
  data: () => {
    return {
      data() {
        //   return {
        //     items: [
        //     { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
        //     { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
        //     { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
        //     { age: 38, first_name: 'Jami', last_name: 'Carney' }
        //   ]
        // }
      },
      searchText: "",
    };
  },
  methods: {
    async searchDatabase(search) {
      const value = await databaseSearch(search);
      this.data = value;
      console.log("data", this.data);
    },
    async infoDetailed(id) {
      const newid = Math.round(id) + 1;
      detailedInfo(newid);
    },
  },
});
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
