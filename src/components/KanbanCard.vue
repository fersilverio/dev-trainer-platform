<template>
    <div class="kanban-card bg-slate-900 border-l-4 border-l-blue-600 rounded-md p-3 mb-2 shadow-sm cursor-grab">
        <div class="flex flex-col h-full justify-between overflow-x-hidden">
            <div v-if="card.description" class="text-sm text-gray-400 mt-1 truncate">{{
                card.description }}
            </div>
            <span class="tooltip tooltip-right" :data-tooltip="card.title">
                <div class="font-semibold text-white truncate w-[250px]">
                    {{ card.title }}
                </div>
            </span>
            <div class="flex justify-start gap-3 mt-2">
                <label class="btn btn-ghost flex cursor-pointer m-1 px-0 avatar avatar-ring avatar-sm" tabindex="0">
                    <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="avatar" />
                </label>
                <p class="text-gray-500 text-sm mt-1">{{ card.userResponsible ?? "Sem responsável" }}</p>
            </div>
            <div class="flex justify-end align-middle gap-2">
                <span class="badge border-gray-500 bg-gray-100 text-gray-600 h-5 mt-2">
                    {{ card.deadline ?? "--/--/--" }}
                </span>
                <PriorityBadge :priority="card.priority" />
            </div>
        </div>

    </div>
</template>

<script setup>
import PriorityBadge from './PriorityBadge.vue';

const props = defineProps({
    card: {
        type: Object,
        required: true,
        // Validação básica para garantir que o card tem pelo menos um ID e título
        validator: (value) => {
            return typeof value.id === 'string' && typeof value.title === 'string';
        }
    }
});


</script>

<style scoped>
.kanban-card {
    min-height: 150px;
    /* Garante uma altura mínima para arrastar */
}
</style>