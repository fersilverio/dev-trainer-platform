<template>
    <h2>Colunas Kanban</h2>
    <table class="table-zebra table">
        <thead>
            <tr>
                <th>Nome</th>
                <th>Posição</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="column in columns" :key="column.id">
                <td>{{ column.name }}</td>
                <td>{{ column.position }}</td>
            </tr>
        </tbody>
    </table>

    <label for="modal-1" class="btn bg-slate-700 text-xl w-full">
        +
    </label>

    <!-- Kanban Table Creation Modal Area -->
    <div>
        <input class="modal-state" id="modal-1" type="checkbox" />
        <div class="modal">
            <label class="modal-overlay" for="modal-1"></label>
            <div class="modal-content flex flex-col gap-5">
                <KanbanColumnCreationModal @column-created="getColumns()" />
            </div>
        </div>
    </div>


</template>
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { api } from '../../services/api';
import KanbanColumnCreationModal from '../kanban/KanbanColumnCreationModal.vue';

const route = useRoute();

const projectId = computed(() => route.params.projectId);

type KanbanColumn = {
    name: string;
    position: number;
    createdAt: string;
    updatedAt: string;
    projectId: number;
    id: number;
};

const columns = ref<KanbanColumn[]>([]);


const getColumns = async () => {
    const kanbanColumns = await api.get(`/tasks/${projectId.value}/kanban-columns`);
    columns.value = kanbanColumns.data.data as KanbanColumn[];
};

onMounted(async () => {
    await getColumns();
});

</script>