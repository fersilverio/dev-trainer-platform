<template>
    <div>
        <KanbanColumnTitle :stepName="title" />
        <KanbanColumnBody :column-id="columnId" :columnCards="cards"
            @drop-column="$emit('drop-column', columnId, $event)" />
    </div>
</template>
<script setup>
import KanbanColumnTitle from './KanbanColumnTitle.vue';
import KanbanColumnBody from './KanbanColumnBody.vue';
import { defineProps, defineEmits } from 'vue';

defineProps({
    title: {
        type: String,
        required: true,
    },
    columnId: {
        type: String,
        required: true,
    },
    cards: {
        type: Array,
        required: true,
    },
});

defineEmits(['drop-column']);
</script>