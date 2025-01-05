// Load data from JSON files
async function loadData() {
    try {
        const medicinesResponse = await fetch('data/medicines.json');
        const medicines = await medicinesResponse.json();

        const pharmaciesResponse = await fetch('data/pharmacies.json');
        const pharmacies = await pharmaciesResponse.json();

        return { medicines, pharmacies };
    } catch (error) {
        console.error('Error loading data:', error);
        alert('Failed to load data. Please try again later.');
        return { medicines: [], pharmacies: [] }; // Return empty arrays on error
    }
}

// Function to get URL parameters
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Display results on the results page
function displayResults(medicines, pharmacies) {
    const resultContainer = document.getElementById('result-container');
    resultContainer.innerHTML = '';

    const searchInput = getQueryParam('query').toLowerCase();

    // Filter medicines based on input
    const filteredMedicines = medicines.filter(medicine => 
        medicine.name.toLowerCase().includes(searchInput)
    );

    if (filteredMedicines.length === 0) {
        resultContainer.innerHTML = '<p>No results found.</p>';
        return;
    }

    // Display results for each medicine
    filteredMedicines.forEach(medicine => {
        const pharmacyDetails = pharmacies.filter(pharmacy => pharmacy.medicine === medicine.name);
        
        // Display pharmacy information for each medicine
        const pharmacyInfo = pharmacyDetails.map(pharmacy => `
            <div style="margin-bottom: 10px;">
                <strong>${pharmacy.name}</strong><br>
                Contact: ${pharmacy.contact}<br>
                Original Rate: ₹${medicine.originalPrice} - Discounted Rate: ₹${medicine.discountedPrice}<br>
                Delivery Options: ${pharmacy.deliveryOptions.join(', ')}
            </div>
        `).join('<hr>'); // Use <hr> for space between pharmacies

        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item');
        resultItem.innerHTML = `
            <h3>${medicine.name}</h3>
            <div>${pharmacyInfo}</div>
        `;

        resultContainer.appendChild(resultItem);
    });
}

// Call displayResults on page load
window.onload = async () => {
    const { medicines, pharmacies } = await loadData();
    displayResults(medicines, pharmacies);
};
