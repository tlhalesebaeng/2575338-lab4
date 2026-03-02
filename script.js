const getCountry = async (id, type) => {
    const response = await fetch(`https://restcountries.com/v3.1/${type}/${id}`);
    const data = await response.json();
    return data[0];
}

const searchCountry = async (countryName) => {
    let spinner = null;
    try {
        // Show loading spinner
        spinner = document.getElementById('loading-spinner');
        spinner.style.display = 'block';

        document.getElementById('error-message').style.display = 'none';
        document.getElementById('country-info').style.display = 'none';

        document.getElementById('bordering-countries').innerHTML = '';

        // Fetch country data
        const country = await getCountry(countryName, 'name');

        if(country) {
            document.getElementById('country-info').style.display = 'flex';

            // Update DOM
            document.getElementById('country-info').innerHTML = `
                <section>
                    <h2>${country.name.common}</h2>
                    <p><strong>Capital:</strong> ${country.capital[0]}</p>
                    <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                    <p><strong>Region:</strong> ${country.region}</p>
                </section>
                <img src="${country.flags.svg}" alt="${country.name.common} flag">
            `;

            document.getElementById('bordering-countries').style.display = 'grid';

            if(country.borders) {
                country.borders.map(async (borderId) => {
                    // Fetch bordering countries

                    const border = await getCountry(borderId, 'alpha');

                    // Update bordering countries section

                    const html = `
                        <section>
                            <h2>${border.name.common}</h2>
                            <img src="${border.flags.svg}" alt="${border.name.common} flag">
                        </section>
                    `;

                    document.getElementById('bordering-countries').innerHTML += html;
                });
            }
            
        } else {
            throw new Error('Country not found. Please check your name and try again')
        }
    } catch(error) {
        const errorSection = document.getElementById('error-message');
        errorSection.style.display = 'block';
        errorSection.innerHTML = `<p>${error.message || "An error occurred please try again later"}</p>`
    } finally {
        spinner.style.display = 'none';
    }
}

document.getElementById('search-btn').addEventListener('click', () => {
    const country = document.getElementById('country-input').value;
    searchCountry(country);
});