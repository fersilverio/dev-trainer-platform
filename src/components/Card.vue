<template>
    <div class="card p-2 bg-white border border-black w-80 h-24 rounded-md">
        <div class="">{{ props.cardTitle }}</div>

        <div class="">
            Fernando S. Silvério
        </div>
    </div>
</template>


<script setup>

const props = defineProps({
    cardTitle: {
        type: String,
        required: true,
    },
    // cardCategoryName: {
    //     type: String,
    //     required: true,
    // },
    // cardOwner: {
    //     type: String,
    //     required: true,
    // },
    // cardOwnerPicture: {
    //     type: String,
    //     required: false,
    // }
});


</script>