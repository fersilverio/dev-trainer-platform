<template>
    <div class="bg-gray-100 flex items-center justify-center min-h-screen overflow-x-scroll w-[1750px]">
        <div
            class="w-full md:w-3/4 lg:w-2/3 xl:w-full bg-white p-8 mr-4 rounded-lg shadow-lg flex flex-col min-h-screen">
            <h1 class="text-black text-3xl font-bold mb-4 text-start">Progresso de tarefas</h1>
            <div class="flex gap-5">
                <KanbanColumn v-for="column in columnDefinitions" :key="column.id" :title="column.title"
                    :columnId="column.id" :cards="column.cards" @drop-column="handleColumnDrop" />
            </div>
        </div>
    </div>
</template>
<script setup>
import KanbanColumn from '../components/KanbanColumn.vue'
import { Container, Draggable } from "vue-dndrop";
import { ref } from 'vue';


// 1. Gerenciar o estado dos cards para cada coluna
// Cada ref será uma lista de objetos, representando os cards em cada coluna.
// É crucial que cada card tenha um 'id' único para que Vue e vue-dndrop
// possam rastreá-los corretamente (usando :key).
const columnDefinitions = ref([
    {
        id: 'col1', title: 'Backlog', cards: ref([
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
        ])
    },
    { id: 'col2', title: 'Doing', cards: ref([]) },
    { id: 'col3', title: 'Review', cards: ref([]) },
    { id: 'col4', title: 'For test', cards: ref([]) },
    { id: 'col5', title: 'Testing', cards: ref([]) },
    { id: 'col6', title: 'For Deploy', cards: ref([]) },
]);

// const column2Cards = ref([]);
// const column3Cards = ref([]);
// const column4Cards = ref([]);
// const column5Cards = ref([]);
// const column6Cards = ref([]);

// const kanbanColumns = ref([column1Cards, column2Cards, column3Cards, column4Cards, column5Cards, column6Cards]);

// console.log(kanbanColumns.value.length)
// console.log(kanbanColumns.value[0].value)


/**
 * Função principal para lidar com o evento de drop em qualquer coluna.
 * Ela é responsável por atualizar o estado da coluna de destino e
 * o estado da coluna de origem (se o item foi movido entre colunas).
 *
 * @param {string} columnId O ID da coluna onde o drop ocorreu (ex: 'col1', 'col2').
 * @param {object} dropResult O objeto de resultado fornecido por vue-dndrop.
 */
const handleColumnDrop = (currentColumnId, dropResult) => {
    const currentColumnDef = columnDefinitions.value.find(col => col.id === currentColumnId);
    if (!currentColumnDef) return;
    const currentColumnArrayRef = currentColumnDef.cards; // <---- A correção está aqui

    const {
        addedIndex: addedIndexInCurrentColumn,
        removedIndex: removedIndexInCurrentColumn,
        payload: movedCard,
        isCanceled
    } = dropResult;

    if (isCanceled) {
        return;
    }

    let newItemsInColumn = [...currentColumnArrayRef.value];

    if (removedIndexInCurrentColumn !== null && addedIndexInCurrentColumn !== null) {
        const [reorderedItem] = newItemsInColumn.splice(removedIndexInCurrentColumn, 1);
        newItemsInColumn.splice(addedIndexInCurrentColumn, 0, reorderedItem);
    } else if (addedIndexInCurrentColumn !== null && removedIndexInCurrentColumn === null && movedCard) {
        newItemsInColumn.splice(addedIndexInCurrentColumn, 0, movedCard);
    } else if (removedIndexInCurrentColumn !== null && addedIndexInCurrentColumn === null) {
        newItemsInColumn.splice(removedIndexInCurrentColumn, 1);
    }

    currentColumnArrayRef.value = newItemsInColumn;
};


</script>