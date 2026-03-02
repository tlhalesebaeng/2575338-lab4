const getCountry = async (id, type) => {
    const response = await fetch(`https://restcountries.com/v3.1/${type}/${id}`);
    const data = await response.json();
    return data[0];
}

const getCountryInfo = async (countryName) => {
    let spinner = null;
    try {
        // Show loading spinner
        spinner = document.getElementById('loading-spinner');
        spinner.style.display = 'block';

        // Fetch country data
        const country = await getCountry(countryName, 'name');

        // Update DOM
        document.getElementById('country-info').innerHTML = `
            <h2>${country.name.common}</h2>
            <p><strong>Capital:</strong> ${country.capital[0]}</p>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <img src="${country.flags.svg}" alt="${country.name.common} flag">
        `;

        // Fetch bordering countries
        const borders = [];
        country.borders.map(async (borderId) => {
            const border = await getCountry(borderId, 'alpha');
            borders.push(border);
        });
        
        console.log(borders);

    } catch(error) {

    } finally {
        spinner.style.display = 'none';
    }
}

getCountryInfo("South Africa")