<template>
    <div class="flex-1 bg-white border border-black rounded-b-md h-[750px] w-[360px]">
        <Container group-name="colunas" :get-child-payload="getChildPayload" @drop="onDrop"
            class="p-4 gap-2 flex flex-col h-full overflow-y-scroll text-blue-800 font-semibold">
            <Draggable v-for="card in columnCards" :key="card.id" class="flex-shrink-0">
                <Card :cardTitle="card.text" />
            </Draggable>
            <span v-if="columnCards.length === 0" class="text-black text-sm text-center italic mt-4 w-full">Arraste
                cards para cá</span>
        </Container>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { Container, Draggable } from 'vue-dndrop';
import Card from './Card.vue';

const props = defineProps({
    columnId: {
        type: String,
        required: true,
    },
    columnCards: {
        type: Array,
        required: true,
    }
});

const emit = defineEmits(['drop-column']);

const getChildPayload = (index) => {
    return props.columnCards[index];
};

const onDrop = (dropResult) => {
    emit('drop-column', props.columnId, dropResult);
};

</script>