<template>
    <div class="p-2 bg-white border border-black border-b-white text-black text-center rounded-t-md">
        {{ props.stepName }}
    </div>
</template>
<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    stepName: {
        type: String,
        required: true,
    }
});

</script>