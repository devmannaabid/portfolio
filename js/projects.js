document.addEventListener('alpine:init', () => {
    Alpine.data('projectsApp', () => ({
        projects: [],

        async init() {
            try {
                const response = await fetch('data/projects.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                this.projects = await response.json();
            } catch (error) {
                console.error('Failed to load projects.json:', error);
            }
        }
    }));
});