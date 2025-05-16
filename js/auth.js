// Mock authentication service
class AuthService {
    static async login(email, password) {
        // In a real app, this would call your backend
        return new Promise((resolve) => {
            setTimeout(() => {
                if (email && password) {
                    resolve({
                        success: true,
                        user: {
                            id: 1,
                            email,
                            name: 'Demo User',
                            balance: 1000.00
                        }
                    });
                } else {
                    resolve({
                        success: false,
                        message: 'Invalid credentials'
                    });
                }
            }, 1000);
        });
    }
    
    static async register(email, password, name) {
        // In a real app, this would call your backend
        return new Promise((resolve) => {
            setTimeout(() => {
                if (email && password && name) {
                    resolve({
                        success: true,
                        user: {
                            id: 2,
                            email,
                            name,
                            balance: 0.00
                        }
                    });
                } else {
                    resolve({
                        success: false,
                        message: 'Missing required fields'
                    });
                }
            }, 1000);
        });
    }
}

// Login form handler
document.getElementById('login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    const loginBtn = e.target.querySelector('button[type="submit"]');
    loginBtn.disabled = true;
    loginBtn.textContent = 'Logging in...';
    
    const result = await AuthService.login(email, password);
    
    if (result.success) {
        alert(`Welcome back, ${result.user.name}!`);
        document.getElementById('login-modal').style.display = 'none';
        // Update UI with logged in state
        document.getElementById('login-btn').innerHTML = `<i class="fas fa-user"></i> ${result.user.name}`;
        document.querySelector('.balance span').textContent = result.user.balance.toFixed(2);
    } else {
        alert(result.message || 'Login failed');
    }
    
    loginBtn.disabled = false;
    loginBtn.textContent = 'Login';
});