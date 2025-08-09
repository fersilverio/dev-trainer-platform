<template>
    <div v-if="isBusy" class="mt-60">
        <svg class="spinner-ring flex justify-content-center m-auto" viewBox="25 25 50 50" stroke-width="5">
            <circle cx="50" cy="50" r="20" />
        </svg>
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
                    <NewProjectCreationModal />
                </div>
            </div>
        </div>




    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { api } from '../services/api';
import ProjectCard from '../components/ProjectCard.vue';
import type { AxiosResponse } from 'axios';
import NewProjectCreationModal from '../components/NewProjectCreationModal.vue';


interface Project {
    id: number;
    code: string;
    name: string;
    niche: string;
    description: string;
    owner: {
        id: number;
        name: string;
    };
    createdAt: string;
    updatedAt: string;
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