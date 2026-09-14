document.addEventListener('alpine:init', () => {
    Alpine.data('skillsApp', () => ({
        skills: [],
        
        async init() {
            try {
                const response = await fetch('data/skill.json');
                this.skills = await response.json();
            } catch (error) {
                console.error('Failed to load skills.json:', error);
            }
        }
    }));
});