<template>
    <div>
        <label for="modal-1" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
        <div class="p-8">
            <h4 class="text-white font-bold text-xl mb-6">Criação de novo projeto</h4>
            <form class="space-y-4">
                <div class="w-full">
                    <label class="sr-only" for="name">Nome do projeto</label>
                    <input class="input input-solid max-w-full" placeholder="Nome do projeto" type="text" id="name"
                        v-model="newProjectName" />
                </div>
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <input class="input input-solid" placeholder="Nicho do projeto" type="text"
                            v-model="newProjectNiche" />
                    </div>
                    <div>
                        <input class="input input-solid" placeholder="Código do projeto" type="text"
                            v-model="newProjectCode" />
                    </div>
                </div>
                <div class="w-full">
                    <textarea class="textarea textarea-solid max-w-full" placeholder="Descrição do projeto" rows="8"
                        id="message" v-model="newProjectDescription"></textarea>
                </div>
                <div class="mt-4">
                    <button @click="createNewProject()" type="button" class="rounded-lg btn btn-primary btn-block">Criar
                        projeto</button>
                </div>
            </form>
        </div>
        <div v-if="showError">
            <ErrorAlertCard />
        </div>
        <div v-if="showSuccess">
            <SuccessAlertCard />
        </div>
    </div>

</template>
<script setup lang="ts">
import { ref } from 'vue';
import { api } from '../../services/api';

import ErrorAlertCard from '../ErrorAlertCard.vue';
import SuccessAlertCard from '../SuccessAlertCard.vue';

const emit = defineEmits(['projectCreated']);

const isBusy = ref(false);
const showSuccess = ref(false);
const showError = ref(false);

const newProjectName = ref('');
const newProjectNiche = ref('');
const newProjectCode = ref('');
const newProjectDescription = ref('');


const createNewProject = async () => {
    try {
        isBusy.value = true;

        const newProjectData = {
            name: newProjectName.value,
            niche: newProjectNiche.value,
            code: newProjectCode.value,
            description: newProjectDescription.value,
            ownerId: 1 // Assuming a static owner ID for now
        };

        await api.post('/projects', { ...newProjectData });

        showSuccess.value = true;
        showError.value = false;

        newProjectName.value = '';
        newProjectNiche.value = '';
        newProjectCode.value = '';
        newProjectDescription.value = '';

        setTimeout(() => {
            showSuccess.value = false;
            emit('projectCreated');
        }, 2000);

    } catch (error) {
        showError.value = true;
        showSuccess.value = false;
        console.error("Erro ao criar novo projeto:", error);
    } finally {
        isBusy.value = false;
    }
};

</script>