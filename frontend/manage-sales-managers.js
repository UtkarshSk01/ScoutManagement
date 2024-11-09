document.addEventListener("DOMContentLoaded", function () {
    loadSalesManagers();

    // Load existing Sales Managers
    function loadSalesManagers() {
        fetch("http://localhost:8082/api/admin/salesmanagers") // Updated URL
            .then(response => response.json())
            .then(data => {
                const tableBody = document.querySelector("#salesManagersTable tbody");
                tableBody.innerHTML = "";
                data.forEach(manager => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${manager.id}</td>
                        <td>${manager.username}</td>
                        <td>${manager.name}</td>
                        <td>${manager.area}</td>
                        <td>
                            <button onclick="editSalesManager(${manager.id})">Edit</button>
                            <button onclick="deleteSalesManager(${manager.id})">Delete</button>
                        </td>
                    `;
                    tableBody.appendChild(row);
                });
            })
            .catch(error => console.error("Error loading sales managers:", error));
    }

    // Add new Sales Manager
    document.getElementById("addSalesManagerForm").addEventListener("submit", function (e) {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        const name = e.target.name.value;
        const area = e.target.area.value;

        const salesManagerData = {
            username: username,
            password: password,
            name: name,
            area: area,
            role: "SALES_MANAGER" // Set the role explicitly
        };

        fetch("http://localhost:8082/api/admin/salesmanagers", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(salesManagerData)
        })
        .then(() => {
            alert("Sales Manager added successfully!");
            loadSalesManagers();
            e.target.reset(); // Clear the form
        })
        .catch(error => console.error("Error adding sales manager:", error));
    });

    // Edit Sales Manager
    window.editSalesManager = function(id) {
        const newName = prompt("Enter new name for Sales Manager:");
        const newArea = prompt("Enter new area for Sales Manager:");

        if (newName && newArea) {
            const updateData = { name: newName, area: newArea };

            fetch(`http://localhost:8082/api/admin/salesmanagers/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updateData)
            })
            .then(() => {
                alert("Sales Manager updated successfully!");
                loadSalesManagers();
            })
            .catch(error => console.error("Error updating sales manager:", error));
        }
    };

    // Delete Sales Manager
    window.deleteSalesManager = function(id) {
        if (confirm("Are you sure you want to delete this Sales Manager?")) {
            fetch(`http://localhost:8082/api/admin/salesmanagers/${id}`, {
                method: "DELETE"
            })
            .then(() => {
                alert("Sales Manager deleted successfully!");
                loadSalesManagers();
            })
            .catch(error => console.error("Error deleting sales manager:", error));
        }
    };
});
