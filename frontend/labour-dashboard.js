document.addEventListener("DOMContentLoaded", function () {
    loadAttendanceRecords();

    // Load attendance records
    function loadAttendanceRecords() {
        const token = localStorage.getItem('token'); // Get token from localStorage
        if (!token) {
            alert('You are not authenticated. Please log in.');
            window.location.href = 'login.html'; // Redirect to login if not authenticated
            return;
        }

        fetch("http://localhost:8082/api/hr/attendance", {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector("#attendanceTable tbody");
            tableBody.innerHTML = "";
            if (data.length === 0) {
                tableBody.innerHTML = `<tr><td colspan="6">No attendance records found.</td></tr>`;
                return;
            }
            data.forEach(record => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${record.employeeId}</td>
                    <td>${record.employeeName}</td>
                    <td>${record.date}</td>
                    <td>${record.inTime}</td>
                    <td>${record.outTime}</td>
                    <td>${record.status}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error("Error loading attendance records:", error);
            alert("Error loading attendance records.");
        });
    }

    // Salary calculation form submission
    document.getElementById("salaryForm").addEventListener("submit", function (e) {
        e.preventDefault();
        const employeeId = document.getElementById("employeeId").value;
        const month = document.getElementById("month").value;

        const token = localStorage.getItem('token'); // JWT token for secure request
        if (!token) {
            alert('You are not authenticated. Please log in.');
            window.location.href = 'login.html'; // Redirect to login if not authenticated
            return;
        }

        const salaryResultDiv = document.getElementById("salaryResult");
        salaryResultDiv.innerHTML = "<p>Calculating salary...</p>"; // Show loading message

        fetch(`http://localhost:8082/api/hr/salary/calculate?employeeId=${employeeId}&month=${month}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })
        .then(response => response.json())
        .then(data => {
            if (!data) {
                salaryResultDiv.innerHTML = "<p>No salary data found for the specified employee and month.</p>";
                return;
            }
            salaryResultDiv.innerHTML = `
                <h3>Salary Details</h3>
                <p>Employee ID: ${data.employeeId}</p>
                <p>Month: ${data.month}</p>
                <p>Total Salary: $${data.totalSalary}</p>
            `;
        })
        .catch(error => {
            console.error("Error calculating salary:", error);
            salaryResultDiv.innerHTML = "<p>Error calculating salary. Please try again.</p>";
        });
    });
});
