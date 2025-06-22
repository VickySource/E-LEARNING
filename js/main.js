
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
