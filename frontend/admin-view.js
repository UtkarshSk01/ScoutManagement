document.addEventListener("DOMContentLoaded", function () {
    loadLocations();

    function loadLocations() {
        fetch("http://localhost:8082/locations")
            .then(response => response.json())
            .then(data => {
                const container = document.getElementById("locationsContainer");
                container.innerHTML = "";
                data.forEach(location => {
                    const locationElement = document.createElement("div");
                    locationElement.className = "location-item";
                    locationElement.innerHTML = `
                        <h3>${location.userRole}: ${location.userName}</h3>
                        <p>Last known location: ${location.location}</p>
                    `;
                    container.appendChild(locationElement);
                });
            })
            .catch(error => console.error("Error loading locations:", error));
    }
});
