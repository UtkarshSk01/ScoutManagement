document.addEventListener("DOMContentLoaded", function () {
    loadAttendanceRecords();

    // Load attendance records
    function loadAttendanceRecords() {
        fetch("http://localhost:8082/hr/attendance")
            .then(response => response.json())
            .then(data => {
                const tableBody = document.querySelector("#attendanceTable tbody");
                tableBody.innerHTML = "";
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
            .catch(error => console.error("Error loading attendance records:", error));
    }

    // Salary calculation form submission
    document.getElementById("salaryForm").addEventListener("submit", function (e) {
        e.preventDefault();
        const employeeId = document.getElementById("employeeId").value;
        const month = document.getElementById("month").value;

        fetch(`http://localhost:8082/hr/salary/calculate?employeeId=${employeeId}&month=${month}`)
            .then(response => response.json())
            .then(data => {
                const salaryResultDiv = document.getElementById("salaryResult");
                salaryResultDiv.innerHTML = `
                    <h3>Salary Details</h3>
                    <p>Employee ID: ${data.employeeId}</p>
                    <p>Month: ${data.month}</p>
                    <p>Total Salary: $${data.totalSalary}</p>
                `;
            })
            .catch(error => console.error("Error calculating salary:", error));
    });
});
