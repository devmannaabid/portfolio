document.addEventListener('alpine:init', () => {
    Alpine.data('aboutApp', () => ({
        about: null,
        
        async init() {
            try {
                const response = await fetch('data/about.json');
                const data = await response.json();
                
                // Access the first object in the JSON array
                this.about = data[0]; 
            } catch (error) {
                console.error('Failed to load about.json:', error);
            }
        }
    }));
});