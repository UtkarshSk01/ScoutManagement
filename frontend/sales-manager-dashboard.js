document.addEventListener('DOMContentLoaded', function() {
    // Manage Labours
    document.getElementById('manageLaboursBtn').addEventListener('click', function() {
        window.location.href = 'manage-labours.html';  // Redirect to manage labours page
    });

    // Add New Labour
    document.getElementById('addLabourBtn').addEventListener('click', function() {
        window.location.href = 'manage-labours.html';  // Redirect to add new labour page
    });

    // Track In-time/Out-time
    document.getElementById('trackTimeBtn').addEventListener('click', async function() {
        const area = prompt('Enter Area (Noida, Delhi, Greater Noida):');
        try {
            const response = await fetch(`http://localhost:8082/api/labours/area/${area}`);
            const labours = await response.json();
            alert('Labours in ' + area + ': ' + JSON.stringify(labours));
        } catch (error) {
            alert('Error fetching labours');
        }
    });
});
