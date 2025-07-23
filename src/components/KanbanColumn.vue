<template>
    <div
        class="kanban-column flex flex-col bg-gray-100 border border-gray-300 rounded-lg shadow-md w-[300px] flex-shrink-0">
        <div class="kanban-column-header bg-gray-950 text-white p-3 rounded-t-lg font-bold text-lg text-center">
            {{ title }}
        </div>

        <draggable class="kanban-column-body flex-grow p-3 flex flex-col gap-2 overflow-y-auto"
            v-model="internalColumnCards" group="kanban-board" item-key="id" @change="onDraggableChange">
            <template #item="{ element: card }">
                <KanbanCard :card="card" />
            </template>

            <template #footer>
                <div v-if="internalColumnCards.length === 0" class="text-sm text-gray-500 text-center italic mt-4 p-2">
                    Arraste cards para cá ou adicione um novo!
                </div>
            </template>
        </draggable>

        <!-- <div class="p-3 border-t border-gray-300">
            <button @click="addNewCard"
                class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                + Adicionar Card
            </button>
        </div> -->
    </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue';
import draggable from 'vuedraggable';
import KanbanCard from './KanbanCard.vue'; // Importe o componente do card

const props = defineProps({
    columnId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    // A prop 'cards' é o array de cards que vem do pai.
    cards: {
        type: Array,
        required: true,
        default: () => [] // Garante que cards sempre seja um array
    }
});

const emit = defineEmits(['update:cards', 'card-moved', 'add-card']);

// Cria um ref local que é uma cópia da prop 'cards'.
// O vuedraggable vai operar diretamente neste 'internalColumnCards'.
const internalColumnCards = ref([...props.cards]);

// WATCHER: Garante que 'internalColumnCards' seja atualizado
// caso a prop 'cards' mude do componente pai.
watch(() => props.cards, (newVal) => {
    internalColumnCards.value = [...newVal];
}, { deep: true }); // 'deep: true' é importante para arrays de objetos.

const onDraggableChange = (event) => {
    // 1. Atualiza a prop `cards` do componente pai via `v-model`
    // Isso reflete as mudanças (reordenação dentro da mesma coluna,
    // ou a adição de um item vindo de outra coluna) no array de dados do pai.
    emit('update:cards', internalColumnCards.value);

    // 2. Emite um evento 'card-moved' para o componente pai
    // Este evento é usado para o pai gerenciar a lógica de movimento entre colunas.
    if (event.added) {
        emit('card-moved', {
            type: 'added',
            targetColumnId: props.columnId, // ID desta coluna
            card: event.added.element,       // O card que foi adicionado
            newIndex: event.added.addedIndex,  // Novo índice do card nesta coluna
        });
    } else if (event.removed) {
        emit('card-moved', {
            type: 'removed',
            sourceColumnId: props.columnId,  // ID desta coluna
            card: event.removed.element,     // O card que foi removido
            oldIndex: event.removed.removedIndex, // Antigo índice do card nesta coluna
        });
    } else if (event.moved) {
        // Card movido DENTRO da mesma coluna.
        // O `v-model` já cuidou da reordenação no `internalColumnCards.value`.

        const newOrderArrayIndexes = internalColumnCards.value.map(card => card.id);
        console.log("KanbanColumn: Nova ordem dos cards:", newOrderArrayIndexes);

        emit('card-moved', {
            type: 'movedWithinColumn',
            targetColumnId: props.columnId,
            card: event.moved.element,
            newIndex: event.moved.newIndex,
            oldIndex: event.moved.oldIndex,
            newOrder: newOrderArrayIndexes // Envia a nova ordem dos cards
        });
    }
};

const addNewCard = () => {
    // Para simplificar, geramos um ID e um título simples.
    // Em uma aplicação real, você usaria um modal para pegar os detalhes do usuário.
    const newCard = {
        id: `card-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        title: `Novo Card ${internalColumnCards.value.length + 1}`,
        description: 'Descrição do novo card.'
    };
    emit('add-card', { columnId: props.columnId, card: newCard });
};
</script>

<style scoped>
.kanban-column {
    height: 800px;
    /* Altura fixa para as colunas */
}

.kanban-column-body {
    min-height: 100px;
    /* Altura mínima para arrastar se a coluna estiver vazia */
}
</style>