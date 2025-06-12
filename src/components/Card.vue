<script setup lang="ts">

const props = defineProps(["text"]);


</script>


<template>
    <div class="card w-80">
        <div class="card-body">{{ props.text }}</div>
    </div>
</template>