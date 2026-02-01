function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("collapsed");
    document.getElementById("content").classList.toggle("expanded");
}

// Section Switching
function showSection(sectionId) {
    document.getElementById("dashboardSection").style.display = "none";
    document.getElementById("cropsSection").style.display = "none";
    document.getElementById(sectionId).style.display = "block";
}

// Crop Data
let crops = [
    { name: "Wheat", yield: 200 },
    { name: "Rice", yield: 350 },
    { name: "Corn", yield: 180 }
];

const tableBody = document.getElementById("cropTable");
const cropCount = document.getElementById("cropCount");

function renderTable(filter = "") {
    tableBody.innerHTML = "";
    crops
        .filter(c => c.name.toLowerCase().includes(filter.toLowerCase()))
        .forEach((crop, index) => {
            tableBody.innerHTML += `
                <tr>
                    <td>${crop.name}</td>
                    <td>${crop.yield} Tons</td>
                    <td>
                        <button class="btn btn-sm btn-warning" onclick="editCrop(${index})">Edit</button>
                        <button class="btn btn-sm btn-danger" onclick="deleteCrop(${index})">Delete</button>
                    </td>
                </tr>`;
        });

    cropCount.textContent = crops.length;
}

function deleteCrop(i) {
    crops.splice(i, 1);
    renderTable();
}

function editCrop(i) {
    const newName = prompt("Edit Crop Name", crops[i].name);
    const newYield = prompt("Edit Yield", crops[i].yield);

    if (newName && newYield) {
        crops[i] = { name: newName, yield: parseInt(newYield) };
        renderTable();
    }
}

document.getElementById("cropForm").addEventListener("submit", e => {
    e.preventDefault();
    const name = cropName.value.trim();
    const yieldVal = cropYield.value.trim();

    if (name && yieldVal > 0) {
        crops.push({ name, yield: parseInt(yieldVal) });
        renderTable();
        cropForm.reset();
    } else {
        alert("Please enter valid crop data");
    }
});

document.getElementById("searchInput").addEventListener("input", e => {
    renderTable(e.target.value);
});

renderTable();

// Charts
new Chart("barChart", {
    type: "bar",
    data: {
        labels: ["Wheat", "Rice", "Corn", "Barley"],
        datasets: [{ backgroundColor: ["#198754","#0d6efd","#ffc107","#dc3545"], data: [200,350,180,90] }]
    },
    options: { title: { display: true, text: "Crop Production" } }
});

new Chart("pieChart", {
    type: "pie",
    data: {
        labels: ["Wheat","Rice","Corn"],
        datasets: [{ backgroundColor:["#198754","#0d6efd","#ffc107"], data:[40,35,25] }]
    },
    options: { title: { display: true, text: "Crop Distribution" } }
});

new Chart("lineChart", {
    type: "line",
    data: {
        labels: ["Jan","Feb","Mar","Apr","May"],
        datasets: [{ borderColor:"#198754", fill:false, data:[50,60,55,70,90] }]
    },
    options: { title: { display: true, text: "Monthly Yield Trend" } }
});
