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

  <div class="container">
    <TableComponent v-if="data.results" :theData="data" />

    <!-- <b-table :items="items"></b-table> -->

  </div>
</template>

<script lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

import { defineComponent } from "vue";
import { databaseSearch } from "./services/databaseSearch";
import TableComponent from "./components/TableComponent.vue"
import { StelleTyp } from "./types/databaseTypes.interface";


export default defineComponent({
  name: "App",
  components: {
    TableComponent
  },
  data: () => {
    return {
      data:{} as StelleTyp,
      //  Here I tried to implement the datatable from bootstrap-vue
      //   items: [
      //     { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
      //        { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
      //        { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
      //        { age: 38, first_name: 'Jami', last_name: 'Carney' }
      //      ],
      searchText: "",
    };
  },
  methods: {
    async searchDatabase(search: string): Promise<void>{
      const value = await databaseSearch(search);
      this.data = value;
      console.log("data", this.data);
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
