<template>
    <div v-if="isBusy" class="mt-60">
        <LoadingSpinner />
    </div>
    <div v-else>
        <div class="m-5">
            <div class="text-2xl font-bold flex justify-between mb-5">
                <p>Projetos</p>
                <label for="modal-1">
                    <span class="tooltip tooltip-left text-white" data-tooltip="Adicionar projeto">
                        +
                    </span>
                </label>
            </div>
            <div class="mt-2 grid grid-cols-3 gap-4">
                <div v-for="project in projects" :key="project.id">
                    <ProjectCard :project="project" />
                </div>
            </div>
        </div>



        <!-- Project Creation Modal Area -->
        <div>
            <input class="modal-state" id="modal-1" type="checkbox" />
            <div class="modal">
                <label class="modal-overlay" for="modal-1"></label>
                <div class="modal-content flex flex-col gap-5">
                    <NewProjectCreationModal @project-created="getProjects()" />
                </div>
            </div>
        </div>

    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { api } from '../services/api';
import ProjectCard from '../components/project/ProjectCard.vue';
import NewProjectCreationModal from '../components/project/NewProjectCreationModal.vue';

import type { AxiosResponse } from 'axios';
import LoadingSpinner from '../components/shared/LoadingSpinner.vue';

interface Project {
    id: number;
    code: string;
    name: string;
    niche: string;
    description: string;
    owner: {
        name: string;
    };
    createdAt: string;
    updatedAt: string;
    projectTasksInfo: {
        numberOfTasks: number;
        numberOfFinishedTasks: number;
    };
}

const projects = ref<Project[]>([]);

const isBusy = ref(false);

const getProjects = async () => {
    try {
        isBusy.value = true;
        const apiResponse: AxiosResponse<Project[]> = await api.get("/projects");
        projects.value = apiResponse.data;
    } catch (error) {
        console.error("Erro ao buscar projetos:", error);
    } finally {
        isBusy.value = false;
    }
};

onMounted(async () => {
    await getProjects();
});


</script>