<template>
    <span :class="['badge', 'text-center h-5 align-middle mt-2', badgeColor]">
        {{ badgeText }}
    </span>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    priority: {
        type: Number,
        required: true
    }
});

const badgeText = computed(() => {
    switch (props.priority) {
        case 1:
            return "Alta";
        case 2:
            return "Média";
        case 3:
            return "Baixa";
        default:
            return "N/A";
    }
});

const badgeColor = computed(() => {
    switch (props.priority) {
        case 1:
            return "bg-red-700 border-red-800";
        case 2:
            return "bg-yellow-600 border-yellow-500";
        case 3:
            return "bg-blue-400 border-blue-500";
        default:
            return "bg-gray-400 border-gray-500";
    }
});

</script>