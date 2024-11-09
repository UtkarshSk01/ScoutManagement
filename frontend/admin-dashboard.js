// Function to fetch and display locations of Sales Managers and Labours
function viewLocations() {
    const token = localStorage.getItem('token'); // Assume JWT token is stored in localStorage

    if (!token) {
        alert('You are not authenticated. Please log in again.');
        window.location.href = 'index.html'; // Redirect to login page
        return;
    }

    // Fetch the locations of Sales Managers and Labours
    fetch('http://localhost:8082/api/admin/locations', { // Updated API URL
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token // Include the JWT token
        }
    })
    .then(response => {
        if (response.status === 401) {
            alert('Unauthorized access. Please log in again.');
            window.location.href = 'index.html'; // Redirect to login page
            return;
        }
        return response.json();
    })
    .then(data => {
        if (!data || !data.locations || data.locations.length === 0) {
            alert('No location data available.');
            return;
        }

        // Display locations in a table
        displayLocationsTable(data.locations);
    })
    .catch(error => {
        console.error('Error fetching locations:', error);
        alert('An error occurred while fetching locations.');
    });
}

// Function to display locations in a table format
function displayLocationsTable(locations) {
    // Create a table element
    const tableHtml = `
        <table id="locationsTable" class="locations-table">
            <thead>
                <tr>
                    <th>Type</th>
                    <th>Name</th>
                    <th>Area</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                </tr>
            </thead>
            <tbody>
                ${locations.map(location => `
                    <tr>
                        <td>${location.type}</td>
                        <td>${location.name}</td>
                        <td>${location.area || 'N/A'}</td>
                        <td>${location.latitude || 'N/A'}</td>
                        <td>${location.longitude || 'N/A'}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    // Create a modal or a section to display the table
    const modalContainer = document.createElement('div');
    modalContainer.className = 'modal-container';
    modalContainer.innerHTML = `
        <div class="modal-content">
            <span class="close-btn" onclick="closeModal()">×</span>
            <h2>Sales Managers & Labours Locations</h2>
            ${tableHtml}
        </div>
    `;
    document.body.appendChild(modalContainer);
}

// Function to close the modal
function closeModal() {
    const modalContainer = document.querySelector('.modal-container');
    if (modalContainer) {
        document.body.removeChild(modalContainer);
    }
}
