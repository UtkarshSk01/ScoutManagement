document.addEventListener("DOMContentLoaded", function () {
    loadLabours();

    // Load existing labours assigned to the Sales Manager
    function loadLabours() {
        const token = localStorage.getItem('token'); // JWT Token for authorization

        if (!token) {
            alert('You are not authenticated. Please log in.');
            window.location.href = 'login.html';
            return;
        }

        fetch("http://localhost:8082/api/sales-manager/labours", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector("#laboursTable tbody");
            tableBody.innerHTML = "";

            if (data.length === 0) {
                tableBody.innerHTML = `<tr><td colspan="5">No labours assigned.</td></tr>`;
                return;
            }

            data.forEach(labour => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${labour.id}</td>
                    <td>${labour.name}</td>
                    <td>${labour.inTime || 'N/A'}</td>
                    <td>${labour.outTime || 'N/A'}</td>
                    <td>
                        <button onclick="editLabour(${labour.id})">Edit</button>
                        <button onclick="deleteLabour(${labour.id})">Delete</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error("Error loading labours:", error));
    }

    // Add new labour
    document.getElementById("addLabourForm").addEventListener("submit", function (e) {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const name = e.target.name.value.trim();
        const inTime = e.target.inTime.value;
        const outTime = e.target.outTime.value;

        if (!name || !inTime || !outTime) {
            alert("Please fill in all fields.");
            return;
        }

        const labourData = {
            name,
            inTime,
            outTime
        };

        fetch("http://localhost:8082/api/sales-manager/labours", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(labourData)
        })
        .then(response => {
            if (response.ok) {
                alert("Labour added successfully!");
                loadLabours();
                e.target.reset();
            } else {
                return response.json().then(data => {
                    throw new Error(data.message || "Failed to add labour");
                });
            }
        })
        .catch(error => {
            console.error("Error adding labour:", error);
            alert(error.message);
        });
    });

    // Edit labour function
    window.editLabour = function(id) {
        const newName = prompt("Enter new name for Labour:");
        const newInTime = prompt("Enter new In-Time (HH:MM):");
        const newOutTime = prompt("Enter new Out-Time (HH:MM):");

        const updateData = {
            name: newName || undefined,
            inTime: newInTime || undefined,
            outTime: newOutTime || undefined
        };

        const token = localStorage.getItem('token');

        fetch(`http://localhost:8082/api/sales-manager/labours/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(updateData)
        })
        .then(response => {
            if (response.ok) {
                alert("Labour updated successfully!");
                loadLabours();
            } else {
                return response.json().then(data => {
                    throw new Error(data.message || "Failed to update labour");
                });
            }
        })
        .catch(error => {
            console.error("Error updating labour:", error);
            alert(error.message);
        });
    };

    // Delete labour function
    window.deleteLabour = function(id) {
        if (confirm("Are you sure you want to delete this Labour?")) {
            const token = localStorage.getItem('token');

            fetch(`http://localhost:8082/api/sales-manager/labours/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
            .then(response => {
                if (response.ok) {
                    alert("Labour deleted successfully!");
                    loadLabours();
                } else {
                    throw new Error("Failed to delete labour");
                }
            })
            .catch(error => console.error("Error deleting labour:", error));
        }
    };
});
