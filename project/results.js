async function loadData() {
    const medicinesResponse = await fetch('data/medicines.json');
    const medicines = await medicinesResponse.json();

    const pharmaciesResponse = await fetch('data/pharmacies.json');
    const pharmacies = await pharmaciesResponse.json();

    return { medicines, pharmacies };
}

// Function to get URL parameters
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

async function loadData() {
    const medicinesResponse = await fetch('data/medicines.json');
    const medicines = await medicinesResponse.json();

    const pharmaciesResponse = await fetch('data/pharmacies.json');
    const pharmacies = await pharmaciesResponse.json();

    return { medicines, pharmacies };
}

// Function to get URL parameters
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Display results
function displayResults(medicines, pharmacies) {
    const resultContainer = document.getElementById('result-container');
    resultContainer.innerHTML = '';

    const searchInput = document.getElementById('search-input').value.toLowerCase();

    // Filter medicines based on input
    const filteredMedicines = medicines.filter(medicine => medicine.name.toLowerCase().includes(searchInput));

    if (filteredMedicines.length === 0) {
        resultContainer.innerHTML = '<p>No results found.</p>';
        return;
    }

    // Display results for each medicine
    filteredMedicines.forEach(medicine => {
        const pharmacyDetails = pharmacies.filter(pharmacy => pharmacy.medicine === medicine.name);
        
        // Update this part
        const pharmacyInfo = pharmacyDetails.map(pharmacy => `
            <p>${pharmacy.name}</p>
            <p>Contact: ${pharmacy.contact}</p>
            <p>Delivery: ${pharmacy.deliveryOptions}</p>
        `).join('');

        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item');
        resultItem.innerHTML = `
            <h3>${medicine.name}</h3>
            <p>Original Price: $${medicine.originalPrice.toFixed(2)}</p>
            <p>Discounted Price: $${medicine.discountedPrice.toFixed(2)}</p>
            <div>${pharmacyInfo}</div>
        `;

        resultContainer.appendChild(resultItem);
    });
}



// Call displayResults on page load
window.onload = displayResults;

// Function to go back to the previous page
function goBack() {
    window.history.back();
}


// Call displayResults on page load
window.onload = displayResults;

// Function to go back to the previous page
function goBack() {
    window.history.back();
}
