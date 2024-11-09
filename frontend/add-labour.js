document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('addLabourForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const labourData = {
            name: document.getElementById('labourName').value,
            salesManagerId: document.getElementById('salesManagerId').value,
            area: document.getElementById('area').value,
            inTime: document.getElementById('inTime').value,
            outTime: document.getElementById('outTime').value
        };

        fetch('http://localhost:8082/api/labours/add', {
            method: 'POST',
            body: JSON.stringify(labourData),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => {
            alert('Labour added successfully!');
            window.location.href = 'sales-manager-dashboard.html';
        })
        .catch(error => {
            console.error('Error adding labour:', error);
        });
    });
});
