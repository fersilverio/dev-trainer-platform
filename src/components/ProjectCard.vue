<template>
    <div class="bg-slate-800 p-5 rounded-md min-h-50">
        <div class="flex justify-between items-center">
            <p class="text-white text-xl font-bold">{{ projectKardFullTitle }}</p>
            <span class="tooltip tooltip-left text-white" :data-tooltip="`Criado por: ${props.project.ownerId}`">
                <label class="btn btn-ghost flex cursor-pointer m-1 px-0 avatar avatar-ring avatar-sm" tabindex="0">
                    <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="avatar" />
                </label>
            </span>
        </div>
        <p class="text-sm">{{ props.project.description ?? "Projeto sem descrição" }}</p>
        <div class="text-xs text-gray-400 mt-2">
            <p class="mb-2">{{ props.project.niche ?? "Sem nicho" }}</p>
            <p><b>Criado em</b> {{ new Date(props.project.createdAt).toLocaleDateString() }}</p>
        </div>
        <div class="flex justify-between gap-4 mt-2">
            <div class="flex-col">
                <div class="flex justify-start items-center gap-4">
                    <span>
                        <div class="text-xl font-bold">
                            23
                        </div>
                        <div class="text-xs">
                            Tarefas
                        </div>
                    </span>
                    <span>
                        <div class="text-xl font-bold">
                            23
                        </div>
                        <div class="text-xs">
                            Realizadas
                        </div>
                    </span>
                </div>
            </div>
            <div class="flex-col">
                <span class="text-3xl font-bold">100%</span>
            </div>
        </div>

    </div>
</template>
<script setup lang="ts">
const props = defineProps<{
    project: {
        id: number;
        code: string;
        name: string;
        niche: string;
        description: string;
        ownerId: number;
        createdAt: string;
        updatedAt: string;
    }
}>();

const projectKardFullTitle = `[${props.project.code}]  ${props.project.name}`;

</script>