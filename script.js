const getCountry = async (countryName) => {
    const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
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
        const country = await getCountry(countryName);
        console.log(country);
    } catch(error) {

    } finally {
        spinner.style.display = 'none';
    }
}