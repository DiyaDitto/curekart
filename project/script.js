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

// Event listener for search (to be included in index.html)
document.getElementById('search-btn').addEventListener('click', () => {
    const searchInput = document.getElementById('search-input').value.trim(); // Trim to remove whitespace
    console.log('Search Input:', searchInput); // Debugging line
    if (searchInput) {
        // Redirect to results page with the search query
        window.location.href = `results.html?query=${encodeURIComponent(searchInput)}`;
    } else {
        alert("Please enter a search term."); // Alert if input is empty
    }
});

// Display results
function displayResults(medicines, pharmacies) {
    const resultContainer = document.getElementById('result-container');
    resultContainer.innerHTML = '';

    const searchInput = getQueryParam('query').toLowerCase();
    console.log('Search Query:', searchInput); // Debugging line

    // Filter medicines based on input
    const filteredMedicines = medicines.filter(medicine => 
        medicine.name.toLowerCase().includes(searchInput)
    );
    console.log('Filtered Medicines:', filteredMedicines); // Debugging line

    if (filteredMedicines.length === 0) {
        resultContainer.innerHTML = '<p>No results found.</p>';
        return;
    }

    // Display results for each medicine
    filteredMedicines.forEach(medicine => {
        const pharmacyDetails = pharmacies.filter(pharmacy => pharmacy.medicine === medicine.name);
        
        // Display pharmacy information for each medicine
        const pharmacyInfo = pharmacyDetails.map(pharmacy => `
            <p>${pharmacy.name}</p>
            <p>Contact: ${pharmacy.contact}</p>
            <p>Rate: ₹${pharmacy.rate} - Delivery: ${pharmacy.deliveryOptions}</p>
        `).join('');

        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item');
        resultItem.innerHTML = `
            <h3>${medicine.name}</h3>
            <p>Original Price: ₹${medicine.originalPrice.toFixed(2)}</p>
            <p>Discounted Price: ₹${medicine.discountedPrice.toFixed(2)}</p>
            <div>${pharmacyInfo}</div>
        `;

        resultContainer.appendChild(resultItem);
    });
}

// Function to go back to the previous page
function goBack() {
    // Check if there is a history to go back to
    if (window.history.length > 1) {
        window.history.back(); // Go back to the previous page
    } else {
        // If there's no history, redirect to a default page
        window.location.href = 'index.html'; // Change this to your desired fallback URL
    }
}

// Call displayResults on page load
window.onload = async () => {
    const { medicines, pharmacies } = await loadData();
    console.log('Medicines:', medicines); // Debugging line
    console.log('Pharmacies:', pharmacies); // Debugging line
    displayResults(medicines, pharmacies);
};
