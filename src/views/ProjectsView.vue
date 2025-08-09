<template>
    <div class="m-5">
        <div class="text-2xl font-bold flex justify-between mb-5">
            <p>Projetos</p>
            <span class="tooltip tooltip-left text-white" data-tooltip="Adicionar projeto."><button>+</button></span>
        </div>
        <div class="mt-2 grid grid-cols-3 gap-4">

            <div v-for="project in projects" :key="project.id">
                <ProjectCard :project="project" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { api } from '../services/api';
import ProjectCard from '../components/ProjectCard.vue';
import type { AxiosResponse } from 'axios';


interface Project {
    id: number;
    code: string;
    name: string;
    niche: string;
    description: string;
    ownerId: number;
    createdAt: string;
    updatedAt: string;
}

const projects = ref<Project[]>([]);

const getProjects = async () => {
    const apiResponse: AxiosResponse<Project[]> = await api.get("/projects");
    projects.value = apiResponse.data;
};

onMounted(async () => {
    await getProjects();
});


</script>