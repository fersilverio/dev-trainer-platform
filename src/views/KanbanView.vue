<template>
    <div v-if="!isBusy">
        <div class="kanban-board-container flex flex-grow p-6 bg-gray-950 min-h-screen overflow-hidden">
            <div class="flex overflow-x-auto full-hd:w-[1700px] ultrawide:w-[2300px] flex-shrink-0">
                <KanbanColumn v-for="column in columnDefinitions" :key="column.id" :columnId="column.id"
                    :title="column.title" v-model:cards="column.cards" @card-moved="handleCardMoved" />
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
import { ref, onMounted } from 'vue'; // Adicione onMounted e watch para depuração
import KanbanColumn from '../components/KanbanColumn.vue';
import { api } from '../services/api';
import type KanbanCard from '../components/KanbanCard.vue';
import type { AxiosResponse } from 'axios';


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


const isBusy = ref(false);

const columnDefinitions = ref([
    {
        id: 1,
        title: '✍️ Em analise',
        cards: [] as KanbanCard[],
        // cards: [ ... ]
    },
    {
        id: 2,
        title: '✍️ Em analise',
        cards: [] as KanbanCard[],
    },
    {
        id: 3,
        title: '✍️ Em analise',
        cards: [] as KanbanCard[],
    },
    {
        id: 4,
        title: '✍️ Em analise',
        cards: [] as KanbanCard[],
    },
    {
        id: 5,
        title: '✍️ Em analise',
        cards: [] as KanbanCard[],
    },
    {
        id: 6,
        title: '✍️ A Fazer',
        cards: [] as KanbanCard[],
    },
    {
        id: 7,
        title: '🚀 Em Andamento',
        cards: [] as KanbanCard[],
    },
    {
        id: 8,
        title: '🧐 Em Revisão',
        cards: [] as KanbanCard[],
    },
    {
        id: 9,
        title: '✅ Concluído',
        cards: [] as KanbanCard[],
    },
]);

onMounted(async () => {
    await getColumnDefinitions();

});

// watch(columnDefinitions, (newVal) => {
//     // console.log("KanbanView: columnDefinitions MUDOU:", JSON.parse(JSON.stringify(newVal)));
//     // if (newVal.length > 0) {
//     //     console.log("KanbanView: Exemplo de coluna 'todo'.cards APÓS MUDANÇA:", newVal[0].cards);
//     //     if (newVal[0].cards) {
//     //         console.log("KanbanView: Exemplo de coluna 'todo'.cards.value APÓS MUDANÇA:", newVal[0].cards.value);
//     //     }
//     // }
// }, { deep: true });


const handleCardMoved = async (event: CardMovedEvent) => {
    debugger;
    if (event.type === 'added') {
        // Remover o card de todas as colunas (garantindo que não haja duplicidade)
        columnDefinitions.value.forEach(col => {
            if (String(col.id) !== String(event.targetColumnId)) {
                const cardIndex = col.cards.findIndex((c: KanbanCard) => c.id === event.card.id);
                if (cardIndex !== -1) {
                    col.cards.splice(cardIndex, 1);
                }
            }
        });

        // Adicionar o card na coluna de destino no índice correto
        const targetColumn = columnDefinitions.value.find(col => String(col.id) === String(event.targetColumnId));
        if (targetColumn) {
            // Remover o card se já existir (evita duplicidade)
            const existingIndex = targetColumn.cards.findIndex((c: KanbanCard) => c.id === event.card.id);
            if (existingIndex !== -1) {
                targetColumn.cards.splice(existingIndex, 1);
            }
            // Inserir no índice informado
            if (typeof event.newIndex === 'number') {
                targetColumn.cards.splice(event.newIndex, 0, event.card);
            } else {
                targetColumn.cards.push(event.card);
            }

            // Atualizar backend com a nova ordem
            await api.put("/tasks/reorder-kanban-column", {
                newOrderArray: targetColumn.cards.map((c: KanbanCard) => ({ kanbanRegistryId: c.id, taskId: c.taskId })),
                columnId: targetColumn.id
            });
        }
    } else if (event.type === 'removed') {
        const sourceColumn = columnDefinitions.value.find(col => col.id === +event.sourceColumnId);
        if (sourceColumn) {
            const cardIndex = sourceColumn.cards.findIndex((c: KanbanCard) => c.id === event.card.id);
            if (cardIndex !== -1) {
                sourceColumn.cards.splice(cardIndex, 1);
            }
            console.log(`Card removido da coluna ${event.sourceColumnId}:`, event.card);
            console.log(`Ids na coluna pos remoção:`, sourceColumn.cards.map((c: KanbanCard) => c.id));
            await api.put("/tasks/reorder-kanban-column", {
                newOrderArray: sourceColumn.cards.map((c: KanbanCard) => { return { kanbanRegistryId: c.id, taskId: c.taskId } }),
                columnId: sourceColumn.id
            });
        }
    } else if (event.type === 'movedWithinColumn') {
        // No action needed, v-model already updates the order
        //console.log("Essa ser a nova ordem", event.newOrder);


        await api.put("/tasks/reorder-kanban-column", {
            columnId: event.targetColumnId,
            newOrderArray: event.newOrder,
        });
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

const getColumnDefinitions = async () => {
    try {
        isBusy.value = true;

        const response: AxiosResponse<{ data: { filledColumnsDefinitions: any[]; emptyColumns: any[] } }> = await api.get("/tasks/kanban-column-definitions");

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