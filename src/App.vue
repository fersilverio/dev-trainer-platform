<script setup>


import Card from './components/Card.vue';
import { Container, Draggable } from "vue-dndrop";
</script>

<template>

  <div class="bg-gray-100 flex items-center justify-center min-h-screen">

    <div class="w-full md:w-3/4 lg:w-2/3 xl:w-full bg-white p-6 rounded-lg shadow-lg flex flex-col min-h-screen">

      <h1 class="text-black">sss</h1>
      <div class="flex gap-5" style="height: 800px;">
        <div class="flex-1 bg-blue-200 p-4 rounded-md flex flex-col  text-blue-800 font-semibold gap-2"
          style="overflow-y: scroll;">

          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />


        </div>

        <div
          class="flex-1 bg-green-200 p-4 rounded-md flex items-center justify-center text-green-800 font-semibold h-full">
          Coluna 2
        </div>

        <div
          class="flex-1 bg-red-200 p-4 rounded-md flex items-center justify-center text-red-800 font-semibold h-full">
          Coluna 3
        </div>

        <div
          class="flex-1 bg-purple-200 p-4 rounded-md flex items-center justify-center text-red-800 font-semibold h-full">
          Coluna 4
        </div>

        <div
          class="flex-1 bg-green-200 p-4 rounded-md flex items-center justify-center text-red-800 font-semibold h-full">
          Coluna 5
        </div>


      </div>

    </div>

  </div>


</template>

<style scoped></style>
