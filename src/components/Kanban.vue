<template>
    <div class="bg-gray-100 flex items-center justify-center min-h-screen">
        <div class="w-full md:w-3/4 lg:w-2/3 xl:w-full bg-white p-6 rounded-lg shadow-lg flex flex-col min-h-screen">
            <h1 class="text-black text-3xl font-bold mb-4 text-start">Progresso de tarefas</h1>
            <div class="flex gap-5 overflow-x-scroll">
                <div>
                    <KanbanColumnTitle :stepName="'Backlog'" />
                    <KanbanColumnBody column-id="col1" :columnCards="column1Cards" @drop-column="handleColumnDrop" />
                </div>
                <div>
                    <KanbanColumnTitle :stepName="'Doing'" />
                    <KanbanColumnBody column-id="col2" :columnCards="column2Cards" @drop-column="handleColumnDrop" />
                </div>
                <div>
                    <KanbanColumnTitle :stepName="'Review'" />
                    <KanbanColumnBody column-id="col3" :columnCards="column3Cards" @drop-column="handleColumnDrop" />
                </div>
                <div>
                    <KanbanColumnTitle :stepName="'For test'" />
                    <KanbanColumnBody column-id="col4" :columnCards="column4Cards" @drop-column="handleColumnDrop" />
                </div>
                <div>
                    <KanbanColumnTitle :stepName="'Testing'" />
                    <KanbanColumnBody column-id="col5" :columnCards="column5Cards" @drop-column="handleColumnDrop" />
                </div>
                <div>
                    <KanbanColumnTitle :stepName="'For Deploy'" />
                    <KanbanColumnBody column-id="col5" :columnCards="column5Cards" @drop-column="handleColumnDrop" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
</script>