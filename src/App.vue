<!-- <script setup>
import Card from './components/Card.vue';
import KanbanColumnBody from './components/KanbanColumnBody.vue';
import { Container, Draggable } from "vue-dndrop";
import { ref } from 'vue';
import KanbanColumnTitle from './components/KanbanColumnTitle.vue';
import Navbar from './components/Navbar.vue';
import Sidebar from './components/Sidebar.vue';


// 1. Gerenciar o estado dos cards para cada coluna
// Cada ref será uma lista de objetos, representando os cards em cada coluna.
// É crucial que cada card tenha um 'id' único para que Vue e vue-dndrop
// possam rastreá-los corretamente (usando :key).
const column1Cards = ref([
  { id: 'c1-1', text: '[TAREFAS] Criar tabela para tarefas' },
  { id: 'c1-2', text: '[TAREFAS] Construir kanban para tarefas' },
  { id: 'c1-3', text: 'Card 3 (Coluna 1)' },
  { id: 'c1-4', text: 'Card 4 (Coluna 1)' },
  { id: 'c1-5', text: 'Card 5 (Coluna 1)' },
  { id: 'c1-6', text: 'Card 6 (Coluna 1)' },
  { id: 'c1-7', text: 'Card 7 (Coluna 1)' },
  { id: 'c1-8', text: 'Card 8 (Coluna 1)' },
  { id: 'c1-9', text: 'Card 9 (Coluna 1)' },
  { id: 'c1-10', text: 'Card 10 (Coluna 1)' },
  { id: 'c1-11', text: 'Card 11 (Coluna 1)' },
  { id: 'c1-12', text: 'Card 12 (Coluna 1)' },
]);

const column2Cards = ref([]);
const column3Cards = ref([]);
const column4Cards = ref([]);
const column5Cards = ref([]);
const column6Cards = ref([]);

const kanbanColumns = ref([column1Cards, column2Cards, column3Cards, column4Cards, column5Cards, column6Cards]);

console.log(kanbanColumns.value.length)
console.log(kanbanColumns.value[0].value)


/**
 * Função principal para lidar com o evento de drop em qualquer coluna.
 * Ela é responsável por atualizar o estado da coluna de destino e
 * o estado da coluna de origem (se o item foi movido entre colunas).
 *
 * @param {string} columnId O ID da coluna onde o drop ocorreu (ex: 'col1', 'col2').
 * @param {object} dropResult O objeto de resultado fornecido por vue-dndrop.
 */
const handleColumnDrop = (currentColumnId, dropResult) => {
  // Desestruturando o dropResult com nomes mais claros em inglês
  const {
    addedIndex: addedIndexInCurrentColumn,
    removedIndex: removedIndexInCurrentColumn,
    payload: movedCard, // O item que foi adicionado ou removido
    isCanceled
  } = dropResult;

  if (isCanceled) {
    return;
  }

  // Obter a referência do array de cards para a coluna atual
  let currentColumnArrayRef;
  switch (currentColumnId) {
    case 'col1': currentColumnArrayRef = column1Cards; break;
    case 'col2': currentColumnArrayRef = column2Cards; break;
    case 'col3': currentColumnArrayRef = column3Cards; break;
    case 'col4': currentColumnArrayRef = column4Cards; break;
    case 'col5': currentColumnArrayRef = column5Cards; break;
    case 'col6': currentColumnArrayRef = column6Cards; break;
    default: return;
  }

  // Cria uma cópia do array para garantir que a reatividade seja acionada
  let newItemsInColumn = [...currentColumnArrayRef.value];

  // SCENARIO 1: Item was REORDERED WITHIN the same list (origin and destination are the same column)
  if (removedIndexInCurrentColumn !== null && addedIndexInCurrentColumn !== null) {
    const [reorderedItem] = newItemsInColumn.splice(removedIndexInCurrentColumn, 1); // Remove the item from the old position
    newItemsInColumn.splice(addedIndexInCurrentColumn, 0, reorderedItem); // Insert it into the new position
  }
  // SCENARIO 2: Item was ADDED from an EXTERNAL list (this is the destination column)
  else if (addedIndexInCurrentColumn !== null && removedIndexInCurrentColumn === null && movedCard) {
    newItemsInColumn.splice(addedIndexInCurrentColumn, 0, movedCard); // Insert the item into the new position
  }
  // SCENARIO 3: Item was REMOVED to an EXTERNAL list (this is the origin column)
  else if (removedIndexInCurrentColumn !== null && addedIndexInCurrentColumn === null) {
    newItemsInColumn.splice(removedIndexInCurrentColumn, 1); // Remove the item from the list
  }

  // Atualiza o valor da ref com o novo array
  currentColumnArrayRef.value = newItemsInColumn;
};


</script> -->


<!-- <template>
  <Navbar />
  <div class="flex flex-1 justify-start">
    <Sidebar />
    <!-- <div class="bg-gray-100 flex items-center justify-center min-h-screen overflow-x-scroll">
      <div class="w-full md:w-3/4 lg:w-2/3 xl:w-full bg-white p-6 rounded-lg shadow-lg flex flex-col min-h-screen">
        <h1 class="text-black text-3xl font-bold mb-4 text-start">Progresso de tarefas</h1>
        <div class="flex gap-5">
          <div>
            <KanbanColumnTitle :stepName="'Backlog'" />
            <KanbanColumnBody column-id="col1" :columnCards="column1Cards" @drop-column="handleColumnDrop" />
          </div>
          <div>
            <KanbanColumnTitle :stepName="'Doing'" />
            <KanbanColumnBody column-id="col2" :columnCards="column2Cards" @drop-column="handleColumnDrop" />
          </div>
          <div>
            <KanbanColumnTitle :stepName="'Review'" />
            <KanbanColumnBody column-id="col3" :columnCards="column3Cards" @drop-column="handleColumnDrop" />
          </div>
          <div>
            <KanbanColumnTitle :stepName="'For test'" />
            <KanbanColumnBody column-id="col4" :columnCards="column4Cards" @drop-column="handleColumnDrop" />
          </div>
          <div>
            <KanbanColumnTitle :stepName="'Testing'" />
            <KanbanColumnBody column-id="col5" :columnCards="column5Cards" @drop-column="handleColumnDrop" />
          </div>
          <div>
            <KanbanColumnTitle :stepName="'For Deploy'" />
            <KanbanColumnBody column-id="col5" :columnCards="column5Cards" @drop-column="handleColumnDrop" />
          </div>
        </div>
      </div>
    </div>
</div>
</template> -->



<!-- <style scoped>
/* Estilos para o feedback visual do arrasto */
.smooth-dnd-ghost {
  opacity: 0.5;
  /* O card fantasma (sombra) durante o arrasto */
  background-color: #ccc;
  border: 1px dashed #666;
}

.smooth-dnd-draggable-wrapper {
  transition: transform 0.3s ease-in-out;
  /* Transição suave para o movimento */
}
</style> -->



<script setup>
import Navbar from './components/Navbar.vue';
import Sidebar from './components/Sidebar.vue';
import { RouterView } from 'vue-router';
</script>

<template>
  <Navbar />
  <div class="flex">
    <Sidebar />
    <div class="flex-1">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
/* You can add global styles here if needed */
</style>