<template>
    <div v-if="!isBusy">
        <div v-if="!columnDefinitions.length" class="mt-60 text-center text-gray-500">
            Nenhuma coluna de kanban ou tarefas encontradas para este projeto.
        </div>

        <div v-else>
            <div class="kanban-board-container flex flex-grow p-6 bg-gray-950 min-h-screen overflow-hidden">
                <div class="flex overflow-x-auto full-hd:w-[1700px] ultrawide:w-[2300px] flex-shrink-0 gap-4">
                    <KanbanColumn v-for="column in columnDefinitions" :key="column.id" :columnId="column.id"
                        :title="column.title" v-model:cards="column.cards" @card-moved="handleCardMoved" />
                </div>
            </div>
        </div>
    </div>
    <div v-else class="mt-60">
        <svg class="spinner-ring flex justify-content-center m-auto" viewBox="25 25 50 50" stroke-width="5">
            <circle cx="50" cy="50" r="20" />
        </svg>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import KanbanColumn from '../components/KanbanColumn.vue';
import { api } from '../services/api';
import type KanbanCard from '../components/KanbanCard.vue';
import type { AxiosResponse } from 'axios';
import { useRoute } from 'vue-router';


type CardMovedEvent =
    | {
        type: 'added';
        targetColumnId: string;
        card: KanbanCard;
        newIndex: number;
    }
    | {
        type: 'removed';
        sourceColumnId: string;
        card: KanbanCard;
        oldIndex: number;
    }
    | {
        type: 'movedWithinColumn';
        targetColumnId: string;
        card: KanbanCard;
        newIndex: number;
        oldIndex: number;
        newOrder: string[];
    };

type KanbanCard = {
    id: number;
    title: string;
    taskId: string;
    description: string;
    userResponsible: string;
    priority: number;
    deadline: string;
};


const route = useRoute();

const projectId = computed(() => route.params.projectId);

const isBusy = ref(false);

const columnDefinitions = ref([
    {
        id: 1,
        title: '✍️ Em analise',
        cards: [] as KanbanCard[],
    },
    {
        id: 2,
        title: '📝 Em desenvolvimento',
        cards: [] as KanbanCard[],
    },
    {
        id: 3,
        title: '🔍 Em testes',
        cards: [] as KanbanCard[],
    },
    {
        id: 4,
        title: '📦 Preparando entrega',
        cards: [] as KanbanCard[],
    },
    {
        id: 5,
        title: '📬 Entregue',
        cards: [] as KanbanCard[],
    },

]);

onMounted(async () => {
    await getColumnDefinitions();

});


const handleCardMoved = async (event: CardMovedEvent) => {
    switch (event.type) {
        case 'added': {
            removeCardFromAllColumnsExcept(event.card.id, event.targetColumnId);

            const targetColumn = findColumnById(event.targetColumnId);
            if (targetColumn) {
                addCardToColumn(targetColumn, event.card, event.newIndex);
                await updateColumnOrder(targetColumn.id, targetColumn.cards);
            }
            break;
        }

        case 'removed': {
            const sourceColumn = findColumnById(event.sourceColumnId);
            if (sourceColumn) {
                const wasRemoved = removeCardFromColumn(sourceColumn, event.card.id);
                if (wasRemoved) {
                    await updateColumnOrder(sourceColumn.id, sourceColumn.cards);
                }
            }
            break;
        }

        case 'movedWithinColumn': {
            await api.put("/tasks/reorder-kanban-column", {
                columnId: event.targetColumnId,
                newOrderArray: event.newOrder,
            });
            break;
        }
    }
};

// const handleAddCard = ({ columnId, card }) => {

//     console.log(`handleAddCard acionado para coluna ID: ${columnId}`);
//     console.log("Card a ser adicionado:", card);

//     const targetColumn = columnDefinitions.value.find(col => col.id === columnId);

//     // --- VERIFICAÇÕES DE ROBUSTEZ MAIS FORTES ---
//     if (!targetColumn) {
//         console.error(`ERRO CRÍTICO: Coluna com ID "${columnId}" não encontrada em columnDefinitions.`);
//         return; // Sai da função se a coluna não for encontrada
//     }

//     if (!targetColumn.cards) {
//         console.error(`ERRO CRÍTICO: A propriedade 'cards' está faltando no objeto da coluna ${columnId}.`);
//         console.log("Objeto da coluna encontrado:", JSON.parse(JSON.stringify(targetColumn)));
//         return;
//     }

//     // AQUI É O PONTO CRÍTICO: targetColumn.cards DEVE SER UM REF
//     // if (!targetColumn.cards.value) {
//     //     console.error(`ERRO CRÍTICO: 'targetColumn.cards' não é um ref ou seu .value é undefined para a coluna ${columnId}.`);
//     //     console.log("Valor de targetColumn.cards:", targetColumn.cards); // Isso deve ser um RefImpl
//     //     return;
//     // }
//     // --- FIM DAS VERIFICAÇÕES ---

//     // Se passarmos por todas as verificações, podemos adicionar o card com segurança.
//     targetColumn.cards.push(card);
//     console.log(`SUCESSO: Novo card "${card.title}" adicionado à coluna "${columnId}".`);
//     console.log(`Estado atualizado da coluna ${columnId}:`, JSON.parse(JSON.stringify(targetColumn.cards.value)));
// };

const findColumnById = (columnId: string | number) => {
    return columnDefinitions.value.find(col => String(col.id) === String(columnId));
};

const removeCardFromColumn = (column: any, cardId: string | number) => {
    const cardIndex = column.cards.findIndex((c: KanbanCard) => c.id === cardId);
    if (cardIndex !== -1) {
        column.cards.splice(cardIndex, 1);
    }
    return cardIndex !== -1;
};

const removeCardFromAllColumnsExcept = (cardId: string | number, excludeColumnId: string | number) => {
    columnDefinitions.value.forEach(col => {
        if (String(col.id) !== String(excludeColumnId)) {
            removeCardFromColumn(col, cardId);
        }
    });
};

const addCardToColumn = (column: any, card: KanbanCard, index?: number) => {

    removeCardFromColumn(column, card.id);

    if (typeof index === 'number') {
        column.cards.splice(index, 0, card);
    } else {
        column.cards.push(card);
    }
};

const updateColumnOrder = async (columnId: string | number, cards: KanbanCard[]) => {
    await api.put("/tasks/reorder-kanban-column", {
        newOrderArray: cards.map((c: KanbanCard) => ({
            kanbanRegistryId: c.id,
            taskId: c.taskId
        })),
        columnId
    });
};


const getColumnDefinitions = async () => {
    try {
        isBusy.value = true;

        const response: AxiosResponse<{ data: { filledColumnsDefinitions: any[]; emptyColumns: any[] } }> = await api.get(`/tasks/${projectId.value}/kanban-column-definitions`);

        const { filledColumnsDefinitions, emptyColumns } = response.data.data;

        const columnIds = new Set(filledColumnsDefinitions.map((item: any) => item.columnId));

        const finalColumnsSetup = [];

        for (const columnId of columnIds.values()) {
            const cards = filledColumnsDefinitions.filter((item: any) => item.columnId === columnId);

            const columnInfo = {
                id: String(columnId),
                position: filledColumnsDefinitions.find((item: any) => item.columnId === columnId).kanbanColumn.position,
                title: filledColumnsDefinitions.find((item: any) => item.columnId === columnId).kanbanColumn.name,
                cards: cards.map((card: any) => ({
                    id: card.id,
                    title: card.task.title,
                    taskId: card.task.id,
                    description: card.task.deliverableExplanation,
                    userResponsible: card.task.assignedTo,
                    priority: card.task.priority,
                    deadline: card.task.deadline
                })) as KanbanCard[]
            };

            finalColumnsSetup.push(columnInfo);

            if (emptyColumns.length > 0) {
                const emptyColumn = emptyColumns.find((column) => column.id === columnId);
                if (emptyColumn) {
                    finalColumnsSetup.push({
                        id: String(emptyColumn.columnId),
                        position: emptyColumn.kanbanColumn.position,
                        title: emptyColumn.kanbanColumn.name,
                        cards: [] as KanbanCard[]
                    });
                }
            }
        }

        for (const emptyColumn of emptyColumns) {
            if (!columnIds.has(emptyColumn.columnId)) {
                finalColumnsSetup.push({
                    id: emptyColumn.columnId,
                    position: emptyColumn.position,
                    title: emptyColumn.name,
                    cards: [] as KanbanCard[]
                });
            }

        }

        columnDefinitions.value = finalColumnsSetup.sort((a, b) => a.position - b.position);

    } catch (error: any) {
        throw new Error(`Erro ao buscar colunas do Kanban: ${error.message}`);
    } finally {
        isBusy.value = false;
    }
};
</script>

<style scoped>
.kanban-board-container {
    display: flex;
    gap: 1.5rem;
    min-height: 100vh;
    align-items: flex-start;
}
</style>