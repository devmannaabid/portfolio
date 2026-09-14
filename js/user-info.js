document.addEventListener('alpine:init', () => {
    Alpine.data('userInfoApp', () => ({
        userinfo: null,
        
        async init() {
            try {
                const response = await fetch('data/user-info.json');
                const data = await response.json();
                
                // Takes the single object from your JSON array
                this.userinfo = data[0]; 
            } catch (error) {
                console.error('Failed to fetch user info:', error);
            }
        }
    }));
});