<script setup>
import Card from './components/Card.vue';
import { Container, Draggable } from "vue-dndrop";
import { ref } from 'vue';


// 1. Gerenciar o estado dos cards para cada coluna
// Cada ref será uma lista de objetos, representando os cards em cada coluna.
// É crucial que cada card tenha um 'id' único para que Vue e vue-dndrop
// possam rastreá-los corretamente (usando :key).
const column1Cards = ref([
  { id: 'c1-1', text: 'Card 1 (Coluna 1)' },
  { id: 'c1-2', text: 'Card 2 (Coluna 1)' },
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

// Funções para obter o payload do item arrastável para cada coluna
// O `payload` é o dado que é "carregado" com o Draggable quando ele é arrastado
// para outro container.
const getColumn1Payload = (index) => column1Cards.value[index];
const getColumn2Payload = (index) => column2Cards.value[index];
const getColumn3Payload = (index) => column3Cards.value[index];
const getColumn4Payload = (index) => column4Cards.value[index];
const getColumn5Payload = (index) => column5Cards.value[index];


</script>


<template>
  <div class="bg-gray-100 flex items-center justify-center min-h-screen">

    <div class="w-full md:w-3/4 lg:w-2/3 xl:w-full bg-white p-6 rounded-lg shadow-lg flex flex-col min-h-screen">

      <h1 class="text-black text-3xl font-bold mb-4 text-center">Painel de Cards Arrasta e Solta</h1>

      <div class="flex gap-5">

        <div class="flex-1 bg-blue-200 rounded-md h-[800px]">
          <Container group-name="colunas" :get-child-payload="getColumn1Payload"
            @drop="(e) => handleColumnDrop('col1', e)"
            class="p-4 gap-2 flex flex-col h-full overflow-y-scroll text-blue-800 font-semibold">
            <Draggable v-for="card in column1Cards" :key="card.id" class="flex-shrink-0">
              <Card :text="card.text" />
            </Draggable>
            <span v-if="column1Cards.length === 0" class="text-gray-500 text-sm text-center italic mt-4 w-full">Arraste
              cards para cá</span>
          </Container>
        </div>

        <div class="flex-1 bg-green-200 rounded-md h-[800px]">
          <Container group-name="colunas" :get-child-payload="getColumn2Payload"
            @drop="(e) => handleColumnDrop('col2', e)"
            class="p-4 gap-2 flex flex-col h-full overflow-y-scroll text-green-800 font-semibold">
            <Draggable v-for="card in column2Cards" :key="card.id" class="flex-shrink-0">
              <Card :text="card.text" />
            </Draggable>
            <span v-if="column2Cards.length === 0" class="text-gray-500 text-sm text-center italic mt-4">Arraste cards
              para cá</span>
          </Container>
        </div>

        <div class="flex-1 bg-red-200 rounded-md h-[800px]">
          <Container group-name="colunas" :get-child-payload="getColumn3Payload"
            @drop="(e) => handleColumnDrop('col3', e)"
            class="p-4 gap-2 flex flex-col h-full overflow-y-scroll text-red-800 font-semibold">
            <Draggable v-for="card in column3Cards" :key="card.id" class="flex-shrink-0">
              <Card :text="card.text" />
            </Draggable>
            <span v-if="column3Cards.length === 0" class="text-gray-500 text-sm text-center italic mt-4">Arraste cards
              para cá</span>
          </Container>
        </div>

        <div class="flex-1 bg-purple-200 rounded-md h-[800px]">
          <Container group-name="colunas" :get-child-payload="getColumn4Payload"
            @drop="(e) => handleColumnDrop('col4', e)"
            class="p-4 gap-2 flex flex-col h-full overflow-y-scroll text-purple-800 font-semibold">
            <Draggable v-for="card in column4Cards" :key="card.id" class="flex-shrink-0">
              <Card :text="card.text" />
            </Draggable>
            <span v-if="column4Cards.length === 0" class="text-gray-500 text-sm text-center italic mt-4">Arraste cards
              para cá</span>
          </Container>
        </div>

        <div class="flex-1 bg-green-200 rounded-md h-[800px]">
          <Container group-name="colunas" :get-child-payload="getColumn5Payload"
            @drop="(e) => handleColumnDrop('col5', e)"
            class="p-4 gap-2 flex flex-col h-full overflow-y-scroll text-green-800 font-semibold">
            <Draggable v-for="card in column5Cards" :key="card.id" class="flex-shrink-0">
              <Card :text="card.text" />
            </Draggable>
            <span v-if="column5Cards.length === 0" class="text-gray-500 text-sm text-center italic mt-4">Arraste cards
              para cá</span>
          </Container>
        </div>

      </div>

    </div>

  </div>
</template>



<style scoped>
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
</style>
