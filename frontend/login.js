document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get username and password from the form inputs
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Validate inputs (simple check)
    if (username.trim() === "" || password.trim() === "") {
        alert("Please enter both username and password");
        return;
    }

    // Prepare the login data
    const loginData = new URLSearchParams();
    loginData.append('username', username);
    loginData.append('password', password);

    // Call the backend API to authenticate the user
    fetch('http://localhost:8082/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: loginData
    })
    .then(response => response.text())
    .then(data => {
        // Example response: "Login successful. Redirecting to: admin-dashboard.html"
        if (data.includes("Redirecting to:")) {
            const role = data.split("Redirecting to: ")[1].split('-dashboard.html')[0].trim();
            // Redirect based on role using hardcoded links
            window.location.href = getRedirectUrlBasedOnRole(role);
        } else {
            alert('Invalid username or password. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error during login:', error);
        alert('An error occurred. Please try again later.');
    });
});

// Function to get the appropriate dashboard URL based on the role
function getRedirectUrlBasedOnRole(role) {
    switch (role.toLowerCase()) {
        case 'admin':
            return 'admin-dashboard.html';
        case 'sales_manager':
            return 'sales-manager-dashboard.html';
        case 'labour':
            return 'labour-dashboard.html';
        case 'hr':
            return 'hr-dashboard.html';
        default:
            return 'index.html'; // Default redirect if role not found
    }
}