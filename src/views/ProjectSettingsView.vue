<template>
    <div class="flex justify-start gap-12 m-8">
        <div class="flex flex-col">
            <form class="space-y-4">
                <h4>Dados do projeto</h4>
                <div class="w-full">
                    <label class="sr-only" for="code">Code</label>
                    <input disabled class="input input-solid max-w-full" :placeholder="projectInfo.code" type="text"
                        id="code" />
                </div>

                <div class="w-full">
                    <label class="sr-only" for="name">Name</label>
                    <input class="input input-solid max-w-full" v-model="projectInfo.name"
                        :placeholder="projectInfo.name" type="text" id="name" />
                </div>

                <div class="w-full">
                    <label class="sr-only" for="name">Niche</label>
                    <input class="input input-solid max-w-full" v-model="projectInfo.niche"
                        :placeholder="projectInfo.niche" type="text" id="niche" />
                </div>


                <div class="w-full">
                    <label class="sr-only" for="message">Descrição</label>

                    <textarea class="textarea textarea-solid max-w-full" v-model="projectInfo.niche"
                        :placeholder="projectInfo.niche" rows="8" id="message"></textarea>
                </div>


            </form>
        </div>

        <div class="flex flex-col w-80">
            <KanbanColumnsTable @has-columns="checkColumns" />
        </div>
        <div class="flex flex-col w-80">
            <ProjectUsersTable />
        </div>

        <div v-if="enabledLLMTaskCreation" class="flex flex-col w-80">
            <h4 class="mb-2">Tarefas do projeto</h4>
            <button class="btn btn-primary">
                Criar Massivamente
            </button>

        </div>

    </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import KanbanColumnsTable from '../components/shared/KanbanColumnsTable.vue';
import ProjectUsersTable from '../components/shared/ProjectUsersTable.vue';
import { useRoute } from 'vue-router';
import { api } from '../services/api';

const route = useRoute();

const projectId = computed(() => route.params.projectId);

const enabledLLMTaskCreation = ref(false);

const checkColumns = (hasColumns: boolean) => {
    enabledLLMTaskCreation.value = hasColumns;
};

const projectInfo = ref({
    code: '',
    name: '',
    niche: '',
    description: ''
});

const getProjectInfo = async () => {
    const response = await api.get(`/projects/${projectId.value}`);
    projectInfo.value = response.data;
};

onMounted(async () => {
    await getProjectInfo();
});


</script>