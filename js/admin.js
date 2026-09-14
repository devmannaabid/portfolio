document.addEventListener('alpine:init', () => {
    Alpine.data('adminDashboard', () => ({
        currentTab: 'projects',
        skills: [],
        services: [],
        projects: [],

        // Form Object with ID field
        newProject: {
            id: null,
            title: '',
            image: '',
            description: ''
        },

        async init() {
            try {
                const [skillsRes, servicesRes, projectsRes] = await Promise.all([
                    fetch('data/skills.json'),
                    fetch('data/services.json'),
                    fetch('data/projects.json')
                ]);

                this.skills = await skillsRes.json();
                this.services = await servicesRes.json();
                this.projects = await projectsRes.json();
            } catch (error) {
                console.error('Error loading JSON data for Admin:', error);
            }
        },

        // Add New Project Logic with Manual/Auto ID logic
        addProject() {
            let finalId;

            // Check if user entered a custom ID
            if (this.newProject.id && !isNaN(this.newProject.id)) {
                // Prevent duplicate ID entry
                const exists = this.projects.some(p => p.id === Number(this.newProject.id));
                if (exists) {
                    alert('Project ID ' + this.newProject.id + ' already exists! Please use a unique ID.');
                    return;
                }
                finalId = Number(this.newProject.id);
            } else {
                // Auto-generate ID if empty
                finalId = this.projects.length > 0 ? Math.max(...this.projects.map(p => p.id)) + 1 : 1;
            }

            // Push item to state array
            this.projects.push({
                id: finalId,
                title: this.newProject.title,
                image: this.newProject.image,
                description: this.newProject.description
            });

            // Reset Form Fields
            this.newProject.id = null;
            this.newProject.title = '';
            this.newProject.image = '';
            this.newProject.description = '';
        },

        deleteItem(type, idOrIndex) {
            if (confirm('Are you sure you want to delete this item?')) {
                if (type === 'projects') {
                    this.projects = this.projects.filter(item => item.id !== idOrIndex);
                }
            }
        },

        copyJson() {
            const jsonText = JSON.stringify(this.projects, null, 4);
            navigator.clipboard.writeText(jsonText).then(() => {
                alert('JSON copied to clipboard!');
            });
        }
    }));
});