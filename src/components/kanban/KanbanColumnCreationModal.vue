<template>
    <div>
        <label for="modal-1" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
        <div class="p-8">
            <h4 class="text-white font-bold text-xl mb-6">Criação de nova coluna</h4>
            <form class="space-y-4">
                <div class="w-full">
                    <label class="sr-only" for="name">Nome</label>
                    <input class="input input-solid max-w-full" placeholder="Nome" type="text" id="name" />
                </div>


                <div class="mt-4">
                    <button type="button" class="rounded-lg btn btn-primary btn-blockd text-base w-full">Criar</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script setup lang="ts"></script>