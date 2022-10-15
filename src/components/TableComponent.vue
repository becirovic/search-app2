<template>
    <table
      class="table table-fixed table-hover table-light"
      v-if="theData.results"
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
        <tr v-for="stelle in theData.results" :key="stelle.legacy_pk">
          <th scope="row" class="mask" @click="infoDetailed(stelle.legacy_id)">
            <a class="nav-link" href="#">{{ stelle.display_label }}</a>
          </th>
          <td class="keywords">
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
</template>

<script lang="ts">
import { detailedInfo } from "../services/detailedInfo"
export default{
    props:['theData'],
    methods:{
        async infoDetailed(id:number) {
      const newid = Math.round(id) + 1;
      detailedInfo(newid);
    },
    }
}
</script>

<style scoped>
.keywords{
}</style>