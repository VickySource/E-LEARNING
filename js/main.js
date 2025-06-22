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
document.addEventListener("DOMContentLoaded", function () {
    const userData = JSON.parse(localStorage.getItem('loggedInUser'));
    const loginLink = document.getElementById("login-link");
    const userDisplay = document.getElementById("user-name-display");

    if (userData && userData.username) {
        // Hide login icon and show user name with logout
        if (loginLink) loginLink.style.display = "none";
        if (userDisplay) {
            userDisplay.innerHTML = `
                <span class="nav-item nav-link">Hi, ${userData.username}</span>
                <a href="#" class="nav-item nav-link" id="logoutBtn">Logout</a>
            `;
        }

        const logoutBtn = document.getElementById("logoutBtn");
        if (logoutBtn) {
            logoutBtn.addEventListener("click", function () {
                localStorage.removeItem("loggedInUser");
                window.location.href = "index.html";
            });
        }
    }
});

//  Contact form safe handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);

        fetch(form.action, {
            method: form.method,
            body: formData
        })
        .then(response => {
            if (response.ok) {
                alert("Your message has been sent successfully. We'll respond shortly!");
                form.reset();
            } else {
                return response.text().then(text => { throw new Error(text); });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("There was a problem sending your message.");
        });
    });
}

// ✅ Signup form handler
const signupForm = document.getElementById('registerForm');
if (signupForm) {
    signupForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const username = document.getElementById('registerUsername').value.trim();
        const email = document.getElementById('registerEmail').value.trim();
        const password = document.getElementById('registerPassword').value;
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{6,}$/;
        if (!passwordRegex.test(password)) {
            alert("Password must contain at least 1 capital letter, 1 special character, and 1 number.");
            return;
        }
        localStorage.setItem('user', JSON.stringify({ username, email, password }));
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = 'courses.html';
    });
}

// ✅ Login form handler
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.email === email && user.password === password) {
            alert('Login successful!');
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = 'courses.html';
        } else {
            alert('Invalid email or password!');
        }
    });
}

// ✅ Logout button and navbar visibility
document.addEventListener('DOMContentLoaded', function () {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const logoutBtn = document.getElementById('logoutBtn');
    const loginLink = document.getElementById('loginLink');

    if (isLoggedIn) {
        if (logoutBtn) logoutBtn.style.display = 'inline-block';
        if (loginLink) loginLink.style.display = 'none';
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('isLoggedIn');
            window.location.href = 'index.html';
        });
    }
});

// Signup logic
document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signup-form");
    if (signupForm) {
        signupForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const username = document.getElementById("signup-username").value;
            const password = document.getElementById("signup-password").value;
            if (username && password) {
                localStorage.setItem("user", JSON.stringify({ username, password }));
                alert("Signup successful!");
                window.location.href = "login.html";
            }
        });
    }

    // Login logic
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const username = document.getElementById("login-username").value;
            const password = document.getElementById("login-password").value;
            const user = JSON.parse(localStorage.getItem("user"));
            if (user && user.username === username && user.password === password) {
                localStorage.setItem("loggedInUser", username);
                alert("Login successful!");
                window.location.href = "profile.html";
            } else {
                alert("Invalid credentials!");
            }
        });
    }

    // Profile logic
    const usernameDisplay = document.getElementById("username-display");
    if (usernameDisplay) {
        const loggedInUser = localStorage.getItem("loggedInUser");
        if (loggedInUser) {
            usernameDisplay.textContent = loggedInUser;
        } else {
            window.location.href = "login.html"; // redirect to login if not logged in
        }
    }
});


// YouTube Modal Logic
document.addEventListener("DOMContentLoaded", () => {
    const videoButtons = document.querySelectorAll(".open-video");
    const youtubeFrame = document.getElementById("youtubeFrame");

    videoButtons.forEach(button => {
        button.addEventListener("click", () => {
            const videoUrl = button.getAttribute("data-video-url");
            if (youtubeFrame) {
                youtubeFrame.src = videoUrl;
            }
        });
    });
});

function stopVideo() {
    const youtubeFrame = document.getElementById("youtubeFrame");
    if (youtubeFrame) {
        youtubeFrame.src = "";
    }
}
