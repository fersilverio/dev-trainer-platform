<template>
    <h2>Colunas Kanban</h2>
    <div v-if="isBusy" class="flex justify-center">
        <LoadingSpinner />
    </div>
    <div v-else>
        <table class="table-zebra table w-full">
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
    </div>

    <label for="modal-1" class="btn bg-slate-700 text-xl w-80 mt-2">
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
import LoadingSpinner from '../shared/LoadingSpinner.vue';

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

const emit = defineEmits(["hasColumns"]);

const isBusy = ref(false);

const getColumns = async () => {
    isBusy.value = true;
    try {
        const kanbanColumns = await api.get(`/tasks/${projectId.value}/kanban-columns`);
        columns.value = kanbanColumns.data.data as KanbanColumn[];
        emit("hasColumns", { hasColumns: columns.value.length > 0 });
    } catch (error) {
        console.error("Error fetching kanban columns:", error);
    } finally {
        isBusy.value = false;
    }
};

onMounted(async () => {
    await getColumns();
});

</script>