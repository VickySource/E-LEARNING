(function ($) {
    "use strict";

    // Spinner  
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();

    // Initiate the wowjs  
    new WOW().init();

    // Sticky Navbar  
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').css('top', '0px');
        } else {
            $('.sticky-top').css('top', '-100px');
        }
    });

    // Dropdown on mouse hover  
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";

    $(window).on("load resize", function () {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
                function () {
                    const $this = $(this);
                    $this.addClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "true");
                    $this.find($dropdownMenu).addClass(showClass);
                },
                function () {
                    const $this = $(this);
                    $this.removeClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "false");
                    $this.find($dropdownMenu).removeClass(showClass);
                }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });

    // Back to top button  
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });

    // Header carousel  
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });

    // Testimonials carousel  
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav: false,
        responsive: {
            0: { items: 1 },
            768: { items: 2 },
            992: { items: 3 }
        }
    });

})(jQuery);

console.log("Auth.js loaded successfully");

// Initialize users array in localStorage if not present
if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([]));
    console.log("Users array initialized in localStorage");
}

// Get users from localStorage
function getUsers() {
    const users = JSON.parse(localStorage.getItem('users'));
    console.log("Retrieved users from localStorage:", users);
    return users;
}

// Save a new user
function saveUser(user) {
    const users = getUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    console.log("User saved to localStorage:", user);
}

// Find a user by email
function findUserByEmail(email) {
    const users = getUsers();
    const user = users.find(user => user.email === email);
    console.log("Finding user by email", email, ":", user);
    return user;
}

// ==== Registration Form Validation ====
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    console.log("Register form found, adding event listener");
    registerForm.addEventListener('submit', function (e) {
        e.preventDefault();
        console.log("Register form submitted");

        const username = document.getElementById('registerUsername').value.trim();
        const email = document.getElementById('registerEmail').value.trim();
        const password = document.getElementById('registerPassword').value;

        console.log("Registration data:", { username, email, password: "***" });

        let isValid = true;

        // Validations
        if (!username) {
            alert('Username is required');
            isValid = false;
        }

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Please enter a valid email');
            isValid = false;
        } else if (findUserByEmail(email)) {
            alert('Email already registered');
            isValid = false;
        }

        if (!password || password.length < 6) {
            alert('Password must be at least 6 characters');
            isValid = false;
        }

        if (isValid) {
            const user = {
                id: Date.now().toString(),
                username: username,
                email: email,
                password: password,
                createdAt: new Date().toISOString()
            };

            saveUser(user);
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            localStorage.setItem('isLoggedIn', 'true');
            console.log("User registered and logged in:", user);
            
            alert('Registration successful! Redirecting to profile...');
            window.location.href = 'profile.html';
        }
    });
}

// ==== Login Form Validation ====
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    console.log("Login form found, adding event listener");
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        console.log("Login form submitted");

        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;

        console.log("Login attempt:", { email, password: "***" });

        let isValid = true;

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Please enter a valid email');
            isValid = false;
        }

        if (!password) {
            alert('Password is required');
            isValid = false;
        }

        if (isValid) {
            const user = findUserByEmail(email);

            if (!user) {
                alert('Email not registered. Please sign up first.');
                return;
            }

            if (user.password !== password) {
                alert('Incorrect password');
                return;
            }

            localStorage.setItem('loggedInUser', JSON.stringify(user));
            localStorage.setItem('isLoggedIn', 'true');
            console.log("User logged in successfully:", user);
            
            alert('Login successful! Redirecting to profile...');
            window.location.href = 'profile.html';
        }
    });
}

// ==== Check Authentication Status ====
function checkAuthStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    
    console.log("Checking auth status:", { isLoggedIn, loggedInUser });
    
    const loginLink = document.getElementById('login-link');
    const userDisplay = document.getElementById('user-name-display');
    
    if (isLoggedIn === 'true' && loggedInUser && loggedInUser.username) {
        console.log("User is logged in, updating navbar");
        // User is logged in - show username and logout
        if (loginLink) loginLink.style.display = 'none';
        if (userDisplay) {
            userDisplay.innerHTML = `
                <span class="nav-item nav-link text-primary">Hi, ${loggedInUser.username}</span>
                <a href="#" class="nav-item nav-link" id="logoutBtn">Logout</a>
            `;
            
            // Add logout functionality
            const logoutBtn = document.getElementById('logoutBtn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    logout();
                });
            }
        }
    } else {
        console.log("User is not logged in, showing login link");
        // User is not logged in - show login link
        if (loginLink) loginLink.style.display = 'block';
        if (userDisplay) userDisplay.innerHTML = '';
    }
}

// ==== Logout Function ====
function logout() {
    console.log("Logging out user");
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('isLoggedIn');
    alert('You have been logged out.');
    window.location.href = 'index.html';
}

// ==== Check if user should access protected pages ====
function checkProtectedPages() {
    const currentPage = window.location.pathname;
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    console.log("Checking protected pages:", { currentPage, isLoggedIn });
    
    // List of pages that require authentication
    const protectedPages = ['/profile.html', 'profile.html'];
    
    const isProtectedPage = protectedPages.some(page => currentPage.includes(page));
    
    if (isProtectedPage && isLoggedIn !== 'true') {
        console.log("Redirecting to login - protected page accessed without auth");
        alert('Please log in to access this page.');
        window.location.href = 'login.html';
        return false;
    }
    
    return true;
}

// ==== Initialize on page load ====
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded, initializing auth system");
    checkProtectedPages();
    checkAuthStatus();
});
