// Initialize users array in localStorage if not present
if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([]));
}

// Get users from localStorage
function getUsers() {
    return JSON.parse(localStorage.getItem('users'));
}

// Save a new user
function saveUser(user) {
    const users = getUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
}

// Find a user by email
function findUserByEmail(email) {
    const users = getUsers();
    return users.find(user => user.email === email);
}

// ==== Registration Form Validation ====
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('regEmail').value.trim();
        const password = document.getElementById('regPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const termsChecked = document.getElementById('terms').checked;

        let isValid = true;

        // Reset error messages
        document.getElementById('nameError').style.display = 'none';
        document.getElementById('regEmailError').style.display = 'none';
        document.getElementById('regPasswordError').style.display = 'none';
        document.getElementById('confirmPasswordError').style.display = 'none';

        // Validations
        if (!fullName) {
            document.getElementById('nameError').textContent = 'Full name is required';
            document.getElementById('nameError').style.display = 'block';
            isValid = false;
        }

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            document.getElementById('regEmailError').textContent = 'Please enter a valid email';
            document.getElementById('regEmailError').style.display = 'block';
            isValid = false;
        } else if (findUserByEmail(email)) {
            document.getElementById('regEmailError').textContent = 'Email already registered';
            document.getElementById('regEmailError').style.display = 'block';
            isValid = false;
        }

        if (!password || password.length < 6) {
            document.getElementById('regPasswordError').textContent = 'Password must be at least 6 characters';
            document.getElementById('regPasswordError').style.display = 'block';
            isValid = false;
        }

        if (!confirmPassword || password !== confirmPassword) {
            document.getElementById('confirmPasswordError').textContent = 'Passwords do not match';
            document.getElementById('confirmPasswordError').style.display = 'block';
            isValid = false;
        }

        if (!termsChecked) {
            alert('You must agree to the terms and conditions');
            isValid = false;
        }

        if (isValid) {
            const user = {
                id: Date.now().toString(),
                name: fullName,
                email: email,
                password: password,
                method: 'Email',
                createdAt: new Date().toISOString()
            };

            saveUser(user);
            localStorage.setItem('currentUser', JSON.stringify(user));
            alert('Registration successful! Redirecting to dashboard...');
            window.location.href = 'index.html';
        }
    });
}

// ==== Login Form Validation ====
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        let isValid = true;

        document.getElementById('emailError').style.display = 'none';
        document.getElementById('passwordError').style.display = 'none';

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            document.getElementById('emailError').textContent = 'Please enter a valid email';
            document.getElementById('emailError').style.display = 'block';
            isValid = false;
        }

        if (!password || password.length < 6) {
            document.getElementById('passwordError').textContent = 'Password must be at least 6 characters';
            document.getElementById('passwordError').style.display = 'block';
            isValid = false;
        }

        if (isValid) {
            const user = findUserByEmail(email);

            if (!user) {
                document.getElementById('emailError').textContent = 'Email not registered';
                document.getElementById('emailError').style.display = 'block';
                return;
            }

            if (user.password !== password) {
                document.getElementById('passwordError').textContent = 'Incorrect password';
                document.getElementById('passwordError').style.display = 'block';
                return;
            }

            localStorage.setItem('currentUser', JSON.stringify(user));
            alert('Login successful! Redirecting to dashboard...');
            window.location.href = 'index.html';
        }
    });
}

// ==== Google Dummy Login ====
function loginWithGoogle() {
    const user = {
        id: 'google_' + Date.now(),
        name: 'Google User',
        email: 'googleuser@example.com',
        password: '',
        method: 'Google',
        createdAt: new Date().toISOString()
    };

    if (!findUserByEmail(user.email)) {
        saveUser(user);
    }

    localStorage.setItem('currentUser', JSON.stringify(user));
    alert('Logged in with Google!');
    window.location.href = 'index.html';
}

// ==== Facebook Dummy Login ====
function loginWithFacebook() {
    const user = {
        id: 'facebook_' + Date.now(),
        name: 'Facebook User',
        email: 'facebookuser@example.com',
        password: '',
        method: 'Facebook',
        createdAt: new Date().toISOString()
    };

    if (!findUserByEmail(user.email)) {
        saveUser(user);
    }

    localStorage.setItem('currentUser', JSON.stringify(user));
    alert('Logged in with Facebook!');
    window.location.href = 'index.html';
}

// ==== Check if user is logged in on load ====
function checkAuth() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
        const currentPage = window.location.pathname;
        if (!currentPage.includes('login.html') && !currentPage.includes('signup.html')) {
            window.location.href = 'login.html';
        }
    } else {
        updateAuthUI(user);
    }
}

// ==== Update Auth UI ====
function updateAuthUI(user) {
    const authButtons = document.querySelector('.auth-buttons');
    if (authButtons && user) {
        authButtons.innerHTML = `
            <div class="user-dropdown">
                <button class="user-profile">
                    <img src="images/user-icon.png" alt="${user.name}">
                    <span>${user.name}</span>
                </button>
                <div class="dropdown-menu">
                    <a href="#">My Profile</a>
                    <a href="#">My Courses</a>
                    <a href="#" id="logoutBtn">Logout</a>
                </div>
            </div>
        `;

        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', logout);
        }
    }
}

// ==== Logout ====
function logout() {
    localStorage.removeItem('currentUser');
    alert('You have been logged out.');
    window.location.href = 'login.html';
}

// ==== Run on page load ====
document.addEventListener('DOMContentLoaded', checkAuth);