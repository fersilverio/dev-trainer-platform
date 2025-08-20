<template>
    <div class="flex justify-start m-12 gap-5">
        <div class="flex w-full overflow-x-auto">
            <div class="flex flex-col w-full gap-2">
                <KanbanColumnsTable />
            </div>
        </div>


        <div class="flex w-full overflow-x-auto">
            <div class="flex flex-col w-full gap-2">
                <ProjectUsersTable />
            </div>
        </div>

    </div>
</template>
<script setup lang="ts">
import KanbanColumnsTable from '../components/shared/KanbanColumnsTable.vue';
import ProjectUsersTable from '../components/shared/ProjectUsersTable.vue';

</script>