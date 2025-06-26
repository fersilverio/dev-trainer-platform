<template>
    <div class="kanban-card bg-white border-l-4 border-l-blue-200 rounded-md p-3 mb-2 shadow-sm cursor-grab">
        <h4 class="font-semibold text-gray-800">{{ card.title }}</h4>
        <p v-if="card.description" class="text-sm text-gray-600 mt-1">{{ card.description }}</p>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

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