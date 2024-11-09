document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    
    // Handle form submission
    registerForm.addEventListener('submit', async function(event) {
        event.preventDefault();  // Prevent form from refreshing the page
        
        const username = document.querySelector('input[name="username"]').value;
        const password = document.querySelector('input[name="password"]').value;
        const confirmPassword = document.querySelector('input[name="confirmPassword"]').value;
        const role = document.querySelector('select[name="role"]').value;
        
        // Check if the selected role is Admin or HR
        if (role === 'Admin' || role === 'HR') {
            alert('Registration for Admin and HR roles is not permitted.');
            return;  // Stop further processing
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        // Prepare data to be sent to the backend
        const userData = {
            username: username,
            password: password,
            role: role
        };

        try {
            // Register user based on role
            let registerUrl;
            switch (role) {
                case 'Sales Manager':
                    registerUrl = 'http://localhost:8082/api/admin/salesmanagers';
                    break;
                case 'Employee':  // Employee and Labour are treated the same
                    registerUrl = 'http://localhost:8082/api/salesmanager/labours';  // This is the endpoint for Labour/Employee
                    break;
                default:
                    alert('Unknown role!');
                    return;
            }

            const response = await fetch(registerUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                const data = await response.json();
                alert('Registration successful! Redirecting to your dashboard.');
                
                // Log in and redirect to the appropriate dashboard
                const loginResponse = await fetch('http://localhost:8082/api/auth/login?username=' + username + '&password=' + password, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });

                if (loginResponse.ok) {
                    const loginData = await loginResponse.json();
                    // Redirect based on user role
                    window.location.href = loginData.redirectUrl;  // Assuming backend sends the redirect URL
                } else {
                    alert('Login failed: ' + await loginResponse.text());
                }

            } else {
                const errorData = await response.json();
                alert('Registration failed: ' + errorData.message);
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    });
});
