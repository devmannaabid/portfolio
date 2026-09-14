document.addEventListener('alpine:init', () => {
    Alpine.data('servicesApp', () => ({
        services: [],
        
        async init() {
            try {
                const response = await fetch('data/services.json');
                this.services = await response.json();
            } catch (error) {
                console.error('Failed to load services.json:', error);
            }
        }
    }));
});