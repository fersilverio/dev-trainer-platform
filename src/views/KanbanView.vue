<template>
    <div class="kanban-board-container flex flex-grow p-6 bg-gray-50 min-h-screen overflow-hidden">
        <div class="flex overflow-x-auto full-hd:w-[1700px] ultrawide:w-[2300px] flex-shrink-0">
            <KanbanColumn v-for="column in columnDefinitions" :key="column.id" :columnId="column.id"
                :title="column.title" v-model:cards="column.cards" @card-moved="handleCardMoved"
                @add-card="handleAddCard" class="mr-4 last:mr-0" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'; // Adicione onMounted e watch para depuração
import KanbanColumn from '../components/KanbanColumn.vue';
import { api } from '../services/api';

// --- SEÇÃO DE DADOS: VERIFIQUE ESTA PARTE COM CUIDADO ---
const columnDefinitions = ref([
    {
        id: 'in-analysis',
        title: '✍️ Em analise',
        cards: ref([]),
        // cards: ref([ // <<< MANTENHA O ref([]) AQUI
        //     {
        //         id: '15',
        //         title: 'Criar tabelas de usuário para autenticação',
        //         description: 'Implementação inicial do sistema',
        //         userResponsible: "Fernando Silva Silvério",
        //         priority: 1,
        //         deadline: "2025/10/10"
        //     },
        //     { id: '16', title: 'Agendar reunião com o cliente', description: 'Discutir requisitos do projeto X.' },
        // ])
    },
    {
        id: 'in-analysis',
        title: '✍️ Em analise',
        cards: ref([]),
        // cards: ref([ // <<< MANTENHA O ref([]) AQUI
        //     {
        //         id: '13', title: 'Comprar materiais de escritório', description: 'Canetas, papel, clips.', userResponsible: "Jorge Valdivia",
        //         priority: 2,
        //         deadline: "2025/10/10"
        //     },
        //     {
        //         id: '14', title: 'Agendar reunião com o cliente', description: 'Discutir requisitos do projeto X.', userResponsible: "Arjen Robben", priority: 3,
        //         deadline: "2025/10/10"
        //     },
        // ])
    },
    {
        id: 'in-analysis',
        title: '✍️ Em analise',
        cards: ref([]),
        // cards: ref([ // <<< MANTENHA O ref([]) AQUI
        //     { id: '11', title: 'Comprar materiais de escritório', description: 'Canetas, papel, clips.' },
        //     { id: '12', title: 'Agendar reunião com o cliente', description: 'Discutir requisitos do projeto X.' },
        // ])
    },
    {
        id: 'in-analysis',
        title: '✍️ Em analise',
        cards: ref([]),
        // cards: ref([ // <<< MANTENHA O ref([]) AQUI
        //     { id: '9', title: 'Comprar materiais de escritório', description: 'Canetas, papel, clips.' },
        //     { id: '10', title: 'Agendar reunião com o cliente', description: 'Discutir requisitos do projeto X.' },
        // ])
    },
    {
        id: 'in-analysis',
        title: '✍️ Em analise',
        cards: ref([]),
        // cards: ref([ // <<< MANTENHA O ref([]) AQUI
        //     { id: '7', title: 'Comprar materiais de escritório', description: 'Canetas, papel, clips.' },
        //     { id: '8', title: 'Agendar reunião com o cliente', description: 'Discutir requisitos do projeto X.' },
        // ])
    },
    {
        id: 'todo',
        title: '✍️ A Fazer',
        cards: ref([]),
        // cards: ref([ // <<< MANTENHA O ref([]) AQUI
        //     { id: '1', title: 'Comprar materiais de escritório', description: 'Canetas, papel, clips.' },
        //     { id: '2', title: 'Agendar reunião com o cliente', description: 'Discutir requisitos do projeto X.' },
        // ])
    },
    {
        id: 'in-progress',
        title: '🚀 Em Andamento',
        cards: ref([]),
        // cards: ref([ // <<< MANTENHA O ref([]) AQUI
        //     { id: '3', title: 'Codificar módulo de autenticação', description: 'Implementar login e registro de usuários.' },
        // ])
    },
    {
        id: 'review',
        title: '🧐 Em Revisão',
        cards: ref([]),
        // cards: ref([ // <<< MANTENHA O ref([]) AQUI
        //     { id: '4', title: 'Revisar código do backend', description: 'Verificar boas práticas e bugs.' },
        // ])
    },
    {
        id: 'done',
        title: '✅ Concluído',
        cards: ref([]),
        // cards: ref([ // <<< MANTENHA O ref([]) AQUI
        //     { id: '5', title: 'Deploy para produção', description: 'Finalizar lançamento da versão 1.0.' },
        //     { id: '6', title: 'Deploy para produção 2', description: 'Finalizar lançamento da versão 1.0 agora é real.' },
        // ])
    },
]);

// --- DEBGUING: ADICIONE ESTES LOGS ---
onMounted(async () => {
    await getColumnDefinitions();

});

watch(columnDefinitions, (newVal) => {
    console.log("KanbanView: columnDefinitions MUDOU:", JSON.parse(JSON.stringify(newVal)));
    if (newVal.length > 0) {
        console.log("KanbanView: Exemplo de coluna 'todo'.cards APÓS MUDANÇA:", newVal[0].cards);
        if (newVal[0].cards) {
            console.log("KanbanView: Exemplo de coluna 'todo'.cards.value APÓS MUDANÇA:", newVal[0].cards.value);
        }
    }
}, { deep: true });


const handleCardMoved = (event) => {
    if (event.type === 'added') {
        // Remove the card from all other columns
        columnDefinitions.value.forEach(col => {
            if (col.id !== event.targetColumnId) {
                const cardIndex = col.cards.findIndex(c => c.id === event.card.id);
                if (cardIndex !== -1) {
                    col.cards.splice(cardIndex, 1);
                }
            }
        });
        // Add the card to the target column if not already present
        const targetColumn = columnDefinitions.value.find(col => col.id === event.targetColumnId);
        if (targetColumn && !targetColumn.cards.some(c => c.id === event.card.id)) {
            // Insert at the newIndex if provided, otherwise push to the end
            if (typeof event.newIndex === 'number') {
                targetColumn.cards.splice(event.newIndex, 0, event.card);
            } else {
                targetColumn.cards.push(event.card);
            }
        }
    } else if (event.type === 'removed') {
        const sourceColumn = columnDefinitions.value.find(col => col.id === event.sourceColumnId);
        if (sourceColumn) {
            const cardIndex = sourceColumn.cards.findIndex(c => c.id === event.card.id);
            if (cardIndex !== -1) {
                sourceColumn.cards.splice(cardIndex, 1);
            }
        }
    } else if (event.type === 'movedWithinColumn') {
        // No action needed, v-model already updates the order
        console.log("Essa ser a nova ordem", event.newOrder);

        // call backend here to update the order of cards in the column usinf newOrder from event

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
        let response = await api.get("/tasks/kanban-column-definitions");
        response = response.data.data;

        const columns = [];

        for (const item of response) {

            if (columns.some(col => col.id === item.kanbanColumn.id)) {
                continue; // Ignoring duplicate columns

            } else {
                columns.push({
                    id: item.kanbanColumn.id,
                    title: item.kanbanColumn.name,
                    cards: ref(response.map(internalItem => {
                        if (internalItem.columnId === item.kanbanColumn.id) {
                            return internalItem.task;
                        }

                    })),
                });
            }

        }

        columnDefinitions.value = columns;
    } catch (error) {
        throw new Error(`Erro ao buscar colunas do Kanban: ${error.message}`);
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