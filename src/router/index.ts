import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import KanbanView from "../views/KanbanView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/kanban/:projectId',
            name: 'kanban',
            component: KanbanView,
        },
        {
            path: '/projects',
            name: 'projects',
            component: () => import('../views/ProjectsView.vue'),
        }

    ],
});

export default router;