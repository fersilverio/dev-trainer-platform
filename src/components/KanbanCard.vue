<template>
    <div class="kanban-card bg-white border-l-4 border-l-blue-200 rounded-md p-3 mb-2 shadow-sm cursor-grab">
        <p v-if="card.description" class="text-sm text-gray-600 mt-1">{{ card.description }}</p>
        <h4 class="font-semibold text-gray-800">{{ card.title }}</h4>

        <div class="flex justify-start gap-3 mt-2">
            <label class="btn btn-ghost flex cursor-pointer px-0 avatar avatar-ring avatar-sm" tabindex="0">
                <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="avatar" />
            </label>
            <p class="text-gray-500">{{ card.userResponsible }}</p>
            <span class="badge badge-sm border-gray-100 bg-gray-100 text-gray-600 p-1">{{ card.deadline }}</span>
        </div>
        <span class="text-red-300 mt-2">{{ card.priority }}</span>

    </div>
</template>

<script setup>
import { defineProps, onMounted } from 'vue';

// onMounted(() => {
//     console.log("Chegaram os dados")
//     console.log(props.card[0])
// });

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
    min-height: 90px;
    /* Garante uma altura mínima para arrastar */
}
</style>